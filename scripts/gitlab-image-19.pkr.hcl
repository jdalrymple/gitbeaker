// This creates a GCP compute image with Docker and GitLab pre-installed for faster CI startup

packer {
  required_plugins {
    googlecompute = {
      version = ">= 1.1.1"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

source "googlecompute" "gitlab" {
  project_id              = "gitbeaker"
  source_image_family     = "debian-12"
  source_image_project_id = ["debian-cloud"]
  zone                    = "us-central1-c"
  image_name             = "gitlab-ready-image-19"
  image_description      = "Debian 12 with Docker and GitLab CE 19.2.0 pre-installed for CI/CD"
  machine_type           = "e2-medium"
  disk_size              = 25
  disk_type              = "pd-ssd"

  // Add labels for tracking
  image_labels = {
    environment = "ci"
    gitlab_version = "19-2-0-ce-0"
    created_by = "packer"
    purpose = "gitlab-testing"
  }
}

build {
  sources = ["source.googlecompute.gitlab"]

  provisioner "shell" {
    inline = [
      // Update system
      "echo 'Updating system packages...'",
      "sudo apt-get update",
      "sudo DEBIAN_FRONTEND=noninteractive apt-get upgrade -y",

      // Install essential tools
      "echo 'Installing essential tools...'",
      "sudo DEBIAN_FRONTEND=noninteractive apt-get install -y curl jq wget gnupg2 software-properties-common apt-transport-https ca-certificates",

      // Install Docker
      "echo 'Installing Docker...'",
      "sudo DEBIAN_FRONTEND=noninteractive apt-get install -y docker.io",

      // Configure Docker
      "echo 'Configuring Docker...'",
      "sudo systemctl enable docker",
      "sudo systemctl start docker",
      "sudo usermod -aG docker $USER",

      // Wait for Docker to be ready
      "echo 'Waiting for Docker to be ready...'",
      "sleep 10",
      "sudo docker info",

      // Pre-pull GitLab image (this is the main optimization - saves ~5-10 minutes on startup)
      "echo 'Pre-pulling GitLab CE image...'",
      "sudo docker pull gitlab/gitlab-ce:19.2.0-ce.0",

      // Verify the image was pulled
      "echo 'Verifying GitLab image...'",
      "sudo docker images | grep gitlab",

      // Clean up package cache to reduce image size
      "echo 'Cleaning up...'",
      "sudo apt-get autoremove -y",
      "sudo apt-get autoclean",
      "sudo rm -rf /var/lib/apt/lists/*",

      // Create a simple verification script
      "echo 'Creating verification script...'",
      "sudo tee /opt/verify-gitlab-image.sh << 'EOF'",
      "#!/bin/bash",
      "echo '=== GitLab Ready Image Verification ==='",
      "echo 'Docker version:'",
      "docker --version",
      "echo ''",
      "echo 'Docker status:'",
      "systemctl is-active docker",
      "echo ''",
      "echo 'GitLab images:'",
      "docker images | grep gitlab",
      "echo ''",
      "echo 'Disk usage:'",
      "df -h /",
      "EOF",
      "sudo chmod +x /opt/verify-gitlab-image.sh",

      // Final verification
      "echo 'Running final verification...'",
      "sudo /opt/verify-gitlab-image.sh"
    ]
  }

  // Add post-processor to output image details
  post-processor "manifest" {
    output = "gitlab-image-19-manifest.json"
  }
}