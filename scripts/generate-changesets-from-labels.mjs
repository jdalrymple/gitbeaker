#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { fetchPRData } from './github-api.mjs';

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

function getPackageNames() {
  try {
    // Get all workspace packages using yarn
    const output = execSync('yarn workspaces list --json', { encoding: 'utf8' });
    const workspaces = output
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line));

    // Filter out the root workspace and get package names
    const packageNames = workspaces
      .filter((ws) => ws.location !== '.' && ws.name) // Skip root workspace
      .map((ws) => ws.name);

    return packageNames;
  } catch (error) {
    console.warn('Could not get workspace packages:', error.message);
    return [];
  }
}

function generateChangesetYaml(packageNames, changeType) {
  if (packageNames.length === 0) return '';

  return packageNames.map((name) => `"${name}": ${changeType}`).join('\n');
}

async function generateChangesetFromPR() {
  const prNumber = process.env.PR_NUMBER;

  if (!prNumber) {
    console.log('No PR number found in environment, skipping changeset generation');
    return;
  }

  try {
    // Fetch PR data from GitHub API
    const prData = await fetchPRData(prNumber);

    // Get labels
    const labels = prData.labels.map((label) => label.name);
    console.log(`Found PR labels: ${labels.join(', ')}`);

    // Find change type
    const changeType = labels
      .map((label) => labelToChangeType[label])
      .filter(Boolean)
      .sort(
        (a, b) => ['major', 'minor', 'patch'].indexOf(a) - ['major', 'minor', 'patch'].indexOf(b),
      )[0];

    if (!changeType) {
      console.log('No labels found that trigger a release, skipping changeset generation');

      // TODO: Default to patch update instead
      return;
    }

    console.log(`Determined change type: ${changeType}`);

    // Get package names using yarn workspaces
    const packageNames = getPackageNames();
    if (packageNames.length === 0) {
      console.warn('No packages found in yarn workspaces');
      return;
    }

    console.log(`Found packages: ${packageNames.join(', ')}`);

    // Create changeset
    if (!existsSync('.changeset')) mkdirSync('.changeset');

    const changesetContent = `---
${generateChangesetYaml(packageNames, changeType)}
---

${prData.title}`;

    const filename = `.changeset/pr-${prNumber}-${Date.now()}.md`;
    writeFileSync(filename, changesetContent);

    console.log(`Generated changeset: ${filename}`);
  } catch (error) {
    console.error('Error generating changeset:', error.message);
  }
}

generateChangesetFromPR();
