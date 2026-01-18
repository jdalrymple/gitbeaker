# Testing Guide

This guide covers both containerized testing (recommended) and manual testing approaches.

- **Unit Tests**: Test individual functions and components in isolation
- **Integration Tests**: Test API interactions with a real GitLab instance
- **End-to-End Tests**: Test complete workflows from client to server

## 🐳 Containerized Testing (Recommended)

The easiest way to run the full test suite is using Docker, which provides a consistent, isolated environment.

### Quick Start

Run the complete test suite (unit + integration + e2e):

```bash
pnpm test:full
```

This command will:

- Start a GitLab CE instance using Docker Compose
- Wait for GitLab to be healthy and ready
- Set required environment variables
- Clean and build the project
- Run all test types sequentially (types, unit, integration, e2e)
- Keep GitLab running for additional testing (optional cleanup)

### Individual Test Types

You can also run specific test types individually:

```bash
# Type tests only
pnpm test:types

# Unit tests only
pnpm test:unit

# Integration tests only (requires GitLab running)
pnpm test:integration

# End-to-end tests only
pnpm test:e2e
```

### Manual GitLab Instance

To start just the GitLab instance for manual testing:

```bash
cd .docker && docker-compose up gitlab
```

GitLab will be available at `http://localhost:8080` with:

- Username: `root`
- Password: `gitbeaker`
- Personal Access Token: `superstrongpassword123`

## 🛠️ Local Testing (Alternative)

For contributors who prefer to test locally without Docker:

### Unit Tests

```bash
pnpm test:unit
```

### Integration Tests

1. First, run GitLab in a docker container:

```bash
cd .docker && docker-compose up gitlab
```

2. Once GitLab is up on localhost:8080, set the environment variables:

```bash
export GITLAB_URL="http://localhost:8080"
export GITLAB_PERSONAL_ACCESS_TOKEN="superstrongpassword123"
```

3. Run the integration tests:

```bash
pnpm test:integration
```

You can also define them inline:

```bash
GITLAB_URL='http://localhost:8080' GITLAB_PERSONAL_ACCESS_TOKEN='superstrongpassword123' pnpm test:integration
```

### End-to-End Tests

```bash
pnpm test:e2e
```

> **Note:** It may take about 3 minutes for GitLab to fully start up in the container

## 🔧 Troubleshooting

### Docker Issues

If you encounter Docker build issues:

```bash
# Clean Docker cache
docker system prune -f

# Rebuild containers
cd .docker && docker-compose build --no-cache
```

### SSL Certificate Issues

If you're behind a corporate firewall, you may need to configure Docker to trust your certificates or use alternative registries.

### GitLab Startup

GitLab requires significant resources and startup time. Ensure you have:

- At least 4GB of available RAM
- Docker Desktop running with sufficient memory allocation
- Wait 2-3 minutes for GitLab to be fully ready
