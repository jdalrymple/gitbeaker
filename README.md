<div align="center">
  <br>
  <img alt="gitbeaker" src=".github/ASSETS/header.svg">
</div>
<br>
<p align="center">
  <a href="https://gitlab.com/jdalrymple/gitbeaker/pipelines">
    <img src="https://img.shields.io/gitlab/pipeline/jdalrymple/gitbeaker/master" alt="Gitlab Pipeline Status">
  </a>
  <a href="https://codeclimate.com/github/jdalrymple/gitbeaker">
    <img src="https://codeclimate.com/github/jdalrymple/gitbeaker/badges/gpa.svg" alt="Code Climate maintainability">
  </a>
  <a href="https://codecov.io/gh/jdalrymple/gitbeaker">
    <img src="https://img.shields.io/codecov/c/github/jdalrymple/gitbeaker/master.svg" alt="CodeCov test coverage">
  </a>
  <a href="https://david-dm.org/jdalrymple/gitbeaker">
    <img src="https://david-dm.org/jdalrymple/gitbeaker/status.svg" alt="Dependency Status" />
  </a>
  <a href="https://david-dm.org/jdalrymple/gitbeaker?type=dev">
    <img src="https://david-dm.org/jdalrymple/gitbeaker/dev-status.svg.svg" alt="Dev Dependency Status" />
  </a>
  <img src="https://flat.badgen.net/dependabot/jdalrymple/gitbeaker?icon=dependabot" alt="Dependabot Badge" />
  <a href="https://github.com/intuit/auto">
    <img src="https://img.shields.io/badge/release-auto.svg?colorA=888888&colorB=9B065A&label=auto" alt="Auto">
  </a>
  <a href="#contributors-">
    <img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=round" alt="All Contributors" />
  </a>
  <img src="https://img.shields.io/badge/code%20style-prettier-ff69b4.svg" alt="Prettier">
  <a href="LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="Licence: MIT">
  </a>

  <p align="center">
    <a href="https://packagephobia.now.sh/result?p=@gitbeaker/core">
      Core: <img src="https://packagephobia.now.sh/badge?p=@gitbeaker/core" alt="Install Size: Core">
    </a>
  </p>
  <p align="center">
    <a href="https://packagephobia.now.sh/result?p=@gitbeaker/node">
      Node: <img src="https://packagephobia.now.sh/badge?p=@gitbeaker/node" alt="Install Size: Node">
    </a>
  </p>
  <p align="center">
    <a href="https://packagephobia.now.sh/result?p=@gitbeaker/browser">
      Browser <img src="https://packagephobia.now.sh/badge?p=@gitbeaker/browser" alt="Install Size: Browser">
    </a>
  </p>
  <p align="center">
    <a href="https://packagephobia.now.sh/result?p=@gitbeaker/cli">
      CLI <img src="https://packagephobia.now.sh/badge?p=@gitbeaker/cli" alt="Install Size: CLI">
    </a>
  </p>
</p>

