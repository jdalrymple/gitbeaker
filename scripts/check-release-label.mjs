#!/usr/bin/env node
/**
 * Check if PR has release:canary label
 * Usage: 
 *   node scripts/check-release-label.mjs <PR_NUMBER>
 *   node scripts/check-release-label.mjs  # Uses environment variables
 * Exit code: 0 if label found, 1 if not found
 */

import { fetchPRData } from './github-api.mjs';

const prNumber = process.argv[2] || process.env.CIRCLE_PR_NUMBER || process.env.PR_NUMBER;

if (!prNumber) {
  console.error('No PR number provided');
  process.exit(1);
}

async function checkReleaseLabel() {
  try {
    const prData = await fetchPRData(prNumber);
    const labels = prData.labels.map(label => label.name);
    
    console.log(`PR #${prNumber} labels: ${labels.join(', ')}`);
    
    if (labels.includes('release:canary')) {
      console.log('✅ Found release:canary label');
      process.exit(0);
    } else {
      console.log('❌ No release:canary label found');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error checking label:', error.message);
    process.exit(1);
  }
}

checkReleaseLabel();