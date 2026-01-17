/**
 * Shared GitHub API utilities
 */

/**
 * Fetch PR data from GitHub API
 * @param {string} prNumber - The PR number
 * @returns {Promise<Object>} PR data from GitHub API
 */
export async function fetchPRData(prNumber) {
  const repoUrl = process.env.CIRCLE_REPOSITORY_URL || 'https://github.com/jdalrymple/gitbeaker';
  
  // Extract owner/repo from URL
  const match = repoUrl.match(/github\.com[/:]([\w-]+)\/([\w-]+)/);
  if (!match) {
    throw new Error(`Could not parse repository URL: ${repoUrl}`);
  }
  const [, owner, repo] = match;

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'gitbeaker-api-client'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}