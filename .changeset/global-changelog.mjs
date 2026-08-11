#!/usr/bin/env node

import changelogGithub from '@changesets/changelog-github';
import { getCommitsThatAddFiles } from '@changesets/git';
import getChangeSets from '@changesets/read';
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

/**
 * Generate the new body for the global changelog
 * @param {Array} changesetsWithCommit - Changesets with commit hashes
 * @param {Object} options - Options for GitHub changelog generation
 * @returns {string} - The new changelog body
 */
async function getBody(changesetsWithCommit, options) {
  if (changesetsWithCommit.length === 0) return '';

  let changelog = '';

  // Group by summary to avoid duplicates and combine packages
  const entriesByContent = changesetsWithCommit.reduce((acc, changeset) => {
    const key = changeset.summary;
    if (!acc[key]) {
      acc[key] = {
        summary: changeset.summary,
        packages: new Set(),
        commit: changeset.commit,
        changeset: changeset,
      };
    }

    // Add all packages that this changeset affects
    changeset.releases.forEach((release) => {
      acc[key].packages.add(release.name);
    });

    return acc;
  }, {});

  for (const { packages, changeset } of Object.values(entriesByContent)) {
    // Create custom options with affected packages template
    const affectedPackages = Array.from(packages).sort().join(', ');
    const customOptions = {
      ...options,
      template: `- ${affectedPackages}: {summary} {ref} ({authors})`,
    };

    // Use the GitHub changelog generator with our custom template
    const githubLine = await changelogGithub.getReleaseLine(changeset, 'major', customOptions);

    if (githubLine) {
      changelog += excludeMaintainer(githubLine) + '\n';
    }
  }

  return changelog.trim();
}

/**
 * Insert the new body into the existing changelog
 * @param {string} oldChangelog - Existing changelog content
 * @param {string} newBody - New changelog body to insert
 * @returns {string} - Updated changelog content
 */
function insertBody(oldChangelog, newBody) {
  if (!newBody.trim()) return oldChangelog;

  // Find the first ## heading (version) or create one
  const lines = oldChangelog.split('\n');
  const headerIndex = lines.findIndex((line) => line.match(/^## /));

  if (headerIndex === -1) {
    // No existing versions, add after the title
    const titleIndex = lines.findIndex((line) => line.match(/^# /));
    if (titleIndex === -1) {
      // No title, add at the beginning
      return `${newBody}\n\n${oldChangelog}`;
    }
    // Insert after title and any description
    let insertIndex = titleIndex + 1;
    while (insertIndex < lines.length && !lines[insertIndex].match(/^## /)) {
      insertIndex++;
    }
    lines.splice(insertIndex, 0, '', newBody, '');
  } else {
    // Insert before the first version
    lines.splice(headerIndex, 0, newBody, '', '---', '');
  }

  return lines.join('\n');
}

/**
 * Main function to generate global changelog
 */
async function main(cwd) {
  try {
    // Load the existing changelog
    const changelogFile = path.join(cwd, 'CHANGELOG.md');
    let oldChangelog = '';

    if (fs.existsSync(changelogFile)) {
      oldChangelog = fs.readFileSync(changelogFile, 'utf-8');
    } else {
      // Create a basic changelog if it doesn't exist
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

    // Create options for GitHub changelog generation using valid tokens
    // The first line of {summary} is the PR title, rest is the body
    const options = {
      repo: 'jdalrymple/gitbeaker',
      template: '\n\n- {summary} {ref} ({authors})',
      disableThanks: false,
    };

    // Generate the new changelog body
    const body = await getBody(changesetsWithCommit, options);

    if (!body) {
      console.log('No changelog content generated.');
      return;
    }

    // Insert the new body and write the updated changelog
    const newChangelog = insertBody(oldChangelog, body);
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
