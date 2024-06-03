#!/bin/bash
# Install Docker
apt-get update
apt-get install -y docker.io
# Start Docker service
systemctl start docker
systemctl enable docker

# Pull and run Docker container
set +H

docker run -d -p 80:80 -e GITLAB_ROOT_PASSWORD=$GITLAB_ROOT_PASSWORD -e PERSONAL_ACCESS_TOKEN=$GITLAB_PERSONAL_ACCESS_TOKEN -e GITLAB_OMNIBUS_CONFIG="gitlab_rails['monitoring_whitelist'] = ['0.0.0.0/0', '172.17.0.1'];" docker.io/gitlab/gitlab-ce:$GITLAB_VERSION /bin/sh -c "printf '#!/usr/bin/env ruby \nu = User.first \nu.admin = true \nu.save! \nt = PersonalAccessToken.new({ user: u, name: \"gitbeaker\", scopes: [\"api\", \"read_user\"]})  \nt.expires_at = 365.days.from_now \nt.set_token(ENV[\"PERSONAL_ACCESS_TOKEN\"]) \nt.save!' > /opt/gitlab/embedded/service/gitlab-rails/db/fixtures/production/40_access_token.rb && /assets/wrapper"

set -H