/**
 * Shared utilities for changelog generation
 */

/** Usernames that should not get mentioned in changelogs (e.g. repo owner) */
export const EXCLUDED_USERS = ['jdalrymple'];

export function excludeMaintainer(line) {
  for (const user of EXCLUDED_USERS) {
    const userPattern = `\\[@${user}\\]\\([^)]*\\)`;
    // User is the sole contributor in parentheses: " ([#123](url)) ([@user](url))" → " ([#123](url))"
    line = line.replace(new RegExp(` \\(${userPattern}\\)`, 'g'), '');
    // User is first/middle in list: "[@user](url), " → ""
    line = line.replace(new RegExp(`${userPattern}, `, 'g'), '');
    // User is last in list: ", [@user](url)" → ""
    line = line.replace(new RegExp(`, ${userPattern}`, 'g'), '');
    // Clean up empty parentheses: " ()" → ""
    line = line.replace(/ \(\)/g, '');
  }
  return line;
}
