#!/bin/bash

# Build GitLab ready image using Packer
# This script creates a GCP compute image with GitLab pre-installed for faster CI startup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Building GitLab Ready Image...${NC}"

# Check if packer is installed
if ! command -v packer &> /dev/null; then
    echo -e "${RED}❌ Packer is not installed. Please install it first:${NC}"
    echo "   brew install packer"
    echo "   or download from: https://www.packer.io/downloads"
    exit 1
fi

# Check if gcloud is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with gcloud. Please run:${NC}"
    echo "   gcloud auth login"
    echo "   gcloud config set project gitbeaker"
    exit 1
fi

# Verify project access
current_project=$(gcloud config get-value project 2>/dev/null)
if [ "$current_project" != "gitbeaker" ]; then
    echo -e "${YELLOW}⚠️  Current project is '$current_project', setting to 'gitbeaker'${NC}"
    gcloud config set project gitbeaker
fi

# Initialize and validate packer
echo -e "${GREEN}🔧 Initializing Packer...${NC}"
cd "$(dirname "$0")"
packer init gitlab-image-19.pkr.hcl

echo -e "${GREEN}✅ Validating Packer configuration...${NC}"
packer validate gitlab-image-19.pkr.hcl

# Build the image
echo -e "${GREEN}🏗️  Building GitLab image (this may take 5-10 minutes)...${NC}"
packer build gitlab-image-19.pkr.hcl

echo -e "${GREEN}✅ Image build complete!${NC}"
echo ""
echo -e "${GREEN}📋 Next steps:${NC}"
echo "1. Update .circleci/config.yml to use the new image:"
echo "   --image=gitlab-ready-image-19 \\"
echo ""
echo "2. Verify the image works:"
echo "   gcloud compute images describe gitlab-ready-image-19 --project=gitbeaker"
echo ""
echo "3. Test with a temporary VM:"
echo "   gcloud compute instances create test-gitlab-image \\"
echo "     --image=gitlab-ready-image-19 \\"
echo "     --project=gitbeaker \\"
echo "     --zone=us-central1-c"
echo ""
echo -e "${YELLOW}💡 Don't forget to delete test VMs when done testing!${NC}"