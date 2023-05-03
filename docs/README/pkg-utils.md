#include "docs/README/header.md"

<p align="center">
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="pipeline status" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/pipeline.svg?ignore_skipped=true" /></a>
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="coverage report" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/coverage.svg?job=test:unit:utils" /></a>
  <a href="https://codeclimate.com/github/jdalrymple/gitbeaker">
    <img src="https://codeclimate.com/github/jdalrymple/gitbeaker/badges/gpa.svg" alt="Code Climate maintainability">
  </a>
  <a href="https://img.shields.io/librariesio/release/npm/@gitbeaker/requester-utils">
    <img src="https://img.shields.io/librariesio/release/npm/@gitbeaker/requester-utils" alt="Dependency Status" />
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
  <a href="https://packagephobia.now.sh/result?p=@gitbeaker/requester-utils">
    <img src="https://packagephobia.now.sh/badge?p=@gitbeaker/requester-utils" alt="Install Size: Core">
  </a>
</p>

> Utility for creating custom wrappers around the [@gitbeaker/core](https://www.npmjs.com/package/@gitbeaker/core) [GitLab](https://gitlab.com/gitlab-org/gitlab/) SDK.

## Table of Contents

- [Usage](#usage)
- [Contributors](#contributors)
- [Changelog](./packages/requester-utils/CHANGELOG.md)

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>
Load <code>@gitbeaker/requester-utils</code> directly from <a href="https://cdn.skypack.dev">cdn.skypack.dev</a>

```html
<script type="module">
  import { RequesterUtils, BaseResource } from 'https://cdn.skypack.dev/@gitbeaker/requester-utils';
</script>
```

</td></tr>
<tr><th>
Deno
</th><td width=100%>
Load <code>@gitbeaker/requester-utils</code> directly from <a href="https://cdn.skypack.dev">cdn.skypack.dev</a>

```ts
import {
  RequesterUtils,
  BaseResource,
} from 'https://cdn.skypack.dev/@gitbeaker/requester-utils?dts';
```

</td></tr>
<tr><th>
Node 18+
</th><td>

Install with <code>npm install @gitbeaker/requester-utils</code>, or <code>yarn add @gitbeaker/requester-utils</code>

```js
import { RequesterUtils, BaseResource } from '@gitbeaker/requester-utils';
```

</td></tr>
</tbody>
</table>

## Contributors

#include "contributors.md"
