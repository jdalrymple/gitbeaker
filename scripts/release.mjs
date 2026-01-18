#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const isCanary = process.argv[2] === 'canary';
const releaseType = isCanary ? 'canary' : 'production';
const emoji = isCanary ? '🐤' : '🚀';

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
};

function logStep(message) {
  console.log(`${emoji} ${message}`);
}

function execCommand(command, description) {
  logStep(description);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Failed: ${description}`);
    console.error(error.message);
    return false;
  }
}

function getPackageNames() {
  try {
    const output = execSync('yarn workspaces list --json', { encoding: 'utf8' });
    const workspaces = output
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line));

    return workspaces.filter((ws) => ws.location !== '.' && ws.name).map((ws) => ws.name);
  } catch (error) {
    console.warn('Could not get workspace packages:', error.message);
    return [];
  }
}

function generateChangesetYaml(packageNames, changeType) {
  if (packageNames.length === 0) return '';
  return packageNames.map((name) => `"${name}": ${changeType}`).join('\n');
}

function extractPublishedPackages(publishOutput, isCanary) {
  const publishLines = publishOutput.split('\n');

  return publishLines
    .filter(line => {
      return line.includes('@') && (isCanary ? line.includes('canary') : !line.includes('canary'));
    })
    .map(line => {
      // Extract package@version from changeset output lines
      const regex = isCanary
        ? /(@[^@]+@[\d\.-]+canary[\d-]+)/
        : /(@[^@\s]+@[\d\.\-\w]+)/;
      const match = line.match(regex);
      return match ? match[1] : null;
    })
    .filter(Boolean);
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
    repo: match[2]
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

async function findReleaseComment(prNumber) {
  const comments = await githubApiRequest(`/issues/${prNumber}/comments`);
  const searchText = isCanary
    ? '🐤 **Canary Release Published** 🐤'
    : '🚀 **Production Release Published** 🚀';

  return comments.find(comment => comment.body.includes(searchText));
}

async function updateOrCreateReleaseComment(prNumber, comment) {
  // First, try to find existing release comment
  const existingComment = await findReleaseComment(prNumber);

  if (existingComment) {
    // Update existing comment
    const updatedComment = await githubApiRequest(`/issues/comments/${existingComment.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ body: comment }),
    });

    return { updated: true, comment: updatedComment };
  } else {
    // Create new comment
    const newComment = await githubApiRequest(`/issues/${prNumber}/comments`, {
      method: 'POST',
      body: JSON.stringify({ body: comment }),
    });

    return { updated: false, comment: newComment };
  }
}

async function generateChangesetFromPR(prNumber, labels, prTitle) {
  if (!prNumber) {
    logStep('No PR number provided, skipping changeset generation');
    return null;
  }

  logStep(`Generating changeset for PR #${prNumber} with labels: ${labels.join(', ')}`);

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

  // Get package names using yarn workspaces
  const packageNames = getPackageNames();
  if (packageNames.length === 0) {
    console.warn('No packages found in yarn workspaces');
    return null;
  }

  logStep(`Found packages: ${packageNames.join(', ')}`);

  // Create changeset directory if it doesn't exist
  if (!existsSync('.changeset')) {
    mkdirSync('.changeset');
  }

  const changesetContent = `---
${generateChangesetYaml(packageNames, changeType)}
---

${prTitle}`;

  const filename = `.changeset/pr-${prNumber}-${Date.now()}.md`;
  writeFileSync(filename, changesetContent);

  logStep(`Generated changeset: ${filename}`);
  return filename;
}

async function release() {
  logStep(`Starting ${releaseType} release`);

  const prNumber = process.env.PR_NUMBER;

  if (!prNumber) {
    logStep('No PR number found - skipping release');
    return;
  }

  // Get PR data
  const prData = await githubApiRequest(`/pulls/${prNumber}`);
  const labels = prData.labels.map((label) => label.name);

  if (isCanary && !labels.includes('release:canary')) {
    logStep('No canary label present - skipping canary release');
    return;
  }

  // Generate changesets (direct function call, no subprocess)
  logStep('Generating changeset from PR labels');
  try {
    const changesetFile = await generateChangesetFromPR(prNumber, labels, prData.title);
    if (!changesetFile) {
      logStep(`No changeset generated - skipping ${releaseType} release`);
      return;
    }
  } catch (error) {
    console.error(`❌ Failed to generate changeset: ${error.message}`);
    process.exit(1);
  }

  // Version packages
  const versionCommand = isCanary
    ? 'yarn changeset version --snapshot canary'
    : 'yarn changeset version';

  if (!execCommand(versionCommand, `Creating ${releaseType} versions`)) {
    process.exit(1);
  }

  // Update contributors (production only)
  if (!isCanary) {
    execCommand('yarn all-contributors-cli generate', 'Updating contributors (non-blocking)');
  }

  // Publish packages
  const publishCommand = isCanary
    ? 'yarn changeset publish --tag canary --no-git-tag'
    : 'yarn changeset publish';

  let publishedPackages = [];

  try {
      // Capture publish output to extract version info
    logStep(`Publishing ${releaseType} packages`);

    const publishOutput = execSync(publishCommand, { stdio: 'pipe', encoding: 'utf8' });

    logStep(publishOutput); // Show the output to user

    publishedPackages = extractPublishedPackages(publishOutput, isCanary);
  } catch (error) {
    console.error(`❌ Failed to parse published packages: ${error.message}`);
    process.exit(1);
  }

  // Post PR comment for releases
  if (prNumber && publishedPackages.length > 0) {
    try {
      const releaseTitle = isCanary ? 'Canary Release Published' : 'Production Release Published';
      const releaseDescription = isCanary ? 'canary versions' : 'new versions';
      const installNote = isCanary
        ? 'Note: Canary releases are temporary and may be unstable. Use for testing purposes only.'
        : 'Note: These are production releases available on the `latest` tag.';

      logStep(`Posting ${releaseType} release comment to PR`);

      const releaseLinks = publishedPackages.map(pkgVersion => {
        // Handle scoped packages like @gitbeaker/cli@1.0.0
        const lastAtIndex = pkgVersion.lastIndexOf('@');
        const packageName = pkgVersion.substring(0, lastAtIndex);
        const version = pkgVersion.substring(lastAtIndex + 1);
        return `- [\`${packageName}@${version}\`](https://www.npmjs.com/package/${packageName}/v/${version})`;
      }).join('\n');

      const comment = `${emoji} **${releaseTitle}** ${emoji}

The following packages have been published with ${releaseDescription}:

${releaseLinks}

${installNote}`;

      const result = await updateOrCreateReleaseComment(prNumber, comment);
      if (result.updated) {
        logStep(`Successfully updated existing ${releaseType} release comment`);
      } else {
        logStep(`Successfully posted new ${releaseType} release comment`);
      }
    } catch (error) {
      console.warn('Failed to post PR comment:', error.message);
    }
  }

  // Commit and push (production only)
  if (!isCanary) {
    const hasChanges = execCommand('git status --porcelain', { encoding: 'utf8' }).trim();

    if (hasChanges) {
      if (!execCommand('git add .', 'Staging changes')) process.exit(1);

      if (
        !execCommand(
          'git commit -m "Version packages and update contributors"',
          'Committing changes',
        )
      )
        process.exit(1);

      if (!execCommand('git push', 'Pushing changes')) process.exit(1);

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
