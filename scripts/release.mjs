#!/usr/bin/env node
/**
 * Unified release script
 */

import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const isCanary = process.argv[2] === 'canary';
const releaseType = isCanary ? 'canary' : 'production';

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
};

function logStep(message) {
  const emoji = isCanary ? '🐤' : '🚀';
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
    const output = execCommand('yarn workspaces list --json', { encoding: 'utf8' });
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

  // Create changeset
  if (!execCommand('.changeset')) mkdirSync('.changeset');

  const changesetContent = `---
${generateChangesetYaml(packageNames, changeType)}
---

${prTitle}`;

  const filename = `.changeset/pr-${prNumber}-${Date.now()}.md`;
  writeFileSync(filename, changesetContent);

  logStep(`Generated changeset: ${filename}`);
  return filename;
}

async function fetchPRData(prNumber) {
  const repoUrl = process.env.CIRCLE_REPOSITORY_URL || 'https://github.com/jdalrymple/gitbeaker';

  // Extract owner/repo from URL
  const match = repoUrl.match(/github\.com[/:]([\w-]+)\/([\w-]+)/);
  if (!match) {
    throw new Error(`Could not parse repository URL: ${repoUrl}`);
  }
  const [, owner, repo] = match;

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'gitbeaker-api-client',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function release() {
  logStep(`Starting ${releaseType} release`);

  // Generate changeset from PR labels
  // Adds limitation to only release from PRs for now
  let prNumber = process.env.PR_NUMBER;

  if (!prNumber) {
    logStep('No PR number found - skipping release');
    return;
  }

  // Get PR data
  const prData = await fetchPRData(prNumber);
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

  // Check if there are any changesets to process
  try {
    execCommand('yarn changeset version', { stdio: 'pipe' });
  } catch (error) {
    // changeset status exits with non-zero when no changesets found
    logStep(`No changesets found - skipping ${releaseType} release`);
    return;
  }

  logStep(`Changesets found - proceeding with ${releaseType} release`);

  // Version packages
  const versionCommand = isCanary
    ? 'yarn changeset:version --snapshot canary'
    : 'yarn changeset:version';

  if (!execCommand(versionCommand, `Creating ${releaseType} versions`)) {
    process.exit(1);
  }

  // Update contributors (production only)
  if (!isCanary) {
    execCommand('yarn all-contributors-cli generate', 'Updating contributors (non-blocking)');
  }

  // Publish packages
  const publishCommand = isCanary
    ? 'yarn changeset:publish --tag canary --no-git-tag'
    : 'yarn changeset:publish';

  if (!execCommand(publishCommand, `Publishing ${releaseType} packages`)) {
    process.exit(1);
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
