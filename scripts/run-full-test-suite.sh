#!/bin/bash

# Test script that starts GitLab and runs tests locally
# This avoids the Docker build issues with native dependencies

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
GITLAB_URL="http://localhost:8080"
PERSONAL_ACCESS_TOKEN="superstrongpassword123"
COMPOSE_FILE=".docker/docker-compose.yml"

echo -e "${YELLOW}Starting GitLab test environment...${NC}"

# Check if Docker Compose file exists
if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}Error: Docker Compose file not found at $COMPOSE_FILE${NC}"
    exit 1
fi

# Start GitLab service
echo "Starting GitLab container..."
cd .docker
docker-compose up -d gitlab

echo "Waiting for GitLab to be healthy..."
# Wait for GitLab to be healthy (this can take a few minutes)
while ! docker-compose exec gitlab curl -f http://localhost/users/sign_in > /dev/null 2>&1; do
    echo "Waiting for GitLab to start..."
    sleep 10
done

echo -e "${GREEN}GitLab is ready!${NC}"

# Go back to project root
cd ..

# Set environment variables for tests
export GITLAB_URL="$GITLAB_URL"
export GITLAB_PERSONAL_ACCESS_TOKEN="$PERSONAL_ACCESS_TOKEN"
export CI="true"
export NODE_ENV="test"

echo -e "${YELLOW}Running tests locally with GitLab environment...${NC}"

# Clean artifacts
echo "Clean artifacts..."
yarn clean

# Clean artifacts
echo "Install deps..."
yarn install

# Build
echo "Building project..."
yarn build

# Run the tests
echo "Running type tests..."
yarn test:types

echo "Running unit tests..."
yarn test:unit

echo "Running integration tests..."
yarn test:integration

echo "Running e2e tests..."
yarn test:e2e

echo -e "${GREEN}All tests completed successfully!${NC}"

# Optionally stop GitLab (uncomment if you want to clean up automatically)
# echo "Stopping GitLab container..."
# cd .docker
# docker-compose down