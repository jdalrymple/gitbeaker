#!/usr/bin/env node

import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

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

// =============================================================================
// GitHub API Functions
// =============================================================================

async function getPRInfo(prNumber) {
  try {
    const output = execFileSync('gh', ['pr', 'view', prNumber, '--json', 'number,title,body'], {
      encoding: 'utf8',
    });
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`Failed to get PR info via GitHub CLI: ${error.message}`);
  }
}

// Conventional commit types and the bump they produce. null means a valid type that doesn't release.
// build, ci, style, test and dep are expressed as scopes of chore/fix instead, e.g. chore(ci): ...
const CHANGE_TYPES = {
  feat: 'minor',
  fix: 'patch',
  perf: 'patch',
  security: 'patch',
  refactor: 'patch',
  chore: 'patch',
  docs: null,
};

// Scopes that never release, whatever the type, e.g. chore(dev-deps): ...
const NON_RELEASE_SCOPES = ['dev-deps'];

// Matches "type: ...", "type(scope): ..." and "type(scope)!: ..."
const TITLE_PATTERN = /^(?<type>[a-z]+)(?:\((?<scope>[^)]+)\))?(?<breaking>!)?: \S/;

// Same markers CircleCI honours for skipping a pipeline
function hasSkipMarker(prData) {
  return /\[(skip ci|ci skip)\]/i.test(`${prData.title}\n${prData.body || ''}`);
}

function determineChangeType(prData) {
  const match = prData.title.match(TITLE_PATTERN);

  if (!match) {
    log(`PR title is not a conventional commit: "${prData.title}"`, '⚠️');
    return null;
  }

  const { type, scope, breaking } = match.groups;

  if (!(type in CHANGE_TYPES)) {
    log(`Unknown change type "${type}"`, '⚠️');
    return null;
  }

  if (NON_RELEASE_SCOPES.includes(scope)) return null;

  if (breaking || /^BREAKING[ -]CHANGE:/m.test(prData.body || '')) return 'major';

  return CHANGE_TYPES[type];
}

// =============================================================================
// Git Functions
// =============================================================================

const RELEASE_COMMIT_MESSAGE = 'Version packages and update changelogs [skip ci]';

// Matches release commits from this script and from the previous auto-it setup
const RELEASE_COMMIT_GREP = '^(Version packages and update changelogs|Bump version to:)';

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function getCommitSubjects(range) {
  const output = git('log', '--format=%s', range);
  return output ? output.split('\n') : [];
}

function isReleaseCommit(subject) {
  return new RegExp(RELEASE_COMMIT_GREP).test(subject);
}

