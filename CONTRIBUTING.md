# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Branch off `main` and install dependencies with `pnpm install`. A pre-commit hook runs the
   linter and formatter for you.
2. Add or update tests for your change, and make sure `pnpm lint`, `pnpm format`, `pnpm test:types`
   and `pnpm test:unit` pass. See the [Testing Guide](./docs/TESTING.md) for integration and e2e
   tests, which run against a real GitLab instance.
3. Update the README.md and the [docs](./docs) if your change affects how the library is used.
4. Give the PR a conventional commit title, as described in
   [PR Titles and Releases](#pr-titles-and-releases). Don't change version numbers or changelogs
   yourself; they are updated automatically when the PR is released.
5. Once CI passes and a maintainer has approved the PR, they will squash merge it into `main`.

### E2E tests in CI

The e2e tests run against a GitLab instance on GCP, so they need credentials. They run
automatically on `main`, and on PRs once a maintainer approves the `approve-e2e-tests` job.

CI never gives credentials to PRs from forks, so their e2e tests run in a separate pipeline,
`e2e-fork-pr` (`.circleci/e2e-fork-pr.yml`). Once a maintainer has reviewed the PR, they trigger it
in CircleCI on `main`, with the `e2e_pr` parameter set to the PR number.

The run tests the PR merged into `main`, so the PR must not conflict with `main`. The result is
posted on the PR as the `ci/circleci: e2e (fork PR)` status. Only `main`'s code runs with
credentials; the PR's code runs in jobs without any credentials or access to shared caches.

## PR Titles and Releases

Releases are fully automated and driven by the PR title, which must follow the
[Conventional Commits](https://www.conventionalcommits.org/) format. A check on every PR enforces
this.

```
type(scope)!: Subject
```

The scope and `!` are optional. The type decides whether merging the PR publishes a release, and
which version is bumped:

| Type                                           | Release |
| ---------------------------------------------- | ------- |
| `feat`                                         | Minor   |
| `fix`, `perf`, `security`, `refactor`, `chore` | Patch   |
| `docs`                                         | None    |
| Any type with `!`, e.g. `feat!: ...`           | Major   |

- A line starting with `BREAKING CHANGE:` in the PR description also makes the release major.
- The `dev-deps` and `tests` scopes never release, whatever the type, e.g.
  `chore(dev-deps): Bump vitest` or `chore(tests): Add unit tests for Runners`.
  Changes to dependencies that ship with the packages use `chore(deps)` and release a patch.
- There are no separate `build`, `ci`, `style`, `test` or `dep` types. Use a scope of `chore` or
  `fix` instead, e.g. `chore(ci): ...` or `fix(deps): ...`.
- Adding `[skip ci]` to the PR title or description skips the release. As the title becomes the
  merge commit message, it also skips the CI pipeline on `main`.

The PR title and description become the changelog entry, so write them for the people using the
library.

### Production releases

PRs are squash merged into `main`. Each merge triggers a release of every PR merged since the last
release, once all tests pass. If several PRs are merged in quick succession, they are released
together by the pipeline for the newest one.

### Canary and pre-releases

Maintainers can release a PR before it is merged by manually triggering the separate
`release-preview` CircleCI pipeline (`.circleci/release-preview.yml`) on the PR's branch, with the
`release_type` parameter:

- `canary` (the default) releases under the `canary` npm tag.
- `pre` releases under the `pre` npm tag.

This pipeline doesn't run any tests itself. Before releasing, it checks that the `validate-and-test`
pipeline passed for the same commit. A canary can go out while the e2e tests are still waiting for
approval, but a pre-release needs them to have passed too.

The release is built from the branch's latest commit when the pipeline is triggered. It can't run on
PRs from forks, which never run with release credentials.

As an extra safeguard, these releases are only staged on npm. They become available once a
maintainer approves them on npmjs.com with two-factor authentication, or with `npm stage approve`.
The staged versions are posted as a comment on the PR.

### Publishing

Packages are published with [npm trusted publishing](https://docs.npmjs.com/trusted-publishers), so
no npm token is stored in CI. Releases run in their own CircleCI pipelines, separate from the one
that tests PRs (including PRs from forks), so the test pipeline can never publish. Production
releases (`.circleci/release-production.yml`) are started by the test pipeline on `main` once
everything passes, and can only publish from `main`.

## Code of Conduct

This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected
to uphold it.
