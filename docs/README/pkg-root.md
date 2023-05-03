#include "docs/README/header.md"

<p align="center">
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="pipeline status" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/pipeline.svg?ignore_skipped=true" /></a>
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="coverage report" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/coverage.svg" /></a>
  <a href="https://codeclimate.com/github/jdalrymple/gitbeaker">
    <img src="https://codeclimate.com/github/jdalrymple/gitbeaker/badges/gpa.svg" alt="Code Climate maintainability">
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
</p>


>A typed [GitLab](https://gitlab.com/gitlab-org/gitlab/) SDK for Browser, Node.js, Deno and CLI usage.

## Table of Contents
- [Features](#features)
- [Packages](#packages)
- [FAQ](./docs/FAQ.md)
- [Contributors](#contributors)
- [Changelog](./CHANGELOG.md)

## Features
- **Complete** - All features of Gitlab's exposed APIs are covered up to version [16.0](https://docs.gitlab.com/15.11/ee/api/api_resources.html).
- **Universal** - Works in all modern browsers, [Node.js](https://nodejs.org/), and [Deno](https://deno.land/) and supports [CLI](https://www.npmjs.com/package/@gitbeaker/cli) usage.
- **Tested** - All libraries have > 80% test coverage.
- **Typed** - All libraries have extensive TypeScript declarations.

## Packages
- :wrench: [**@gitbeaker/requester-utils**](https://www.npmjs.com/package/@gitbeaker/requester-utils) - Utilities for the underlying HTTP request functionality.
- :scroll: [**@gitbeaker/core**](https://www.npmjs.com/package/@gitbeaker/core) - The core API detailing all the Gitlab resource support.
- :computer: [**@gitbeaker/rest**](https://www.npmjs.com/package/@gitbeaker/rest) - The Node.js, Deno and Modern Browser wrapper around the gitbeaker core API, using native fetch.
- :pager: [**@gitbeaker/cli**](https://www.npmjs.com/package/@gitbeaker/cli) - The CLI Wrapper around the @gitbeaker/rest distribution.

## Contributors

#include "contributors.md"
