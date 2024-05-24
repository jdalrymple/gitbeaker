Testing is a work-in-progress right now but here is the start.

**Unit Tests**

Run:

```bash
yarn test:unit
```

**Integration Tests**

1. First, run Gitlab in a docker container:

```bash
docker-compose -f scripts/docker-compose.yml up
```

1. Once GitLab is up on localhost:8080, get the two environment variables from the docker image could
   either export them into environment variables locally:

```bash
export PERSONAL_ACCESS_TOKEN=$(docker exec -it gitlab bash -lc 'printf "%q" "${PERSONAL_ACCESS_TOKEN}"')
export GITLAB_URL=$(docker exec -it gitlab bash -lc 'printf "%q" "${GITLAB_URL}"')
```

1. Now run the tests

```bash
yarn test:integration:node
```

You can also define them in front of the yarn script

```
PERSONAL_ACCESS_TOKEN='abcdefg' GITLAB_URL='http://localhost:8080' yarn test
```

> Note it may take about 3 minutes to get the variables while Gitlab is starting up in the container
