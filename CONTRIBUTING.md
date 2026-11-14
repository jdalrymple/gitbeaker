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
- The `dev-deps` scope never releases, whatever the type, e.g. `chore(dev-deps): Bump vitest`.
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

Maintainers can release a PR before it is merged by manually triggering the separate `prerelease`
CircleCI pipeline (`.circleci/prerelease.yml`) on the PR's branch, with the `release_type`
parameter:

- `canary` (the default) releases under the `canary` npm tag.
- `pre` releases under the `pre` npm tag.

This pipeline doesn't run any tests itself. Before releasing, it checks that the main pipeline
passed for the same commit. A canary can go out while the e2e tests are still waiting for approval,
but a pre-release needs them to have passed too.

The release is built from the branch's latest commit when the pipeline is triggered. It can't run on
PRs from forks, which never run with release credentials.

As an extra safeguard, these releases are only staged on npm. They become available once a
maintainer approves them on npmjs.com with two-factor authentication, or with `npm stage approve`.
The staged versions are posted as a comment on the PR.

### Publishing

Packages are published with [npm trusted publishing](https://docs.npmjs.com/trusted-publishers), so
no npm token is stored in CI. Production releases can only publish from `main`.

## Code of Conduct

This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected
to uphold it.
