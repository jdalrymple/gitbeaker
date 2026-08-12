#!/usr/bin/env node

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile, readFile, access, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { glob } from 'node:fs/promises';
import { getChangedPackagesSinceRef } from '@changesets/git';
import writeChangeset from '@changesets/write';
import getReleasePlan from '@changesets/get-release-plan';

const execAsync = promisify(exec);

const args = process.argv.slice(2);
const releaseArg = args.find((arg) => !arg.startsWith('--'));
const isDryRun = args.includes('--dry-run');

// Show help message
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node scripts/release.mjs [type] [options]

Release Types:
  canary      Create a canary release
  pre         Create a pre-release
  (default)   Create a production release

Options:
  --dry-run   Run without publishing packages or making changes
  --help, -h  Show this help message

Examples:
  node scripts/release.mjs pre --dry-run
  node scripts/release.mjs canary
  node scripts/release.mjs --dry-run
`);
  process.exit(0);
}

let releaseType, emoji;

switch (releaseArg) {
  case 'canary':
    releaseType = 'canary';
    emoji = '🐤';
    break;
  case 'pre':
    releaseType = 'pre';
    emoji = '🚧';
    break;
  default:
    releaseType = 'production';
    emoji = '🚀';
}

const labelToChangeType = {
  breaking: 'major',
  'type:feature': 'minor',
  'type:bug': 'minor',
  'type:hot fix': 'minor',
  'type:technical debt': 'patch',
  'type:security': 'patch',
  'type:dependencies': 'patch',
  'type:types': 'patch',
  'type:testing': null,
  'type:documentation': null,
  'release:canary': 'patch',
  'release:pre': 'patch',
};

function logStep(message) {
  const dryRunPrefix = isDryRun ? '[DRY-RUN] ' : '';
  console.log(`${emoji} ${dryRunPrefix}${message}`);
}

async function execCommand(command, description) {
  logStep(description);
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    return true;
  } catch (error) {
    console.error(`❌ Failed: ${description}`);
    console.error(error.message);
    return false;
  }
}

async function getPackageNames() {
  try {
    const { stdout } = await execAsync('pnpm ls --depth -1 --json');
    const packages = JSON.parse(stdout);

    return packages.filter((pkg) => !pkg.private && pkg.name.includes('@')).map((pkg) => pkg.name);
  } catch (error) {
    console.warn('Could not get workspace packages:', error.message);
    return [];
  }
}

async function getChangedPackageNames() {
  try {
    const changedPackages = await getChangedPackagesSinceRef({
      cwd: process.cwd(),
      ref: 'main',
    });

    return changedPackages
      .filter((pkg) => !pkg.packageJson.private && pkg.packageJson.name.includes('@'))
      .map((pkg) => pkg.packageJson.name);
  } catch (error) {
    console.warn(
      'Could not get changed packages from changesets, falling back to all packages:',
      error.message,
    );
    return await getPackageNames();
  }
}

async function getPublishedPackages(releaseType) {
  try {
    const releasePlan = await getReleasePlan(process.cwd());

    return releasePlan.releases
      .filter((release) => {
        // Filter based on release type logic
        switch (releaseType) {
          case 'canary':
            return release.newVersion.includes('canary');
          case 'pre':
            return release.newVersion.includes('pre');
          case 'production':
            return !release.newVersion.includes('canary') && !release.newVersion.includes('pre');
          default:
            return false;
        }
      })
      .map((release) => `${release.name}@${release.newVersion}`);
  } catch (error) {
    console.warn('Could not get release plan:', error.message);
    return [];
  }
}

function getRepoInfo() {
  const repoUrl = process.env.CIRCLE_REPOSITORY_URL || 'https://github.com/jdalrymple/gitbeaker';

  // Extract owner/repo from URL
  const match = repoUrl.match(/github\.com[/:]([\w-]+)\/([\w-]+)/);
  if (!match) {
    throw new Error(`Could not parse repository URL: ${repoUrl}`);
  }

  return {
    owner: match[1],
    repo: match[2],
  };
}

async function githubApiRequest(endpoint, options = {}) {
  const { owner, repo } = getRepoInfo();
  const url = `https://api.github.com/repos/${owner}/${repo}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'gitbeaker-api-client',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function generateChangesetFromPR(prData) {
  if (!prData || !prData?.number) {
    logStep('No PR data provided, skipping changeset generation');
    return null;
  }

  const labels = prData.labels.map((label) => label.name);

  logStep(`Generating changeset for PR #${prData.number} with labels: ${labels.join(', ')}`);

  // Find change type
  const changeType = labels
    .map((label) => labelToChangeType[label])
    .filter(Boolean)
    .sort(
      (a, b) => ['major', 'minor', 'patch'].indexOf(a) - ['major', 'minor', 'patch'].indexOf(b),
    )[0];

  if (!changeType) {
    logStep('No labels found that trigger a release, skipping changeset generation');
    return null;
  }

  logStep(`Determined change type: ${changeType}`);

  // Get package names that have changes
  const packageNames = await getChangedPackageNames();

  if (packageNames.length === 0) {
    console.warn('No packages found in workspace');
    return null;
  }

  logStep(`Found packages: ${packageNames.join(', ')}`);

  // Create changeset using changesets' API
  const changesetId = await writeChangeset(
    {
      summary: `${prData.title}\n\n${prData.body}\n\npr: #${prData.number}`,
      releases: packageNames.map((name) => ({ name, type: changeType })),
    },
    process.cwd(),
  );

  logStep(`Generated changeset: ${changesetId}`);
  return changesetId;
}