🤖 [GitLab](https://gitlab.com/gitlab-org/gitlab/) API NodeJS library with full support of all the [Gitlab API](https://gitlab.com/gitlab-org/gitlab/tree/master/doc/api) services.

## Table of Contents

- [Install](#install)
- [Getting Started](#getting-started)
  - [CLI Support](#cli-support)
  - [Browser Support](#browser-support)
- [Docs](#docs)
  - [Supported APIs](#supported-apis)
  - [Bundle Imports](#bundle-imports)
  - [Examples](#examples)
  - [Pagination](#pagination)
  - [Sudo](#sudo)
  - [Custom Request Libraries](#custom-request-libraries)
  - [Misc](#misc)
- [Development](#development)
- [Testing](#testing)
- [Contributors](#contributors)
- [License](#licence)
- [Changelog](#changelog)

## Install

```bash
# Install from npm
npm install @gitbeaker/node # NodeJS default, index.es.js for esm

npm install @gitbeaker/browser # UMD default

npm install @gitbeaker/cli  # CLI

```

## Getting Started

**NodeJS**

```javascript
// ES6 (>=node 10.16.0 LTS)
import { Gitlab } from '@gitbeaker/node'; // All Resources
import { Projects } from '@gitbeaker/node'; // Just the Project Resource
//...etc

// ES5, assuming native or polyfilled Promise is available
const { Gitlab } = require('@gitbeaker/node');
```

**Browser**

```javascript
// ES6 (>=node 10.16.0 LTS)
import { Gitlab } from '@gitbeaker/browser'; // All Resources
import { Projects } from '@gitbeaker/browser'; // Just the Project Resource
//...etc

// ES5, assuming native or polyfilled Promise is available
const { Gitlab } = require('@gitbeaker/browser');
```

OR through the script tag:

```html
<script src="node_modules/@gitbeaker/browser/dist/index.js" />
<script>
  const { Gitlab } = gitbeaker;
</script>
```

Instantiate the library using a basic token created in your [Gitlab Profile](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html)

```javascript
const api = new Gitlab({
  token: 'personaltoken',
});
```

Available instantiating options:

| Name                 | Optional | Default                                                                                                                                                             | Description                                                                                                        |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `host`               | Yes      | `https://gitlab.com`                                                                                                                                                | Gitlab Instance Host URL                                                                                           |
| `token`              | No\*     | N/A                                                                                                                                                                 | Personal Token. Required (one of the three tokens are required)                                                    |
| `oauthToken`         | No\*     | N/A                                                                                                                                                                 | OAuth Token. Required (one of the three tokens are required)                                                       |
| `jobToken`           | No\*     | N/A                                                                                                                                                                 | CI Job Token. Required (one of the three tokens are required)                                                      |
| `rejectUnauthorized` | Yes      | `true`                                                                                                                                                              | Http Certificate setting, Only applies to HTTPS hosts urls                                                         |
| `sudo`               | Yes      | `false`                                                                                                                                                             | [Sudo](https://docs.gitlab.com/ee/api/#sudo) query parameter                                                       |
| `version`            | Yes      | `4`                                                                                                                                                                 | API Version ID                                                                                                     |
| `camelize`           | Yes      | `false`                                                                                                                                                             | Camelizes all response body keys                                                                                   |
| `requester`          | Yes\*    | @gitbeaker/node & @gitbeaker/cli : Got-based, @gitbeaker/browser: Ky-based. The @gitbeaker/core package **does not** have a default and thus must be set explicitly | Request Library Wrapper                                                                                            |  |
| `requestTimeout`     | Yes      | `300000`                                                                                                                                                            | Request Library Timeout in ms                                                                                      |
| `profileToken`       | Yes      | N/A                                                                                                                                                                 | [Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html) |
| `profileMode`        | Yes      | `execution`                                                                                                                                                         | [Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html) |

### CLI Support

The CLI export functions in a similar manner, following the pattern:

```bash
gitbeaker [service name] [method name] --config_args pos_arg1 pos_arg2 --opts_arg1
```

Where:

- `service name` is any of the supported API names
- `method name` is any of the supported commands on that API service (See source for exceptions, but generally all, show, remove, update)
- `--config_args` is any of general configuration arguments such as your personal token. These are outlined in the table above or by looking at the cli help menu
  `pos_arg1 pos_arg2..etc` is any of the arguments you would normally supply to the function. The names of the args should match the names in the method headers. These positional arguments can also be written as flag arguments, `--pos_arg1 --pos_arg2..etc` **BUT** must be written in the correct order.
- `--opts_arg1...etc` is any of the optional arguments that you would normally supply to the function. Their names should match what the GitLab API docs request.

There is one small exception with the instantiating arguments, however, which must be supplied using a `gb` or `gl` prefix. ie.

```bash
# To get all the projects
gitbeaker projects all --gb-token="personaltoken"

# To get a project with id = 2
gitbeaker projects show --gl-token="personaltoken" 2
```

To reduce the annoyance of having to pass those configuration properties each time, it is also possible to pass the token and host information through environment variables in the form of `GITLAB_[option name]` or `GITBEAKER_[option name]` ie:

```bash
GITLAB_HOST=http://example.com
GITLAB_TOKEN=personaltoken
GITBEAKER_CAMELIZE=true
```

This could be set globally or using a [.env](https://github.com/motdotla/dotenv#readme) file in the project folder.

## Docs

Although there are the [official docs](https://gitlab.com/gitlab-org/gitlab/tree/master/doc/api) for the API, there are some extra goodies offered by this package! After the 3.0.0 release, the next large project will be putting together proper documentation for these goodies [#39]! Stay tuned!!

### Supported APIs

The API's that are currently supported are:

```
// General
ApplicationSettings
BroadcastMessages
Events
FeatureFlags
GeoNodes
GitignoreTemplates
GitLabCIYMLTemplates
Keys
License
LicenceTemplates
Lint
Markdown
Namespaces
NotificationSettings
PagesDomains
Search
SidekiqMetrics
Snippets
SystemHooks
Version
Wikis

// Groups
Groups
GroupAccessRequests
GroupBadges
GroupCustomAttributes
GroupIssueBoards
GroupMembers
GroupMilestones
GroupProjects
GroupRunners
GroupVariables
GroupLabels
GroupDeployTokens
Epics
EpicIssues
EpicNotes
EpicDiscussions

// Projects
Branches
Commits
CommitDiscussions
ContainerRegistry
Deployments
DeployKeys
Environments
FreezePeriods
Issues
IssuesStatistics
IssueNotes
IssueDiscussions
IssueAwardEmojis
Jobs
Labels
MergeRequests
MergeRequestApprovals
MergeRequestAwardEmojis
MergeRequestDiscussions
MergeRequestNotes
Packages
Pipelines
PipelineSchedules
PipelineScheduleVariables
Projects
ProjectAccessRequests
ProjectBadges
ProjectCustomAttributes
ProjectImportExport
ProjectIssueBoards
ProjectHooks
ProjectMembers
ProjectMilestones
ProjectSnippets
ProjectSnippetNotes
ProjectSnippetDiscussions
ProjectSnippetAwardEmojis
ProtectedBranches
ProtectedTags
ProjectVariables
ProjectDeployTokens
PushRules
Releases
ReleaseLinks
Repositories
RepositoryFiles
Runners
Services
Tags
Todos
Triggers
VulnerabilityFindings

// Users
Users
UserEmails
UserImpersonationTokens
UserKeys
UserGPGKeys

```

### Bundle Imports

It can be annoying to have to import all the API's pertaining to a specific resource. For example, the Projects resource is composed of many API's, Projects, Issues, Labels, MergeRequests, etc. For convenience, there is a Bundle export for importing and instantiating all these related API's at once.

```javascript
import { ProjectsBundle } from 'gitlab';

const services = new ProjectsBundle({
  host:   'http://example.com',
  token: 'personaltoken'
})

services.Projects.all()
services.MergeRequests.all()
etc..

```

Currently there are three Bundles:

1. ProjectsBundle which includes:

```
Branches
Commits
CommitDiscussions
ContainerRegistry
Deployments
DeployKeys
Environments
FreezePeriods
Issues
IssuesStatistics
IssueNotes
IssueDiscussions
IssueAwardEmojis
Jobs
Labels
MergeRequests
MergeRequestApprovals
MergeRequestAwardEmojis
MergeRequestDiscussions
MergeRequestNotes
Packages
Pipelines
PipelineSchedules
PipelineScheduleVariables
Projects
ProjectAccessRequests
ProjectBadges
ProjectCustomAttributes
ProjectImportExport
ProjectIssueBoards
ProjectHooks
ProjectMembers
ProjectMilestones
ProjectSnippets
ProjectSnippetNotes
ProjectSnippetDiscussions
ProjectSnippetAwardEmojis
ProtectedBranches
ProtectedTags
ProjectVariables
ProjectDeployTokens
PushRules
Releases
ReleaseLinks
Repositories
RepositoryFiles
Runners
Services
Tags
Todos
Triggers
VulnerabilityFindings
```

2. UsersBundle which includes:

```
Users,
UserCustomAttributes,
UserEmails,
UserImpersonationTokens,
UserKeys,
UserGPGKeys
```

3. GroupsBundle which includes:

```
Groups
GroupAccessRequests
GroupBadges
GroupCustomAttributes
GroupIssueBoards
GroupMembers
GroupMilestones
GroupProjects
GroupRunners
GroupVariables
GroupLabels
GroupDeployTokens
Epics
EpicIssues
EpicNotes
EpicDiscussions
```

### Examples

Once you have your library instantiated, you can utilize many of the API's functionality:

Using the await/async method

```javascript
import { Gitlab } from 'gitlab';

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
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

api.Projects.create({
  //options defined in the Gitlab API documentation
});
```

### Pagination

Available pagination options:

| Name           | Keyset | Offset | Type                 | Default  | Description                                                     |
| -------------- | ------ | ------ | -------------------- | -------- | --------------------------------------------------------------- |
| `pagination`   | X      | X      | 'offset' or 'keyset' | 'offset' | Defines which pagination type should be used                    |
| `perPage`      | X      | X      | Number               | 20       | Amount of results per request                                   |
| `maxPages`     | X      | X      | Number               | N/A      | Maximum amount of requests that should be made                  |
| `page`         |        | X      | Number               | N/A      | Specific page to be retrieved                                   |
| `showExpanded` |        | X      | Boolean              | false    | Returns with the pagination information in addition to the data |

#### Offset Pagination

For any .all() function on a resource, it will return all the items from Gitlab. This can be troublesome if there are many items, as the request itself can take a while to be fulfilled. As such, a maxPages option can be passed to limit the scope of the all function.

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

let projects = await api.Projects.all({ maxPages: 2 });
```

You can also use this in conjunction with the perPage argument which would override the default of 30 per page set by Gitlab:

```javascript
import { Gitlab } from 'gitlab';

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
  total: 20,
  next: 4,
  current: 2,
  previous: 1,
  perPage: 3,
  totalPages: 3,
}
```

> Note: Supplying any pagination restrictions is call intensive. Some resources will require many requests which can put a significant load on the Gitlab Server. The general best practice would be setting the page request option to only return the first page if all results are not required.

#### Keyset Pagination

Similarly, support for [Keyset pagination](https://docs.gitlab.com/ee/api/#keyset-based-pagination) can be toggled on by passing a pagination parameter as a query option

```js
const { data } = await api.Projects.all({
  pagination: 'keyset',
});
```

Note that for keyset pagination, `page`, and `showExpanded` are **not supported**.

### Sudo

For private gitlab instances, administrators can impersonate users through the API. To do so, you have to set the 'Sudo' header on the services you want to impersonate the user for.

For example, if you want to disable notifications for a specific user:

```javascript
import { NotificationSettings } from 'gitlab';

const service = new NotificationSettings({
  host:   'http://example.com',
  token: 'personaltoken'
  sudo: 8 // Can be the user ID or a username
});

await service.edit({
  level: NotificationSettings.LEVELS.DISABLED
})
```

### Custom Request Libraries

There is another constructor parameter that allows the user to specify their custom request library
as long as it has a similar API to ky. To specify the library, simply set the `requester` property when
instatiating a service:

An example can be seen in the [KyRequester.ts](./src/infrastructure/KyRequester.ts) file

```javascript
import { Gitlab } from 'gitlab';
import YourCustomRequester from 'custom-requester';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
  requester: YourCustomRequester,
});
```

### Misc

#### Handling HTTPS certificates

If your Gitlab server is running via HTTPS, the proper way to pass in your certificates is via a `NODE_EXTRA_CA_CERTS` environment key, like this:

```js
"scripts": {
    "start": "NODE_EXTRA_CA_CERTS=./secrets/3ShapeCA.pem node bot.js"
},
```

> **NOTE**: _Using `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` will not work with the `gitlab` library. The `rejectUnauthorized` key is the only way to allow insecure certificates to be bypassed._

#### Non JSON/Text Responses

For responses such as file data that may be returned from the API, the data is exposed as a buffer. For example, when trying to write a file, this can be done like:

```javascript
let bufferedData = await api.Jobs.downloadLatestArtifactFile(project.id, 'test', 'job_test');

fs.writeFileSync('test.zip', bufferedData);
```

## Development

To get this running locally rather than from your `node_modules` folder:

```bash
$ git clone https://github.com/jdalrymple/gitbeaker.git
$ cd gitbeaker
$ yarn install
$ yarn build
```

And then inside whatever project you are using `gitbeaker` in you change your references to use that repo. In your package.json of that upstream project change:

```json
"dependencies": {
  "gitlab": "5.0.0"
}
```

to this

```json
"dependencies": {
  "gitlab": "<path-to-your-clone>"
}
```

## Testing

Testing is a work-in-progress right now but here is the start.

1. First, run Gitlab in a docker container:

```bash
docker-compose -f docker-compose.test.yml up
```

1. Once GitLab is up on localhost:8080, get the two environment variables from the docker image could
   either export them into environment variables locally:

```bash
export PERSONAL_ACCESS_TOKEN=$(docker exec -it gitlab bash -lc 'printf "%q" "${PERSONAL_ACCESS_TOKEN}"')
export GITLAB_URL=$(docker exec -it gitlab bash -lc 'printf "%q" "${GITLAB_URL}"')
```

1. Now run the tests

```bash
yarn test

# or, alternatively
yarn test-with-token # sets PERSONAL_ACCESS_TOKEN and GITLAB_URL from above, before running tests
```

You can also define them in front of the yarn script

```
PERSONAL_ACCESS_TOKEN='abcdefg' GITLAB_URL='http://localhost:8080' yarn test
```

> Note it may take about 3 minutes to get the variables while Gitlab is starting up in the container

## Contributors

This started as a fork from [node-gitlab-legacy](https://github.com/node-gitlab/node-gitlab-legacy) but I ended up rewriting much of the code. Here are the original work's [contributors](https://github.com/node-gitlab/node-gitlab-legacy#contributors).

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jdalrymple"><img src="https://avatars3.githubusercontent.com/u/3743662?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Justin Dalrymple</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=jdalrymple" title="Code">💻</a> <a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Ajdalrymple" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-jdalrymple" title="Maintenance">🚧</a> <a href="https://github.com/jdalrymple/gitbeaker/issues?q=author%3Ajdalrymple" title="Bug reports">🐛</a> <a href="#ideas-jdalrymple" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=jdalrymple" title="Documentation">📖</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=jdalrymple" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/akira345"><img src="https://avatars0.githubusercontent.com/u/655764?v=4?s=50" width="50px;" alt=""/><br /><sub><b>akira345</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=akira345" title="Documentation">📖</a> <a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Aakira345" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=akira345" title="Code">💻</a></td>
    <td align="center"><a href="https://birukov.me"><img src="https://avatars2.githubusercontent.com/u/1861546?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Pavel Birukov </b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Apablobirukov" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=pablobirukov" title="Code">💻</a></td>
    <td align="center"><a href="http://jetersen.dev"><img src="https://avatars2.githubusercontent.com/u/1661688?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Joseph Petersen</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Ajetersen" title="Reviewed Pull Requests">👀</a> <a href="#ideas-jetersen" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/jdalrymple/gitbeaker/issues?q=author%3Ajetersen" title="Bug reports">🐛</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=jetersen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Musinux"><img src="https://avatars3.githubusercontent.com/u/563373?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Louis Cherel</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3AMusinux" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=Musinux" title="Code">💻</a></td>
    <td align="center"><a href="http://www.arsdehnel.net"><img src="https://avatars3.githubusercontent.com/u/1697162?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Adam Dehnel</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Aarsdehnel" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-arsdehnel" title="Maintenance">🚧</a> <a href="https://github.com/jdalrymple/gitbeaker/issues?q=author%3Aarsdehnel" title="Bug reports">🐛</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=arsdehnel" title="Code">💻</a></td>
    <td align="center"><a href="http://www.haus.gg/"><img src="https://avatars3.githubusercontent.com/u/226640?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Ev Haus</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3AEvHaus" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=EvHaus" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://iGLOO.be"><img src="https://avatars0.githubusercontent.com/u/900947?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Loïc Mahieu</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3ALoicMahieu" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.giuseppeangri.com"><img src="https://avatars2.githubusercontent.com/u/9075163?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Giuseppe Angri</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Agiuseppeangri" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=giuseppeangri" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jennparise"><img src="https://avatars1.githubusercontent.com/u/4134086?v=4?s=50" width="50px;" alt=""/><br /><sub><b>jennparise</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Ajennparise" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jdalrymple/gitbeaker/issues?q=author%3Ajennparise" title="Bug reports">🐛</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=jennparise" title="Code">💻</a></td>
    <td align="center"><a href="http://obartra.github.io"><img src="https://avatars0.githubusercontent.com/u/3877773?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Oscar</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Aobartra" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://daniel-ruf.de"><img src="https://avatars1.githubusercontent.com/u/827205?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Daniel Ruf</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3ADanielRuf" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=DanielRuf" title="Documentation">📖</a> <a href="https://github.com/jdalrymple/gitbeaker/issues?q=author%3ADanielRuf" title="Bug reports">🐛</a> <a href="#maintenance-DanielRuf" title="Maintenance">🚧</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=DanielRuf" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/schindld"><img src="https://avatars0.githubusercontent.com/u/1659632?v=4?s=50" width="50px;" alt=""/><br /><sub><b>schindld</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/pulls?q=is%3Apr+reviewed-by%3Aschindld" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=schindld" title="Code">💻</a></td>
    <td align="center"><a href="https://alvarobg.com"><img src="https://avatars0.githubusercontent.com/u/12004383?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Alvaro</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=AlvaroBernalG" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://northhorizon.net"><img src="https://avatars3.githubusercontent.com/u/616152?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Daniel Moore</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=danielmoore" title="Code">💻</a></td>
    <td align="center"><a href="https://dylanmtaylor.com"><img src="https://avatars2.githubusercontent.com/u/277927?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Dylan M. Taylor</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=dylanmtaylor" title="Documentation">📖</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=dylanmtaylor" title="Code">💻</a></td>
    <td align="center"><a href="https://pixelswap.fr/"><img src="https://avatars1.githubusercontent.com/u/4266283?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Corentin Mors</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=Mikescops" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/xatavian"><img src="https://avatars1.githubusercontent.com/u/17217965?v=4?s=50" width="50px;" alt=""/><br /><sub><b>xatavian</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=xatavian" title="Code">💻</a></td>
    <td align="center"><a href="https://stackoverflow.com/story/yepninja"><img src="https://avatars3.githubusercontent.com/u/11796206?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Yevgeny Petukhov</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=yepninja" title="Code">💻</a></td>
    <td align="center"><a href="https://about.me/mickaeltr"><img src="https://avatars2.githubusercontent.com/u/378910?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Mickaël Tricot</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=mickaeltr" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/andreasciamanna"><img src="https://avatars0.githubusercontent.com/u/181780?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Andrea</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=andreasciamanna" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.ircad.fr/"><img src="https://avatars0.githubusercontent.com/u/8638653?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Flavien Bridault</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=fbridault" title="Tests">⚠️</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=fbridault" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/s-kazuki"><img src="https://avatars2.githubusercontent.com/u/9253374?v=4?s=50" width="50px;" alt=""/><br /><sub><b>s-kazuki</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=s-kazuki" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kiprasmel"><img src="https://avatars3.githubusercontent.com/u/29430509?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Kipras Melnikovas</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=kiprasmel" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Gkxie"><img src="https://avatars0.githubusercontent.com/u/27680715?v=4?s=50" width="50px;" alt=""/><br /><sub><b>xieyu</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=Gkxie" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/st1gok"><img src="https://avatars1.githubusercontent.com/u/13641693?v=4?s=50" width="50px;" alt=""/><br /><sub><b>st1gok</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=st1gok" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/max-wittig"><img src="https://avatars3.githubusercontent.com/u/6639323?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Max Wittig</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=max-wittig" title="Documentation">📖</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=max-wittig" title="Tests">⚠️</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=max-wittig" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nlochschmidt"><img src="https://avatars3.githubusercontent.com/u/759624?v=4?s=50" width="50px;" alt=""/><br /><sub><b>Niklas Lochschmidt</b></sub></a><br /><a href="https://github.com/jdalrymple/gitbeaker/commits?author=nlochschmidt" title="Documentation">📖</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=nlochschmidt" title="Tests">⚠️</a> <a href="https://github.com/jdalrymple/gitbeaker/commits?author=nlochschmidt" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

- [Dylan DesRosier](https://github.com/ddesrosier)
- [Mike Wyatt](https://github.com/mikew)
- [Cory Zibeill](https://github.com/coryzibell)
- [Martin Bour](https://github.com/shadygrove)
- [Christoph Lehmann](https://github.com/christophlehmann)
- [Frank V](https://github.com/FrankV01)
- [Salim Benabbou](https://github.com/Salimlou)
- [Tamás Török-Vistai](https://github.com/tvtamas)
- [Martin Benninger](https://github.com/MartinBenninger)
- [Adam Dehnel](https://github.com/arsdehnel)
- [fewieden](https://github.com/fewieden)
- [Jeff Pelton](https://github.com/comster)
- [Claude Abounegm](https://github.com/claude-abounegm)
- [Stefan Hall](https://github.com/Marethyu1)
- [Jordan Wallet](https://github.com/Mr-Wallet)
- [Ev Haus](https://github.com/EvHaus)
- [zhao0](https://github.com/zhao0)
- [Joshua Grosso](https://github.com/jgrosso)
- [Frédéric Boutin](https://github.com/fboutin-pmc)
- [Isaac Ouellet Therrien](https://github.com/yonguelink)
- [Pavel Birukov](https://github.com/pablobirukov)
- [Sharma-Rajat](https://github.com/Sharma-Rajat)
- [Joseph Petersen](https://github.com/casz)
- [Igor Katsuba](https://github.com/IKatsuba)
- [Giuseppe Angri](https://github.com/giuseppeangri)
- [Michael Townsend](https://github.com/Continuities)
- [bodtx](https://github.com/bodtx)
- [Artem](https://github.com/arthot)
- [Munif Tanjim](https://github.com/MunifTanjim)
- [Max Wittig](https://github.com/max-wittig)
- [Quentin Dreyer](https://github.com/qkdreyer)
- [Norm MacLennan](https://github.com/maclennann)
- [jnovick](https://github.com/jnovick)
- [Fabian Aussems](https://github.com/mozinator)
- [jennparise](https://github.com/jennparise)
- [Michael Matzka](https://github.com/mimaidms)
- [CraigAllardyce](https://github.com/CraigAllardyce)
- [Bruno Guimarães](https://github.com/brunobastosg)
- [Louis Cherel](https://github.com/Musinux)
- [Lukas Eipert](https://github.com/leipert)
- [Maximilian Krauß](https://github.com/maximilian-krauss)
- [Evolution Gaming](https://github.com/evolution-gaming)
- [WEBER Logan](https://github.com/Neonox31)
- [Anton Zhukov](https://github.com/MrCheater)
- [Nic Loomans](https://github.com/beaverusiv)
- [Jennifer Everhart]()
- [Carl Kittelberger](https://github.com/icedream)
- [Patrik Votoček](https://github.com/Vrtak-CZ)
- [Kyrylo Fedorov](https://github.com/Kyr)
- [Claudio Vellage](https://github.com/jdalrymple/LRH539)
- [Seb0uil](https://github.com/seb0uil)
- [Dylan Taylor](https://github.com/dylanmtaylor)

## License

[MIT](https://github.com/jdalrymple/gitbeaker/blob/master/LICENSE.md)

## Changelog

[Here](https://github.com/jdalrymple/gitbeaker/blob/master/CHANGELOG.md)
