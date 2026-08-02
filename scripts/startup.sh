#!/bin/bash
echo "=== GitLab Startup Script ==="
echo "Starting GitLab using pre-pulled image from custom VM image..."

# Docker should already be installed and running from the custom image
# Verify Docker is running
if ! systemctl is-active --quiet docker; then
  echo "Docker not running, starting it..."
  systemctl start docker
  sleep 5
fi

# Verify GitLab image is available (should be pre-pulled in custom image)
if docker images | grep -q "gitlab/gitlab-ce:$GITLAB_VERSION"; then
  echo "✅ GitLab image gitlab/gitlab-ce:$GITLAB_VERSION found (pre-pulled)"
else
  echo "⚠️  GitLab image not found, pulling it now..."
  docker pull gitlab/gitlab-ce:$GITLAB_VERSION
fi

# Run GitLab container using the same pattern as docker-compose.yml
echo "Starting GitLab container..."

docker run -d -p 80:80 \
  --name gitlab-instance \
  --hostname gitlab \
  --privileged \
  --shm-size=256m \
  -e GITLAB_ROOT_PASSWORD=$GITLAB_ROOT_PASSWORD \
  -e GITLAB_PERSONAL_ACCESS_TOKEN=$GITLAB_PERSONAL_ACCESS_TOKEN \
  -e GITLAB_OMNIBUS_CONFIG="external_url 'http://localhost'; gitlab_rails['monitoring_whitelist'] = ['0.0.0.0/0']; postgresql['shared_buffers'] = '256MB'; postgresql['max_worker_processes'] = 8; prometheus_monitoring['enable'] = false; alertmanager['enable'] = false; node_exporter['enable'] = false; redis_exporter['enable'] = false; postgres_exporter['enable'] = false; gitlab_exporter['enable'] = false;" \
  --entrypoint /bin/sh \
  gitlab/gitlab-ce:$GITLAB_VERSION \
  -c "cat > /opt/gitlab/embedded/service/gitlab-rails/db/fixtures/production/40_access_token.rb << 'EOF'
#!/usr/bin/env ruby
u = User.first
u.admin = true
u.save!
token = PersonalAccessToken.new({
  user: u,
  name: \"gitbeaker\",
  scopes: [\"api\", \"read_user\", \"read_repository\", \"write_repository\"]
})
token.expires_at = 365.days.from_now
token.set_token(ENV[\"GITLAB_PERSONAL_ACCESS_TOKEN\"])
token.save!
EOF
exec /assets/init-container"

echo "✅ GitLab startup script completed"