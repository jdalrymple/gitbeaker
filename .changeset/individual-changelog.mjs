import changelogGithub from '@changesets/changelog-github';

import { excludeMaintainer } from './changelog-utils.mjs';

/**
 * Individual package changelog generator
 * Uses standard changesets behavior with maintainer exclusion
 */

const getReleaseLine = async (changeset, type, options) => {
  // Generate individual release line for package changelogs
  const line = await changelogGithub.getReleaseLine(changeset, type, options);
  return excludeMaintainer(line);
};

const getDependencyReleaseLine = async (changesets, dependenciesUpdated, options) => {
  // Get the default changelog from changesets
  const defaultChangelog = await changelogGithub.getDependencyReleaseLine(
    changesets,
    dependenciesUpdated,
    options,
  );

  if (!defaultChangelog) return '';

  // Apply maintainer exclusion to the entire changelog
  return excludeMaintainer(defaultChangelog);
};

const changelogFunctions = {
  ...changelogGithub,
  getReleaseLine,
  getDependencyReleaseLine,
};

export default changelogFunctions;
