import changelogGithub from '@changesets/changelog-github';

/** Usernames that should not get "Thanks @user!" in changelogs (e.g. repo owner) */
const EXCLUDED_USERS = ['jdalrymple'];

function stripThanks(line) {
  for (const user of EXCLUDED_USERS) {
    const userPattern = `\\[@${user}\\]\\([^)]*\\)`;
    // User is the sole contributor: " Thanks [@user](url)!" → ""
    line = line.replace(new RegExp(` Thanks ${userPattern}!`, 'g'), '');
    // User is first/middle in list: "[@user](url), " → ""
    line = line.replace(new RegExp(`${userPattern}, `, 'g'), '');
    // User is last in list: ", [@user](url)" → ""
    line = line.replace(new RegExp(`, ${userPattern}`, 'g'), '');
  }
  // Clean up leftover "- -" when thanks was the only prefix content
  line = line.replace(/^(\n*-)\s+-\s+/m, '$1 ');
  return line;
}

const changelogFunctions = {
  ...changelogGithub,
  getReleaseLine: async (...args) => {
    const line = await changelogGithub.getReleaseLine(...args);
    return stripThanks(line);
  },
};

export default changelogFunctions;