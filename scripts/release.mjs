#!/usr/bin/env node
/**
 * Unified release script
 */

import { execSync } from 'child_process';

const isCanary = process.argv[2] === 'canary';
const releaseType = isCanary ? 'canary' : 'production';

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

async function release() {
  logStep(`Starting ${releaseType} release`);

  // Generate changeset from PR labels
  // Adds limitation to only release from PRs for now
  let prNumber = process.env.CIRCLE_PR_NUMBER;

  if (!prNumber) {
    logStep('No PR number found - skipping release');
    return;
  }

  if (
    !execCommand(
      'node scripts/generate-changesets-from-labels.mjs',
      'Generating changeset from PR labels',
    )
  ) {
    process.exit(1);
  }

  // Check if there are any changesets to process
  try {
    execSync('yarn changeset version', { stdio: 'pipe' });
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
    const hasChanges = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
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
