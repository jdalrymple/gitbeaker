/**
 * Shared utilities for changelog generation
 */

/** Usernames that should not get "Thanks @user!" in changelogs (e.g. repo owner) */
export const EXCLUDED_USERS = ['jdalrymple'];

/**
 * Remove excluded maintainers from changelog lines
 * @param {string} line - The changelog line to process
 * @returns {string} - The processed line with excluded users removed
 */
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

/**
 * Generate package links for the aggregated changelog
 * @param {Array} packages - Array of package names
 * @returns {string} - Comma-separated package links
 */
export function generatePackageLinks(packages) {
  return Array.from(packages)
    .sort()
    .map((pkg) => {
      const packageName = pkg.replace('@gitbeaker/', '');
      return `[@${pkg}](packages/${packageName}/CHANGELOG.md)`;
    })
    .join(', ');
}
