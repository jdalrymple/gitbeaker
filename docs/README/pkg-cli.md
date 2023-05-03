#include "docs/README/header.md"

<p align="center">
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="pipeline status" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/pipeline.svg?ignore_skipped=true" /></a>
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="coverage report" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/coverage.svg?job=test:unit:cli" /></a>
  <a href="https://codeclimate.com/github/jdalrymple/gitbeaker">
    <img src="https://codeclimate.com/github/jdalrymple/gitbeaker/badges/gpa.svg" alt="Code Climate maintainability">
  </a>
  <a href="https://img.shields.io/librariesio/release/npm/@gitbeaker/cli">
    <img src="https://img.shields.io/librariesio/release/npm/@gitbeaker/cli" alt="Dependency Status" />
  </a>
  <a href="https://github.com/intuit/auto">
    <img src="https://img.shields.io/badge/release-auto.svg?colorA=888888&colorB=9B065A&label=auto" alt="Auto">
  </a>
  <a href="#contributors-">
    <img src="https://img.shields.io/badge/all_contributors-orange.svg?style=round" alt="All Contributors" />
  </a>
  <img src="https://img.shields.io/badge/code%20style-prettier-ff69b4.svg" alt="Prettier">
  <a href="LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="Licence: MIT">
  </a>
  <a href="https://packagephobia.now.sh/result?p=@gitbeaker/cli">
    <img src="https://packagephobia.now.sh/badge?p=@gitbeaker/cli" alt="Install Size: CLI">
  </a>
</p>

> A CLI Wrapper for the [@gitbeaker/rest](https://www.npmjs.com/package/@gitbeaker/rest) SDK.

## Table of Contents

- [Usage](#usage)
- [Contributors](#contributors)
- [Changelog](./packages/cli/CHANGELOG.md)

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Node 18+
</th><td>

Install with <code>npm install -g @gitbeaker/cli</code>, or <code>yarn add -g @gitbeaker/cli</code>

```bash
gitbeaker [service name] [method name] --config_args pos_arg1 pos_argN --opts_arg1 --opts_argN

# A shorthand can also be used:
gb [service name] [method name] --config_args pos_arg1 pos_argN --opts_arg1 --opts_argN
```

Where:

- `service name` is any of the supported API names of the [@gitbeaker/rest](https://github.com/jdalrymple/gitbeaker/blob/main/packages/rest/README.md) sdk
- `method name` is any of the supported commands on that API service (See source for exceptions, but generally all, show, remove, update)
- `--config_args` is any of general configuration arguments such as your personal token. These are outlined in this [table](https://github.com/jdalrymple/gitbeaker/blob/main/README.md?#api-client) and can also be found by looking at the cli help menu. These arguments must also include a `gb` or `gl` prefix. ie.

```bash
# To get all the projects
gitbeaker projects all --gb-token="personaltoken"
```

- `pos_arg1 ... pos_argN` are any of the arguments you would normally supply to the function. The names of the args should match the names in the method headers. These positional arguments can also be written as flag arguments: `--pos_arg1 ... --pos_argN`, **BUT** must be written in the correct order.
- `--opts_arg1 ...--opts_argN` are any of the optional arguments that you would normally supply to the function. Their names should match what the GitLab API docs request.

```bash
# To get all the projects id=2 and optional parameter "search" = "cool"
gitbeaker projects all --gb-token="personaltoken" 2 --search="cool"
```

To reduce the annoyance of having to pass those configuration properties each time, it is also possible to pass the token and host information through environment variables in the form of `GITLAB_[option name]` or `GITBEAKER_[option name]` ie:

```bash
GITLAB_HOST=http://example.com
GITLAB_TOKEN=personaltoken
GITBEAKER_CAMELIZE=true
```

This could be set globally or using a [.env](https://github.com/motdotla/dotenv#readme) file in the project folder.

</td></tr>
</tbody>
</table>

## Contributors

#include "contributors.md"