// "title (#123)" for squash merges, or "Merge pull request #123 from ..." for merge commits
function getPRNumberFromSubject(subject) {
  const match = subject.match(/\(#(\d+)\)$/) || subject.match(/^Merge pull request #(\d+)/);
  return match?.[1];
}

// Only the pipeline for the newest commit on main releases, and it releases every PR
// merged since the last release. Older pipelines defer to it, so what gets published is
// always exactly what the releasing pipeline built and tested.
function checkoutLatestMain() {
  const sha = process.env.CIRCLE_SHA1 || git('rev-parse', 'HEAD');

  git('fetch', 'origin', 'main');

  const newerCommits = getCommitSubjects(`${sha}..origin/main`).filter(
    (subject) => !isReleaseCommit(subject),
  );

  if (newerCommits.length > 0) {
    log(`main has ${newerCommits.length} newer commit(s) - deferring to their pipeline`, '⏭️');
    return false;
  }

  // origin/main may be ahead by release commits only, which must be included so versions are current
  git('checkout', '-B', 'main', 'origin/main');
  return true;
}

// PR numbers merged since the last release commit, oldest first
function getUnreleasedPRNumbers() {
  const lastRelease = git('log', '-1', '--format=%H', '-E', `--grep=${RELEASE_COMMIT_GREP}`);
  // With no release commit in history, fall back to just the latest commit
  const range = lastRelease ? `${lastRelease}..HEAD` : 'HEAD^!';

  const prNumbers = getCommitSubjects(range)
    .filter((subject) => !isReleaseCommit(subject))
    .map(getPRNumberFromSubject)
    .filter(Boolean)
    .reverse();

  return [...new Set(prNumbers)];
}

function pushToMain() {
  try {
    git('push', 'origin', 'main');
  } catch {
    // Something merged while this job ran; its pipeline is queued behind this one
    log('Push rejected - rebasing onto origin/main and retrying', '🔁');
    git('pull', '--rebase', 'origin', 'main');
    git('push', 'origin', 'main');
  }
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

// All public packages are in a fixed group, so core's version is the release version
function getReleasedVersion() {
  return JSON.parse(readFileSync('packages/core/package.json', 'utf8')).version;
}

// Body of the newest "## v..." entry in the root CHANGELOG.md
function getLatestChangelogEntry() {
  if (!existsSync('CHANGELOG.md')) return '';

  const lines = readFileSync('CHANGELOG.md', 'utf8').split('\n');
  const start = lines.findIndex((line) => line.startsWith('## '));
  if (start === -1) return '';

  const end = lines.findIndex((line, i) => i > start && /^(## |---)/.test(line));

  return lines
    .slice(start + 1, end === -1 ? undefined : end)
    .join('\n')
    .trim();
}

function createChangeset(prData, changeType, packages) {
  const message = `${prData.title}

${prData.body || ''}

PR: #${prData.number}`;

  const args = ['change', ...packages, '--bump', changeType, '--summary', message];

  log(`Creating changeset with pnpm change...`, '📝');

  try {
    execFileSync('pnpm', args, { stdio: 'inherit' });
    log('Changeset created successfully', '✅');
    return true;
  } catch (error) {
    log(`Failed to create changeset: ${error.message}`, '❌');
    return false;
  }
}

// =============================================================================
// Publishing Functions
// =============================================================================

// Publishing uses npm trusted publishing: npm exchanges a CircleCI OIDC token for a short-lived
// publish token, so no npm token is stored anywhere. npm matches on the CircleCI context the job
// uses: npm-production may publish directly, npm-prerelease may only stage.
const NPM_OIDC_AUDIENCE = 'npm:registry.npmjs.org';

function getNpmIdToken() {
  return execFileSync(
    'circleci',
    ['run', 'oidc', 'get', '--claims', JSON.stringify({ aud: NPM_OIDC_AUDIENCE })],
    { encoding: 'utf8' },
  ).trim();
}

// Public workspace packages, ordered so each is published after the @gitbeaker packages it depends on
function getPublishablePackages() {
  const workspace = JSON.parse(execSync('pnpm ls --depth -1 --json', { encoding: 'utf8' }));

  const remaining = workspace
    .filter((pkg) => !pkg.private && pkg.name.includes('@'))
    .map((pkg) => {
      const manifest = JSON.parse(readFileSync(path.join(pkg.path, 'package.json'), 'utf8'));
      const dependencies = { ...manifest.dependencies, ...manifest.peerDependencies };

      return {
        name: pkg.name,
        path: pkg.path,
        version: manifest.version,
        internalDependencies: Object.keys(dependencies).filter((name) =>
          name.startsWith('@gitbeaker/'),
        ),
      };
    });

  const ordered = [];

  while (remaining.length > 0) {
    const next = remaining.findIndex((pkg) =>
      pkg.internalDependencies.every((name) => ordered.some((done) => done.name === name)),
    );
    if (next === -1) throw new Error('Circular dependency between workspace packages');

    ordered.push(...remaining.splice(next, 1));
  }

  return ordered;
}

function isPublished({ name, version }) {
  try {
    const output = execFileSync('npm', ['view', `${name}@${version}`, 'version'], {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    return output.trim() === version;
  } catch {
    return false;
  }
}

// pnpm pack swaps workspace:* ranges for real versions, which npm publish can't do itself
function packPackage(pkg, packDir) {
  const destination = path.join(packDir, pkg.name.replace('/', '-'));
  mkdirSync(destination);

  execFileSync('pnpm', ['pack', '--pack-destination', destination], {
    cwd: pkg.path,
    stdio: 'pipe',
  });

  return path.join(destination, readdirSync(destination)[0]);
}

// stage: true holds each version on npmjs.com until a maintainer approves it with 2FA
function publishPackages({ tag, stage = false }) {
  const packDir = mkdtempSync(path.join(tmpdir(), 'gitbeaker-pack-'));
  const command = stage ? ['stage', 'publish'] : ['publish'];

  for (const pkg of getPublishablePackages()) {
    if (isPublished(pkg)) {
      log(`${pkg.name}@${pkg.version} is already published - skipping`, '⏭️');
      continue;
    }

    const args = [...command, packPackage(pkg, packDir), '--access', 'public', '--tag', tag];

    if (isDryRun) {
      log(`Would execute: npm ${args.join(' ')}`, '🔍');
      continue;
    }

    log(`${stage ? 'Staging' : 'Publishing'} ${pkg.name}@${pkg.version} (${tag})...`);
    execFileSync('npm', args, {
      stdio: 'inherit',
      env: { ...process.env, NPM_ID_TOKEN: getNpmIdToken() },
    });
  }
}

// =============================================================================
// GitHub Integration Functions
// =============================================================================

const RELEASE_HEADINGS = {
  canary: '🐤 Canary Release Staged',
  pre: '🚧 Pre-release Staged',
  production: '🚀 Production Release Published',
};

async function updateReleaseComment(prNumber, releaseType, version, packages) {
  const commentMarker = `<!-- release-comment-${releaseType} -->`;

  let message = `${commentMarker}\n## ${RELEASE_HEADINGS[releaseType]}\n\n`;

  if (packages && packages.length > 0) {
    message +=
      releaseType === 'production'
        ? `The following packages have been published:\n\n`
        : `The following packages are staged on npm and will be available once a maintainer approves them:\n\n`;
    packages.forEach((pkg) => {
      message += `- [\`${pkg}@${version}\`](https://www.npmjs.com/package/${pkg}/v/${version})\n`;
    });
  }

  message += `\n_Released from commit ${process.env.CIRCLE_SHA1?.substring(0, 7) || 'unknown'}_`;

  if (isDryRun) {
    log(`Would update PR #${prNumber} release comment`, '💬');
    log(`Comment content: ${message.substring(0, 200)}...`, '💬');
    return;
  }

  try {
    // Find a previous release comment of this type so it can be edited in place
    const existingCommentId = execFileSync(
      'gh',
      [
        'api',
        '--paginate',
        `repos/{owner}/{repo}/issues/${prNumber}/comments`,
        '--jq',
        `[.[] | select(.body | contains("${commentMarker}")) | .id] | first // empty`,
      ],
      { encoding: 'utf8', stdio: 'pipe' },
    )
      .trim()
      .split('\n')[0]; // --paginate applies --jq per page

    if (existingCommentId) {
      execFileSync(
        'gh',
        [
          'api',
          '-X',
          'PATCH',
          `repos/{owner}/{repo}/issues/comments/${existingCommentId}`,
          '--input',
          '-',
        ],
        { stdio: 'pipe', input: JSON.stringify({ body: message }) },
      );
    } else {
      execFileSync('gh', ['pr', 'comment', String(prNumber), '--body-file', '-'], {
        stdio: 'pipe',
        input: message,
      });
    }

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
    execFileSync(
      'gh',
      ['release', 'create', `v${version}`, '--title', `v${version}`, '--notes', changelogContent],
      { stdio: 'pipe', encoding: 'utf8' },
    );
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

  // PR code may come from a fork, so it can only stage; a maintainer approves on npmjs.com
  publishPackages({ tag: 'canary', stage: true });

  log('Canary release staged - approve it on npmjs.com to publish', '✅');
}

function executePrerelease() {
  log('Executing pre-release...', '🚧');

  // Use snapshot to preserve changesets
  execCommandOrThrow('pnpm changeset version --snapshot pre', 'Creating pre-release versions');

  // PR code may come from a fork, so it can only stage; a maintainer approves on npmjs.com
  publishPackages({ tag: 'pre', stage: true });

  log('Pre-release staged - approve it on npmjs.com to publish', '✅');
}

function executeProductionRelease() {
  log('Executing production release...', '🚀');

  // Generate global changelog BEFORE versioning (local operation - always execute)
  execCommandOrThrow('node .changeset/global-changelog.mjs', 'Generating global changelog');

  // Normal versioning (consumes changesets, updates individual changelogs - local operation)
  execCommandOrThrow('pnpm changeset version', 'Versioning packages');

  // Update contributors (local operation - always execute)
  // The all-contributors-cli package installs its binary as "all-contributors"
  execCommandOrThrow('pnpm all-contributors generate', 'Updating contributors');

  // Commit changes (local operation - always execute)
  try {
    git('add', '.');
    git('commit', '-m', RELEASE_COMMIT_MESSAGE);
    log('Committed changes', '📝');
  } catch (error) {
    throw new Error(`Git commit failed: ${error.message}`);
  }

  // Publish before pushing so main never claims a version that isn't on npm
  publishPackages({ tag: 'latest' });

  if (isDryRun) {
    log('Would push to origin main (skipped in dry-run)', '📝');
  } else {
    try {
      pushToMain();
      log('Pushed changes to origin', '📝');
    } catch (error) {
      throw new Error(
        `Packages were published but the release commit could not be pushed to main - push it manually: ${error.message}`,
      );
    }
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

  if (!['canary', 'pre', 'production'].includes(releaseType)) {
    throw new Error(`Unknown release type: ${releaseType}`);
  }

  log(`Starting ${releaseType} release on branch: ${branch}`, '🚀');

  // Get affected packages
  const packages = getPackages();
  if (packages.length === 0) {
    log('No packages found', '❌');
    return;
  }

  log(`Found packages: ${packages.join(', ')}`, '📦');

  // Production batches every PR merged since the last release; canary and pre release a single PR
  let prNumbers;

  if (releaseType === 'production') {
    if (!checkoutLatestMain()) return;
    prNumbers = getUnreleasedPRNumbers();
  } else {
    // Started by approving the job in CircleCI, which pins it to this pipeline's commit.
    // CircleCI sets CIRCLE_PULL_REQUEST (".../pull/123") when the branch has an open PR.
    const prNumber = process.env.CIRCLE_PULL_REQUEST?.match(/\/pull\/(\d+)$/)?.[1];

    prNumbers = prNumber ? [prNumber] : [];
  }

  if (prNumbers.length === 0) {
    // A maintainer explicitly asked for a canary/pre, so make a missing PR visible
    if (releaseType !== 'production') {
      throw new Error('No open PR for this branch - canary and pre releases need one');
    }

    log('No PRs found - skipping release', '⏭️');
    return;
  }

  // Create a changeset for each PR that calls for a release
  const releasedPRs = [];

  for (const prNumber of prNumbers) {
    const prData = await getPRInfo(prNumber);

    log(`Processing PR #${prData.number}: ${prData.title}`, '📋');

    if (hasSkipMarker(prData)) {
      log('Skip marker found in PR title or body - skipping', '⏭️');
      continue;
    }

    const changeType = determineChangeType(prData);
    if (!changeType) {
      log('PR title does not call for a release - skipping', '⏭️');
      continue;
    }

    log(`Detected change type: ${changeType}`, '📊');

    if (!createChangeset(prData, changeType, packages)) {
      throw new Error(`Failed to create changeset for PR #${prData.number}`);
    }

    releasedPRs.push(prData);
  }

  if (releasedPRs.length === 0) {
    log('Nothing to release', '⏭️');
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

  const version = getReleasedVersion();

  if (releaseType === 'production') {
    await createGitHubRelease(version, getLatestChangelogEntry());
  }

  for (const prData of releasedPRs) {
    await updateReleaseComment(prData.number, releaseType, version, packages);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Release failed:', error);
    process.exit(1);
  });
}
