#!/usr/bin/env node

import changelogGithub from '@changesets/changelog-github';
import { getCommitsThatAddFiles } from '@changesets/git';
import getChangeSets from '@changesets/read';
import getReleasePlan from '@changesets/get-release-plan';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { excludeMaintainer } from './changelog-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetPath = process.argv[2] ?? path.resolve(__dirname, '..');

/**
 * Global changelog generator for aggregated changelog
 * Runs before `changeset version` to generate the root CHANGELOG.md
 * with changes grouped by packages and bump type
 */

async function getBody(changesetsWithCommit, options) {
  if (changesetsWithCommit.length === 0) return '';

  // Group changesets by change type (major, minor, patch)
  const changesByType = {
    major: [],
    minor: [],
    patch: []
  };

  // Group by summary to avoid duplicates and combine packages
  const entriesByContent = changesetsWithCommit.reduce((acc, changeset) => {
    const key = changeset.summary;
    if (!acc[key]) {
      acc[key] = {
        summary: changeset.summary,
        packages: new Set(),
        commit: changeset.commit,
        changeset: changeset,
        highestChangeType: 'patch'
      };
    }

    // Add all packages that this changeset affects and determine highest change type
    changeset.releases.forEach((release) => {
      acc[key].packages.add(release.name);
      
      // Determine highest change type for this changeset
      const typeOrder = { patch: 0, minor: 1, major: 2 };
      if (typeOrder[release.type] > typeOrder[acc[key].highestChangeType]) {
        acc[key].highestChangeType = release.type;
      }
    });

    return acc;
  }, {});

  // Sort entries by change type
  for (const entry of Object.values(entriesByContent)) {
    changesByType[entry.highestChangeType].push(entry);
  }

  let changelog = '';

  // Generate sections for each change type
  const typeLabels = {
    major: 'Major Changes',
    minor: 'Minor Changes', 
    patch: 'Patch Changes'
  };

  for (const [type, entries] of Object.entries(changesByType)) {
    if (entries.length === 0) continue;

    changelog += `### ${typeLabels[type]}\n\n`;

    for (const { packages, changeset } of entries) {
      const affectedPackages = Array.from(packages).sort().join(', ');
      const customOptions = {
        ...options,
        template: `- ${affectedPackages}: {summary} {ref} ({authors})`,
      };

      const githubLine = await changelogGithub.getReleaseLine(changeset, type, customOptions);

      if (githubLine) {
        changelog += excludeMaintainer(githubLine) + '\n';
      }
    }

    changelog += '\n';
  }

  return changelog.trim();
}

function insertBody(oldChangelog, newBody, version) {
  if (!newBody.trim()) return oldChangelog;

  // Create version header with date
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    year: 'numeric',
  });
  
  const versionHeader = `## v${version} (${dateStr})`;
  const fullEntry = `${versionHeader}\n\n${newBody}`;

  // Find the first ## heading (version) or create one
  const lines = oldChangelog.split('\n');
  const headerIndex = lines.findIndex((line) => line.match(/^## /));

  if (headerIndex === -1) {
    // No existing versions, add after the title and any separator
    const titleIndex = lines.findIndex((line) => line.match(/^# /));
    if (titleIndex === -1) {
      // No title, add at the beginning
      return `${fullEntry}\n\n${oldChangelog}`;
    }
    // Insert after title and any description/separator
    let insertIndex = titleIndex + 1;
    // Skip empty lines and separators like "---"
    while (insertIndex < lines.length && 
           (lines[insertIndex].trim() === '' || 
            lines[insertIndex].match(/^---/) ||
            !lines[insertIndex].match(/^## /))) {
      insertIndex++;
    }
    lines.splice(insertIndex, 0, fullEntry, '');
  } else {
    // Insert before the first version
    lines.splice(headerIndex, 0, fullEntry, '', '---', '');
  }

  return lines.join('\n');
}

async function main(cwd) {
  try {
    const changelogFile = path.join(cwd, 'CHANGELOG.md');
    let oldChangelog = '';

    if (fs.existsSync(changelogFile)) {
      oldChangelog = fs.readFileSync(changelogFile, 'utf-8');
    } else {
      oldChangelog = `# @gitbeaker

All notable changes to this project will be documented in this file.

`;
    }

    // Load changesets and add commit hashes
    const changesets = await getChangeSets(cwd);

    if (changesets.length === 0) {
      console.log('No changesets found. Nothing to add to global changelog.');
      return;
    }

    const commits = await getCommitsThatAddFiles(
      changesets.map((changeset) => `.changeset/${changeset.id}.md`),
      { cwd, short: true },
    );

    const changesetsWithCommit = changesets.map((changeset, idx) => ({
      ...changeset,
      commit: commits[idx],
    }));

    // Get the version from the release plan
    const releasePlan = await getReleasePlan(cwd);
    const primaryRelease = releasePlan.releases.find(release => release.name === '@gitbeaker/core');
    
    if (!primaryRelease) {
      console.log('No primary release found in release plan.');
      return;
    }

    const version = primaryRelease.newVersion;

    // Read options from config.json
    const configPath = path.join(__dirname, 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const options = config.changelog[1];

    // Generate the new changelog body
    const body = await getBody(changesetsWithCommit, options);

    if (!body) {
      console.log('No changelog content generated.');
      return;
    }

    console.log(`Generated changelog for version: ${version}`);
    
    // Insert the new body and write the updated changelog
    const newChangelog = insertBody(oldChangelog, body, version);
    fs.writeFileSync(changelogFile, newChangelog, 'utf-8');
  } catch (error) {
    console.error('❌ Error generating global changelog:', error);
    process.exit(1);
  }
}

// Export functions for use by changeset if needed
export { getBody, insertBody };

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main(targetPath);
}
