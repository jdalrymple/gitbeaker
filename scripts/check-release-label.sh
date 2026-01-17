#!/bin/bash
# Check if PR has release:canary label
# Usage: ./scripts/check-release-label.sh <PR_NUMBER>
# Exit code: 0 if label found, 1 if not found

PR_NUMBER=${1:-$CIRCLE_PR_NUMBER}

if [[ -z "$PR_NUMBER" ]]; then
  echo "No PR number provided"
  exit 1
fi

if [[ -z "$GITHUB_TOKEN" ]]; then
  echo "GITHUB_TOKEN environment variable required"
  exit 1
fi

echo "Checking PR #$PR_NUMBER for release:canary label..."

# Fetch PR labels from GitHub API
labels=$(curl -s \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "User-Agent: gitbeaker-release-checker" \
  "https://api.github.com/repos/jdalrymple/gitbeaker/pulls/$PR_NUMBER" | \
  jq -r '.labels[].name' 2>/dev/null)

if [[ $? -ne 0 ]]; then
  echo "❌ Failed to fetch PR labels"
  exit 1
fi

echo "PR #$PR_NUMBER labels: $(echo "$labels" | tr '\n' ', ' | sed 's/, $//')"

if echo "$labels" | grep -q "^release:canary$"; then
  echo "✅ Found release:canary label"
  exit 0
else
  echo "❌ No release:canary label found"
  exit 1
fi