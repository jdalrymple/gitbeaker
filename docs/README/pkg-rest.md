#include "docs/README/header.md"

<p align="center">
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="pipeline status" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/pipeline.svg?ignore_skipped=true" /></a>
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="coverage report" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/coverage.svg?job=test:unit:rest" /></a>
  <a href="https://codeclimate.com/github/jdalrymple/gitbeaker">
    <img src="https://codeclimate.com/github/jdalrymple/gitbeaker/badges/gpa.svg" alt="Code Climate maintainability">
  </a>
  <a href="https://img.shields.io/librariesio/release/npm/@gitbeaker/rest">
    <img src="https://img.shields.io/librariesio/release/npm/@gitbeaker/rest" alt="Dependency Status" />
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
  <a href="https://packagephobia.now.sh/result?p=@gitbeaker/rest">
    <img src="https://packagephobia.now.sh/badge?p=@gitbeaker/rest" alt="Install Size: Rest">
  </a>
</p>

> A Typed [GitLab](https://gitlab.com/gitlab-org/gitlab/) SDK for Browsers, Node.js, and Deno.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [API Client](#api-client)
  - [Pagination](#pagination)
  - [Error Handling](#error-handling)
- [Examples](#examples)
- [Testing](./docs/TESTING.md)
- [FAQ](./docs/FAQ.md)
- [Contributors](#contributors)
- [Changelog](./packages/rest/CHANGELOG.md)

## Features

- **Complete** - All features of Gitlab's exposed APIs are covered up to version [16.0](https://docs.gitlab.com/15.11/ee/api/api_resources.html).
- **Universal** - Works in all modern browsers, [Node.js](https://nodejs.org/), and [Deno](https://deno.land/).
- **Tested** - All libraries have > 80% test coverage.
- **Typed** - All libraries have extensive TypeScript declarations.

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>
Load <code>@gitbeaker/rest</code> directly from <a href="https://cdn.skypack.dev">cdn.skypack.dev</a>

```html
<script type="module">
  import { Gitlab } from 'https://cdn.skypack.dev/@gitbeaker/rest';
</script>
```

</td></tr>
<tr><th>
Deno
</th><td width=100%>
Load <code>@gitbeaker/rest</code> directly from <a href="https://cdn.skypack.dev">cdn.skypack.dev</a>

```ts
import { Gitlab } from 'https://cdn.skypack.dev/@gitbeaker/rest?dts';
```

</td></tr>
<tr><th>
Node 18+
</th><td>

Install with <code>npm install @gitbeaker/rest</code>, or <code>yarn add @gitbeaker/rest</code>

```js
import { Gitlab } from '@gitbeaker/rest';
```

</td></tr>
</tbody>
</table>

## API Client

Instantiate the library using a basic token created in your [Gitlab Profile](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html)

```javascript
const api = new Gitlab({
  token: 'personaltoken',
});
```

Available instantiating options:

| Name                 | Optional | Default                                                                                                                                 | Description                                                                                                        |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `host`               | Yes      | `https://gitlab.com`                                                                                                                    | Gitlab Instance Host URL                                                                                           |
| `token`              | No\*     | N/A                                                                                                                                     | Personal Token. Required (one of the three tokens are required)                                                    |
| `oauthToken`         | No\*     | N/A                                                                                                                                     | OAuth Token. Required (one of the three tokens are required)                                                       |
| `jobToken`           | No\*     | N/A                                                                                                                                     | CI Job Token. Required (one of the three tokens are required)                                                      |
| `rejectUnauthorized` | Yes      | `true`                                                                                                                                  | Http Certificate setting, Only applies to non-browser releases and HTTPS hosts urls                                |
| `sudo`               | Yes      | `false`                                                                                                                                 | [Sudo](https://docs.gitlab.com/ee/api/#sudo) query parameter                                                       |
| `camelize`           | Yes      | `false`                                                                                                                                 | Camelizes all response body keys                                                                                   |
| `requesterFn`        | Yes      | @gitbeaker/rest & @gitbeaker/cli : fetch-based, The @gitbeaker/core package **does not** have a default and thus must be set explicitly | Request Library Wrapper                                                                                            |
| `requestTimeout`     | Yes      | `300000`                                                                                                                                | Request Library Timeout in ms                                                                                      |
| `profileToken`       | Yes      | N/A                                                                                                                                     | [Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html) |
| `profileMode`        | Yes      | `execution`                                                                                                                             | [Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html) |

> \*One of these options must be supplied.

### Pagination

Available pagination options:

| Name           | Keyset | Offset | Type                 | Default  | Description                                                     |
| -------------- | ------ | ------ | -------------------- | -------- | --------------------------------------------------------------- |
| `pagination`   | X      | X      | 'offset' or 'keyset' | 'offset' | Defines which pagination type should be used                    |
| `perPage`      | X      | X      | Number               | 20       | Amount of results per request                                   |
| `orderBy`      | X      |        | String               |          | What field the results should be ordered by                     |
| `sort`         | X      |        | 'asc' or 'desc'      | 'asc'    | The direction of sort for the results                           |
| `maxPages`     |        | X      | Number               | N/A      | Maximum amount of requests that should be made                  |
| `page`         |        | X      | Number               | N/A      | Specific page to be retrieved                                   |
| `showExpanded` |        | X      | Boolean              | false    | Returns with the pagination information in addition to the data |

#### Offset Pagination

For any .all() function on a resource, it will return **all** the items from Gitlab. This can be troublesome if there are many items, as the request itself can take a while to be fulfilled. As such, a maxPages option can be passed to limit the scope of the all function.

```javascript
import { Gitlab } from '@gitbeaker/rest';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

let projects = await api.Projects.all({ maxPages: 2 });
```

You can also use this in conjunction with the perPage argument which would override the default of 30 per page set by Gitlab:

```javascript
import { Gitlab } from '@gitbeaker/rest';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

let projects = await api.Projects.all({ maxPages: 2, perPage: 40 });
```

Additionally, if you would like to get back the pagination information, to know how many total pages there are for example, pass the option `showExpanded`. If there are multiple results the pagination property will be included as shown below:

```javascript
...
const { data, paginationInfo } = await api.Projects.all({
  perPage:40,
  maxPages:2,
  showExpanded: true
});
...
```

This will result in a response in this format:

```javascript
data: [
...
],
paginationInfo: {
  next: 4,
  current: 2,
  previous: 1,
  perPage: 3,
}
```

> Note: Supplying any pagination restrictions is call intensive. Some resources will require many requests which can put a significant load on the Gitlab Server. The general best practice would be setting the page request option to only return the first page if all results are not required.

#### Keyset Pagination

Similarly, support for [Keyset pagination](https://docs.gitlab.com/ee/api/#keyset-based-pagination) can be toggled on by passing a pagination parameter as a query option

```js
const { data } = await api.Projects.all({
  pagination: 'keyset',
  sort: 'asc',
  orderBy: 'created_by',
});
```

### Error Handling

Request errors are returned back within the a plain Error instance, using the cause to hold the original response and a text description of the error pulled from the response's error or message fields if JSON, or its plain text value:

```js
Error: Bad Request
<stack trace>
{
  [cause]: {
    description: <text description>,
    response: <original Response object>
  }
}
```

## Examples

Once you have your library instantiated, you can utilize many of the API's functionality:

Using the await/async method

```javascript
import { Gitlab } from '@gitbeaker/rest';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

// Listing users
let users = await api.Users.all();

// Or using Promise-Then notation
api.Projects.all().then((projects) => {
  console.log(projects);
});
```

A general rule about all the function parameters:

- If it's a required parameter, it is a named argument in the functions
- If it's an optional parameter, it is defined in a options object following the named arguments

ie.

```javascript
import { Projects } from '@gitbeaker/rest';

const projectsAPI = new Projects({
  host: 'http://example.com',
  token: 'personaltoken',
});

projectsAPI.create({
  //options defined in the Gitlab API documentation
});
```

## Contributors

#include "contributors.md"