async function formatChangelogDates() {
  logStep('Adding dates to changelog headings');

  const changelogFilesIterator = await glob('packages/*/CHANGELOG.md');
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  for await (const filePath of changelogFilesIterator) {
    try {
      let content = await readFile(filePath, 'utf8');

      // Match version headers that don't already have dates
      // Matches: ## 44.0.0-pre.0  or  # v44.0.0  (without dates)
      const headerRegex = /^(#{1,2})\s+(v?)(\d+\.\d+\.\d+(?:-[^\s]+)?)\s*$/gm;

      content = content.replace(headerRegex, (match, hashes, vPrefix, version) => {
        // Add the 'v' prefix if missing and format with date
        const formattedVersion = vPrefix ? `v${version}` : `v${version}`;
        return `${hashes} ${formattedVersion} (${dateStr})`;
      });

      await writeFile(filePath, content);
    } catch (error) {
      console.warn(`Failed to format changelog ${filePath}:`, error.message);
    }
  }
}

function sectionFor(content, version) {
  // Extract the section for a specific version from changelog content
  const versionPattern = new RegExp(
    `^## v?${version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^]*?(?=^## |$)`,
    'm',
  );
  const match = content.match(versionPattern);
  return match ? match[0] : null;
}

function stripDependencyUpdates(section) {
  return section
    .split('\n')
    .filter((line) => {
      // Keep lines that aren't just dependency updates
      return !line.match(/^\s*- Updated dependencies \[\]/);
    })
    .join('\n')
    .trim();
}

async function aggregateRootChangelog() {
  logStep('Aggregating package changelogs into root CHANGELOG.md');

  try {
    const changelogFiles = [];
    const changelogFilesIterator = await glob('packages/*/CHANGELOG.md');

    for await (const filePath of changelogFilesIterator) {
      changelogFiles.push(filePath);
    }

    // Find the latest version across all packages
    let latestVersion = null;
    const packageEntries = new Map();

    for (const filePath of changelogFiles) {
      try {
        const content = await readFile(filePath, 'utf8');
        const packageName = filePath.match(/packages\/([^/]+)/)?.[1];

        if (!packageName) continue;

        // Find the first version header
        const versionMatch = content.match(/^## (v?\d+\.\d+\.\d+(?:-[^\s]+)?)/m);
        if (versionMatch) {
          const version = versionMatch[1].replace(/^v/, ''); // Remove v prefix for comparison
          if (!latestVersion) {
            latestVersion = version;
          }

          // Only process if this matches the latest version
          if (version === latestVersion) {
            const section = sectionFor(content, version);
            if (section) {
              const cleaned = stripDependencyUpdates(section);
              if (cleaned && cleaned !== section.split('\n')[0]) {
                // Has content beyond header
                packageEntries.set(`@gitbeaker/${packageName}`, cleaned);
              }
            }
          }
        }
      } catch (error) {
        console.warn(`Failed to process changelog ${filePath}:`, error.message);
      }
    }

    if (!latestVersion || packageEntries.size === 0) {
      logStep('No changelog entries found to aggregate');
      return;
    }

    logStep(`Found ${packageEntries.size} packages with version ${latestVersion}`);

    const prToContent = new Map(); // PR number -> { packages: Set, content: string, changeTypes: Set }
    const nonPRChanges = new Map(); // changeType -> Set of non-PR changes

    for (const [packageName, section] of packageEntries) {
      // Parse sections (### Major Changes, ### Minor Changes, etc.)
      const sections = section.split(/^### /m).slice(1);

      for (const sectionContent of sections) {
        const [typeLine, ...contentLines] = sectionContent.split('\n');
        const changeType = typeLine.trim();

        // Skip Patch Changes for cleaner output
        if (changeType === 'Patch Changes') continue;

        // Join all content lines to get the raw section content
        const fullContent = contentLines.join('\n').trim();

        // Parse PR entries in the corrected format
        // Pattern: "- [#1234](...)"
        const prSplitPattern = /^- \[#(\d+)\]\([^)]+\)$/gm;
        let match;

        while ((match = prSplitPattern.exec(fullContent)) !== null) {
          const prNumber = match[1];
          const prLinkStart = match.index;
          const prLinkEnd = prSplitPattern.lastIndex;

          // Find the next PR or end of content
          prSplitPattern.lastIndex = prLinkEnd;
          const nextMatch = prSplitPattern.exec(fullContent);
          prSplitPattern.lastIndex = prLinkEnd; // Reset for next iteration

          const contentStart = prLinkEnd;
          const contentEnd = nextMatch ? nextMatch.index : fullContent.length;

          // Extract the content for this PR (everything between this PR link and the next)
          const prContent = fullContent.substring(contentStart, contentEnd).trim();

          // Remove the leading empty line if present
          const cleanedPrContent = prContent.replace(/^\n+/, '');

          if (cleanedPrContent) {
            if (!prToContent.has(prNumber)) {
              prToContent.set(prNumber, {
                packages: new Set(),
                content: cleanedPrContent,
                changeTypes: new Set(),
              });
            }

            // Add this package and change type to the PR
            prToContent.get(prNumber).packages.add(packageName);
            prToContent.get(prNumber).changeTypes.add(changeType);
          }
        }

        // If no PR entries were found, treat as regular bullet points
        if (prToContent.size === 0) {
          const changes = contentLines
            .filter((line) => line.trim().startsWith('- '))
            .map((line) => line.trim());

          for (const change of changes) {
            if (!nonPRChanges.has(changeType)) {
              nonPRChanges.set(changeType, new Set());
            }
            nonPRChanges.get(changeType).add(`${packageName}\n  ${change.substring(2)}`);
          }
        }
      }
    }

    // Build the aggregated changelog entry
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let aggregatedEntry = `## v${latestVersion} (${dateStr})\n\n`;

    // Group PRs by their change types for organized output
    const changeTypeToEntries = new Map();

    // Add PR-based entries (these are the main ones we care about)
    for (const [prNumber, prData] of prToContent) {
      for (const changeType of prData.changeTypes) {
        if (!changeTypeToEntries.has(changeType)) {
          changeTypeToEntries.set(changeType, []);
        }

        const packages = Array.from(prData.packages).sort();
        const packageList = packages.map((pkg) => `\`${pkg}\``).join(', ');

        changeTypeToEntries.get(changeType).push({
          type: 'pr',
          prNumber,
          packages: packageList,
          content: prData.content,
        });
      }
    }

    // Add non-PR entries (fallback)
    for (const [changeType, changes] of nonPRChanges) {
      if (!changeTypeToEntries.has(changeType)) {
        changeTypeToEntries.set(changeType, []);
      }

      for (const change of changes) {
        changeTypeToEntries.get(changeType).push({
          type: 'regular',
          content: change,
        });
      }
    }

    // Build final output organized by change type
    const sortedChangeTypes = Array.from(changeTypeToEntries.keys()).sort();
    for (const changeType of sortedChangeTypes) {
      const entries = changeTypeToEntries.get(changeType);
      if (entries.length === 0) continue;

      aggregatedEntry += `### ${changeType}\n\n`;

      for (const entry of entries) {
        if (entry.type === 'pr') {
          // Format as: - [packages] [PR link] followed by indented content
          aggregatedEntry += `- ${entry.packages}\n  [#${entry.prNumber}](https://github.com/jdalrymple/gitbeaker/pull/${entry.prNumber})\n\n  ${entry.content}\n\n`;
        } else {
          aggregatedEntry += `- ${entry.content}\n\n`;
        }
      }
    }

    // Handle case where no changes were found
    if (!aggregatedEntry.includes('###')) {
      aggregatedEntry += '_Version alignment release — no user-facing changes._\n\n';
    }

    logStep(`Generated aggregated entry (${aggregatedEntry.length} chars)`);
    if (isDryRun) {
      console.log('Aggregated entry preview:');
      console.log(aggregatedEntry);
    }

    // Read current root changelog
    let rootChangelog = '';
    try {
      rootChangelog = await readFile('CHANGELOG.md', 'utf8');
    } catch (error) {
      // Create new changelog if it doesn't exist
      rootChangelog = '# @gitbeaker\n---\n\n';
    }

    // Find insertion point (after the header)
    const insertionMatch = rootChangelog.match(/^# @gitbeaker\n---\n\n/);
    if (insertionMatch) {
      const insertionPoint = insertionMatch.index + insertionMatch[0].length;
      const newChangelog =
        rootChangelog.substring(0, insertionPoint) +
        aggregatedEntry +
        rootChangelog.substring(insertionPoint);

      // Always update root changelog (even in dry-run) since package changelogs are already updated
      await writeFile('CHANGELOG.md', newChangelog);
      logStep(`Successfully aggregated changelog for v${latestVersion}`);
    } else {
      console.warn('Could not find insertion point in root CHANGELOG.md');
    }
  } catch (error) {
    console.warn('Failed to aggregate root changelog:', error.message);
  }
}

async function release() {
  logStep(`Starting ${releaseType} release${isDryRun ? ' (dry-run mode)' : ''}`);

  const prNumber = process.env.PR_NUMBER;

  if (!prNumber) {
    logStep('No PR number found - skipping release');
    return;
  }

  if (!process.env.GITHUB_TOKEN) {
    logStep('No GH Token found - skipping release');
    return;
  }

  // Get PR data
  const prData = await githubApiRequest(`/pulls/${prNumber}`);
  const labels = prData.labels.map((label) => label.name);

  if (releaseType === 'canary' && !labels.includes('release:canary')) {
    logStep('No canary label present - skipping canary release');
    return;
  }

  if (releaseType === 'pre' && !labels.includes('release:pre')) {
    logStep('No pre label present - skipping pre release');
    return;
  }

  // Generate changesets (direct function call, no subprocess)
  logStep('Generating changeset from PR labels');

  try {
    const changesetFile = await generateChangesetFromPR(prData);
    if (!changesetFile) {
      logStep(`No changeset generated - skipping ${releaseType} release`);
      return;
    }
  } catch (error) {
    console.error(`❌ Failed to generate changeset: ${error.message}`);
    process.exit(1);
  }

  // Generate global changelog before versioning (so we have access to changeset data)
  await execCommand('node .changeset/global-changelog.mjs', 'Generating global changelog');

  // Version packages
  let versionCommand;
  switch (releaseType) {
    case 'canary':
      versionCommand = 'pnpm changeset version --snapshot canary';
      break;
    case 'pre':
      versionCommand = 'pnpm changeset pre enter pre && pnpm changeset version';
      break;
    case 'production':
      versionCommand = 'pnpm changeset version';
      break;
  }

  const versionSuccess = await execCommand(versionCommand, `Creating ${releaseType} versions`);

  if (!versionSuccess) {
    process.exit(1);
  }

  // Format changelog dates
  await formatChangelogDates();

  // Update contributors (production only)
  if (releaseType === 'production') {
    await execCommand('pnpm all-contributors-cli generate', 'Updating contributors (non-blocking)');
  }

  // Exit early if dry-run mode

  if (isDryRun) {
    logStep(`Dry-run complete - ${releaseType} versions would be published`);
    logStep('Skipping: package publishing, PR comments, and git operations');
    return;
  }

  // Publish packages
  let publishCommand;
  switch (releaseType) {
    case 'canary':
      publishCommand = 'pnpm changeset publish --tag canary --no-git-tag';
      break;
    case 'pre':
      publishCommand = 'pnpm changeset publish --tag pre';
      break;
    case 'production':
      publishCommand = 'pnpm changeset publish';
      break;
  }

  // Get the packages that will be published
  const publishedPackages = await getPublishedPackages(releaseType);

  try {
    // Publish packages
    logStep(`Publishing ${releaseType} packages`);

    const { stdout: publishOutput } = await execAsync(publishCommand);

    logStep(publishOutput); // Show the output to user
  } catch (error) {
    console.error(`❌ Failed to publish packages: ${error.message}`);
    process.exit(1);
  }

  // Post PR comment for releases

  if (prNumber && publishedPackages.length > 0) {
    try {
      let releaseTitle, releaseDescription, installNote;

      switch (releaseType) {
        case 'canary':
          releaseTitle = 'Canary Release Published';
          releaseDescription = 'canary versions';
          installNote =
            'Note: Canary releases are temporary and may be unstable. Use for testing purposes only.';
          break;
        case 'pre':
          releaseTitle = 'Pre Release Published';
          releaseDescription = 'pre-release versions';
          installNote =
            'Note: Pre-releases are beta versions that may contain breaking changes. Use with caution.';
          break;
        case 'production':
          releaseTitle = 'Production Release Published';
          releaseDescription = 'new versions';
          installNote = 'Note: These are production releases available on the `latest` tag.';
          break;
      }

      logStep(`Posting ${releaseType} release comment to PR`);

      const releaseLinks = publishedPackages
        .map((pkgVersion) => {
          // Handle scoped packages like @gitbeaker/cli@1.0.0
          const lastAtIndex = pkgVersion.lastIndexOf('@');
          const packageName = pkgVersion.substring(0, lastAtIndex);
          const version = pkgVersion.substring(lastAtIndex + 1);
          return `- [\`${packageName}@${version}\`](https://www.npmjs.com/package/${packageName}/v/${version})`;
        })
        .join('\n');

      const comment = `${emoji} **${releaseTitle}** ${emoji}

The following packages have been published with ${releaseDescription}:

${releaseLinks}

${installNote}`;

      const commentType = releaseType;

      await githubApiRequest('/actions/workflows/post-release-comment.yml/dispatches', {
        method: 'POST',
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            pr_number: prNumber.toString(),
            comment_body: comment,
            comment_type: commentType,
          },
        }),
      });

      logStep(`Successfully triggered ${releaseType} release comment workflow`);
    } catch (error) {
      console.warn('Failed to post PR comment:', error.message);
    }
  }

  // Exit pre-release mode if we were in pre mode
  if (releaseType === 'pre') {
    const exitPreSuccess = await execCommand('pnpm changeset pre exit', 'Exiting pre-release mode');

    if (!exitPreSuccess) {
      console.warn('⚠️  Failed to exit pre-release mode - this may need manual cleanup');
    }
  }

  // Commit and push (production only)

  if (releaseType === 'production') {
    const { stdout: statusOutput } = await execAsync('git status --porcelain');
    const hasChanges = statusOutput.trim();

    if (hasChanges) {
      const addSuccess = await execCommand('git add .', 'Staging changes');

      if (!addSuccess) process.exit(1);

      const commitSuccess = await execCommand(
        'git commit -m "Version packages and update contributors"',
        'Committing changes',
      );

      if (!commitSuccess) process.exit(1);

      const pushSuccess = await execCommand('git push', 'Pushing changes');

      if (!pushSuccess) process.exit(1);

      logStep('Successfully committed and pushed version changes');
    }
  }

  logStep(
    `✅ ${releaseType.charAt(0).toUpperCase() + releaseType.slice(1)} release completed successfully!`,
  );
}

release().catch((error) => {
  console.error(
    `❌ ${releaseType.charAt(0).toUpperCase() + releaseType.slice(1)} release failed:`,
    error,
  );
  process.exit(1);
});
