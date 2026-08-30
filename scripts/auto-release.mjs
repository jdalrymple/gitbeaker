#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';

// =============================================================================
// Configuration
// =============================================================================

const isDryRun = process.argv.includes('--dry-run');

// =============================================================================
// Utility Functions
// =============================================================================

function log(message, emoji = '📦') {
  const prefix = isDryRun ? '[DRY-RUN] ' : '';
  console.log(`${emoji} ${prefix}${message}`);
}

function execCommandOrThrow(command, description) {
  log(`${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    if (output.trim()) console.log(output);
  } catch (error) {
    console.error(`❌ ${description} failed: Command failed: ${command}`);
    if (error.stdout) console.error('STDOUT:', error.stdout.toString());
    if (error.stderr) console.error('STDERR:', error.stderr.toString());
    console.error('Error message:', error.message);
    throw new Error(`${description} failed`);
  }
}

function validateReleaseType(releaseType, prLabels) {
  const labels = prLabels.map((label) => label.name);

  switch (releaseType) {
    case 'canary':
      if (!labels.includes('release:canary')) {
        log('No canary label present - skipping canary release', '⏭️');
        return false;
      }
      break;

    case 'pre':
      if (!labels.includes('release:pre')) {
        log('No pre label present - skipping pre release', '⏭️');
        return false;
      }
      break;

    case 'production':
      // Production releases don't require special labels
      // But we could check for absence of canary/pre labels if desired
      break;

    default:
      log(`Unknown release type: ${releaseType}`, '❌');
      return false;
  }

  return true;
}

// =============================================================================
// GitHub API Functions
// =============================================================================

async function getPRInfo() {
  const prNumber = process.env.PR_NUMBER;

  if (!prNumber) {
    log('No PR_NUMBER environment variable found', '❌');
    return null;
  }

  try {
    const output = execSync(`gh pr view ${prNumber} --json number,title,body,labels`, {
      encoding: 'utf8',
    });
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`Failed to get PR info via GitHub CLI: ${error.message}`);
  }
}

function determineChangeType(prData) {
  const labels = prData.labels.map((label) => label.name);

  if (labels.includes('type:breaking')) return 'major';
  if (labels.includes('type:feature')) return 'minor';
  if (labels.includes('type:fix')) return 'patch';

  // Fallback to conventional commit parsing
  const title = prData.title;
  if (title.startsWith('feat!:')) return 'major';
  if (title.startsWith('feat:')) return 'minor';
  if (title.startsWith('fix:')) return 'patch';

  return null;
}

function shouldSkipRelease(prData) {
  const labels = prData.labels.map((label) => label.name);
  return labels.some((label) => ['no-release', 'type:docs', 'type:test'].includes(label));
}

// =============================================================================
// Package & Changeset Functions
// =============================================================================

function getPackages() {
  try {
    const stdout = execSync('pnpm ls --depth -1 --json', { encoding: 'utf8' });
    const packages = JSON.parse(stdout);

    return packages.filter((pkg) => !pkg.private && pkg.name.includes('@')).map((pkg) => pkg.name);
  } catch (error) {
    console.warn('Could not get workspace packages:', error.message);
    return [];
  }
}

function createChangeset(prData, changeType, packages) {
  const message = `${prData.title}

${prData.body || ''}

PR: #${prData.number}`;

  // Escape quotes in message for shell command
  const escapedMessage = message.replace(/"/g, '\\"');
  const packageList = packages.join(' ');

  const command = `pnpm change ${packageList} --bump ${changeType} --summary "${escapedMessage}"`;

  log(`Creating changeset with pnpm change...`, '📝');

  try {
    execSync(command, { stdio: 'inherit' });
    log('Changeset created successfully', '✅');
    return true;
  } catch (error) {
    log(`Failed to create changeset: ${error.message}`, '❌');
    return false;
  }
}

// =============================================================================
// GitHub Integration Functions
// =============================================================================

async function updateReleaseComment(prNumber, releaseType, version, packages) {
  const commentMarker = `<!-- release-comment-${releaseType} -->`;

  let message = `${commentMarker}\n## 🚀 ${releaseType.charAt(0).toUpperCase() + releaseType.slice(1)} Release Published\n\n`;

  if (packages && packages.length > 0) {
    message += `The following packages have been published:\n\n`;
    packages.forEach((pkg) => {
      const packageVersion = version.includes('@') ? version : `${pkg}@${version}`;
      message += `- [\`${packageVersion}\`](https://www.npmjs.com/package/${pkg}/v/${version})\n`;
    });
  }

  message += `\n_Released from commit ${process.env.CIRCLE_SHA1?.substring(0, 7) || 'unknown'}_`;

  if (isDryRun) {
    log(`Would update PR #${prNumber} release comment`, '💬');
    log(`Comment content: ${message.substring(0, 200)}...`, '💬');
    return;
  }

  try {
    // Check if release comment already exists and update/create accordingly
    const existingComments = execSync(
      `gh pr view ${prNumber} --json comments --jq '.comments[] | select(.body | contains("${commentMarker}")) | .body'`,
      { encoding: 'utf8', stdio: 'pipe' },
    ).trim();

    if (existingComments) {
      // Update existing comment (GitHub CLI doesn't have direct update, so we'll add a new one with update notice)
      message = `${message}\n\n_Updated release comment_`;
    }

    execSync(`gh pr comment ${prNumber} --body "${message.replace(/"/g, '\\"')}"`, {
      stdio: 'pipe',
    });
    log(`Updated release comment on PR #${prNumber}`, '💬');
  } catch (error) {
    log(`Failed to update PR comment: ${error.message}`, '⚠️');
  }
}

async function createGitHubRelease(version, changelogContent) {
  if (isDryRun) {
    log(`Would create GitHub release v${version}`, '🚀');
    return;
  }

  try {
    // Clean up changelog content for GitHub release
    const cleanChangelog = changelogContent.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const releaseCommand = `gh release create v${version} --title "v${version}" --notes "${cleanChangelog}"`;

    execSync(releaseCommand, { stdio: 'pipe' });
    log(`Created GitHub release v${version}`, '🚀');
  } catch (error) {
    log(`Failed to create GitHub release: ${error.message}`, '⚠️');
  }
}

// =============================================================================
// Release Functions
// =============================================================================

function executeCanaryRelease() {
  log('Executing canary release...', '🐤');

  execCommandOrThrow('pnpm changeset version --snapshot canary', 'Creating canary versions');

  // Publishing is external operation - handle dry-run
  if (isDryRun) {
    log('Would execute: pnpm changeset publish --tag canary --no-git-tag', '🔍');
  } else {
    execCommandOrThrow(
      'pnpm changeset publish --tag canary --no-git-tag',
      'Publishing canary packages',
    );
  }

  log('Canary release completed', '✅');
}

function executePrerelease() {
  log('Executing pre-release...', '🚧');

  // Generate global changelog
  execCommandOrThrow('node .changeset/global-changelog.mjs', 'Generating global changelog');

  // Use snapshot to preserve changesets
  execCommandOrThrow('pnpm changeset version --snapshot pre', 'Creating pre-release versions');

  // Publishing is external operation - handle dry-run
  if (isDryRun) {
    log('Would execute: pnpm changeset publish --tag pre', '🔍');
  } else {
    execCommandOrThrow('pnpm changeset publish --tag pre', 'Publishing pre-release packages');
  }

  log('Pre-release completed', '✅');
}

function executeProductionRelease() {
  log('Executing production release...', '🚀');

  // Generate global changelog BEFORE versioning (local operation - always execute)
  execCommandOrThrow('node .changeset/global-changelog.mjs', 'Generating global changelog');

  // Normal versioning (consumes changesets, updates individual changelogs - local operation)
  execCommandOrThrow('pnpm changeset version', 'Versioning packages');

  // Update contributors (local operation - always execute)
  execCommandOrThrow('pnpm all-contributors-cli generate', 'Updating contributors');

  // Commit changes (local operation - always execute, but only push if not dry-run)
  try {
    execSync('git add .');
    execSync('git commit -m "Version packages and update changelogs [skip ci]"');
    log('Committed changes', '📝');

    if (isDryRun) {
      log('Would push to origin main (skipped in dry-run)', '📝');
    } else {
      execSync('git push origin main');
      log('Pushed changes to origin', '📝');
    }
  } catch (error) {
    throw new Error(`Git commit/push failed: ${error.message}`);
  }

  // Publishing is external operation - handle dry-run
  if (isDryRun) {
    log('Would execute: pnpm changeset publish', '🔍');
  } else {
    execCommandOrThrow('pnpm changeset publish', 'Publishing production packages');
  }

  log('Production release completed', '✅');
}

// =============================================================================
// Main Function
// =============================================================================

async function main() {
  // Get release type from command line argument
  const releaseType = process.argv[2] || 'production';
  const branch = process.env.CIRCLE_BRANCH;

  log(`Starting ${releaseType} release on branch: ${branch}`, '🚀');

  // Get PR information
  const prData = await getPRInfo();

  log(`Processing PR #${prData.number}: ${prData.title}`, '📋');

  // Validate release type against PR labels
  if (!validateReleaseType(releaseType, prData.labels)) {
    return;
  }

  // Check if we should skip release
  if (shouldSkipRelease(prData)) {
    log('Release skipped due to labels', '⏭️');
    return;
  }

  // Determine change type
  const changeType = determineChangeType(prData);
  if (!changeType) {
    log('No release labels found - skipping release', '⏭️');
    return;
  }

  log(`Detected change type: ${changeType}`, '📊');

  // Get affected packages
  const packages = getPackages();
  if (packages.length === 0) {
    log('No packages found', '❌');
    return;
  }

  log(`Found packages: ${packages.join(', ')}`, '📦');

  // Create changeset
  const changesetCreated = createChangeset(prData, changeType, packages);
  if (!changesetCreated) {
    log('Failed to create changeset - aborting release', '❌');
    return;
  }

  // Execute release based on type
  switch (releaseType) {
    case 'canary':
      executeCanaryRelease();
      break;
    case 'pre':
      executePrerelease();
      break;
    case 'production':
      executeProductionRelease();
      break;
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Release failed:', error);
    process.exit(1);
  });
}
