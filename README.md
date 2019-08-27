[![npm @latest](https://img.shields.io/npm/v/gitlab.svg)](https://www.npmjs.com/package/gitlab)
[![npm downloads](https://img.shields.io/npm/dt/gitlab.svg)](https://www.npmjs.com/package/gitlab)
[![dependencies Status](https://david-dm.org/jdalrymple/node-gitlab/status.svg)](https://david-dm.org/jdalrymple/node-gitlab)
[![devDependencies Status](https://david-dm.org/jdalrymple/node-gitlab/dev-status.svg)](https://david-dm.org/jdalrymple/node-gitlab?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/jdalrymple/node-gitlab.svg)](https://greenkeeper.io/)
[![Code Climate](https://codeclimate.com/github/jdalrymple/node-gitlab/badges/gpa.svg)](https://codeclimate.com/github/jdalrymple/node-gitlab)
[![Build Status](https://img.shields.io/travis/jdalrymple/node-gitlab/master.svg)](https://travis-ci.org/jdalrymple/node-gitlab)
[![Coverage](https://img.shields.io/codecov/c/github/jdalrymple/node-gitlab/master.svg)](https://codecov.io/gh/jdalrymple/node-gitlab)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Code Style: Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)
[![Install Size](https://packagephobia.now.sh/badge?p=gitlab)](https://packagephobia.now.sh/result?p=gitlab)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/jdalrymple/node-gitlab/blob/master/LICENSE.md)

# node-gitlab

🤖 [GitLab](https://github.com/gitlabhq/gitlabhq) API NodeJS library with full support of all the [Gitlab API](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api) services.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Supported APIs](#supported-apis)
  - [Import](#import)
    - [Bundle Imports](#bundle-imports)
  - [Examples](#examples)
  - [Pagination](#pagination)
  - [Sudo](#sudo)
  - [Custom Request Libraries](#custom-request-libraries)
- [Docs](#docs)
- [Development](#development)
- [Testing](#testing)
- [Contributors](#contributors)
- [License](#licence)
- [Changelog](#changelog)

## Install

```bash
# Install from npm
npm install gitlab
```

## Usage

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
Licence
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
GroupVariables
Epics
EpicIssues
EpicNotes
EpicDiscussions

// Projects
Branches
Commits
CommitDiscussions
ContainerRegistry
DeployKeys
Deployments
Environments
Issues
IssueAwardEmojis
IssueNotes
IssueDiscussions
Jobs
Labels
MergeRequests
MergeRequestAwardEmojis
MergeRequestDiscussions
MergeRequestNotes
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
PushRules
Releases
ReleaseLinks
Repositories
RepositoryFiles
Runners
Services
Tags
Triggers

// Users
Users
UserEmails
UserImpersonationTokens
UserKeys
UserGPGKeys

```

### Import

URL to your GitLab instance should not include `/api/v4` path.

Instantiate the library using a basic token created in your [Gitlab Profile](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html)

```javascript
// ES6 (>=node 10.16.0 LTS)
import { Gitlab } from 'gitlab'; // All Resources
import { Projects } from 'gitlab'; // Just the Project Resource
//...etc

// ES5, assuming native or polyfilled Promise is available
const { Gitlab } = require('gitlab');
```

Basic Example

```javascript
const api = new Gitlab({
  token: 'personaltoken',
});
```

Available instatiating options:

| Name                 | Optional | Default                                               | Description                                                     |
| -------------------- | -------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| `host`               | Yes      | `https://gitlab.com`                                  | Gitlab Instance Host URL                                        |
| `token`              | No\*     | N/A                                                   | Personal Token. Required (one of the three tokens are required) |
| `oauthToken`         | No\*     | N/A                                                   | OAuth Token. Required (one of the three tokens are required)    |
| `jobToken`           | No\*     | N/A                                                   | CI Job Token. Required (one of the three tokens are required)   |
| `rejectUnauthorized` | Yes      | `false`                                               | Http Certificate setting                                        |
| `sudo`               | Yes      | `false`                                               | Sudo query parameter                                            |
| `version`            | Yes      | `v4`                                                  | API Version ID                                                  |
| `camelize`           | Yes      | `false`                                               | Response Key Camelize. Camelizes all response body keys         |
| `requester`          | Yes      | [KyRequester.ts](./src/infrastructure/KyRequester.ts) | Request Library Wrapper. Currently wraps Ky.                    |
| `requestTimeout`     | Yes      | `300000`                                              | Request Library Timeout in ms                                   |

#### Bundle Imports

It can be annoying to have to import all the API's pertaining to a specific resource. For example, the Projects resource is composed of many API's, Projects, Issues, Labels, MergeRequests, etc. For convenience, there is a Bundle export for importing and instantiating all these related API's at once.

```javascript
import { ProjectsBundle } from 'gitlab';

const services = new ProjectsBundle({
  host:   'http://example.com',
  token: 'abcdefghij123456'
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
Deployments
DeployKeys
Environments
Issues
IssueNotes
IssueDiscussions
IssueAwardEmojis
Jobs
Labels
MergeRequests
MergeRequestAwardEmojis
MergeRequestDiscussions
MergeRequestNotes
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
PushRules
Repositories
RepositoryFiles
Runners
Services
Tags
Todos
Triggers
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
GroupVariables
Epics
EpicIssues
EpicNotes
EpicDiscussions
```

#### Handling HTTPS certificates

If your Gitlab server is running via HTTPS, the proper way to pass in your certificates is via a `NODE_EXTRA_CA_CERTS` environment key, like this:

```js
"scripts": {
    "start": "NODE_EXTRA_CA_CERTS=./secrets/3ShapeCA.pem node bot.js"
},
```

> **NOTE**: _Using `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` will not work with the `gitlab` library. The `rejectUnauthorized` key is the only way to allow insecure certificates to be bypassed._

### Examples

Once you have your library instantiated, you can utilize many of the API's functionality:

Using the await/async method

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'abcdefghij123456',
});

// Listing users
let users = await api.Users.all();

// Or using Promise-Then notation
api.Projects.all().then(projects => {
  console.log(projects);
});
```

General rule about all the function parameters:

- If its a required parameter, it is a named argument in the functions
- If its an optional parameter, it is defined in a options object following the named arguments

ie.

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'abcdefghij123456',
});

api.Projects.create(projectId, {
  //options defined in the Gitlab API documentation
});
```

### Pagination

For any .all() function on a resource, it will return all the items from Gitlab. This can be troublesome if there are many items, as the request it self can take a while to be fulfilled. As such, a maxPages option can be passed to limit the scope of the all function.

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'abcdefghij123456',
});

let projects = await api.Projects.all({ maxPages: 2 });
```

You can also use this in conjunction to the perPage argument which would override the default of 30 per page set by Gitlab:

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'abcdefghij123456',
});

let projects = await api.Projects.all({ maxPages: 2, perPage: 40 });
```

Additionally, if you would like to get back the pagination information, to know how many total pages there are for example, pass the pagination option `showPagination` in addition to either the
`maxPages` or `page` properties.

```javascript
...
const { data, pagination } = await api.Projects.all({
  perPage:40,
  maxPages:2,
  showPagination: true
});
...
```

This will result in a response in this format:

```javascript
data: [
...
],
pagination: {
  total: 20,
  next: 4,
  current: 2,
  previous: 1,
  perPage: 3,
  totalPages: 3,
}
```

> Note: supplying any pagination restrictions is call intensive. Some resources will require many requests which can put a significant load on the Gitlab Server. The general best practice would be setting the page request option to only return the first page if all results are not required.

### Sudo

For private gitlab instances, administrators are able to impersonate users through the API. To do so, you have to set the 'Sudo' header on the services you want to impersonate the user for.

For example, if you want to disable notifications for a specific user:

```javascript
import { NotificationSettings } from 'gitlab';

const service = new NotificationSettings({
  host:   'http://example.com',
  token: 'abcdefghij123456'
  sudo: 8 // Can be the user ID or a username
});

await service.edit({
  level: NotificationSettings.LEVELS.DISABLED
})
```

### Custom Request Libraries

There is another constructor parameter that allows the user to specify their own custom request library
as long as it has a similar API to ky. To specify the library, simply set the `requester` property when
instatiating a service:

An example can be seen in the [KyRequester.ts](./src/infrastructure/KyRequester.ts) file

```javascript
import { Gitlab } from 'gitlab';
import YourCustomRequester from 'custom-requester';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'abcdefghij123456',
  requester: YourCustomRequester,
});
```

## Docs

Although there are the [official docs](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api) for the API, there are some extra goodies offered by this package! After the 3.0.0 release, the next large project will be putting together proper documentation for these goodies [#39]! Stay tuned!!

### Misc

#### Non JSON/Text Responses

For responses such as file data that may be returned from the API, the data is exposed as a buffer. For example when trying to write a file, this can be done like:

```
let bufferedData = await api.Jobs.downloadLatestArtifactFile(project.id, "test", "job_test);

fs.writeFileSync("test.zip", bufferedData);

```

## Development

To get this running locally rather than from your `node_modules` folder:

```bash
$ git clone https://github.com/jdalrymple/node-gitlab.git
$ cd node-gitlab
$ npm install
$ npm build
```

And then inside whatever project you are using `node-gitlab` in you change your references to use that repo. In your package.json of that upstream project change:

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

1. First run Gitlab in a docker container:

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
npm run test

# or, alternatively
npm run test-with-token # sets PERSONAL_ACCESS_TOKEN and GITLAB_URL from above, before running tests
```

You can also define them in front of the npm script

```
PERSONAL_ACCESS_TOKEN='abcdefg' GITLAB_URL='http://localhost:8080' npm run test
```

> Note it may take about 3 minutes to get the variables while Gitlab is starting up in the container

## Contributors

This started off as a fork from [node-gitlab](https://github.com/node-gitlab/node-gitlab) but I ended up rewriting much of the code. Here are the original work's [contributors](https://github.com/node-gitlab/node-gitlab#contributors).

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

## License

[MIT](https://github.com/jdalrymple/node-gitlab/blob/master/LICENSE.md)

## Changelog

[Here](https://github.com/jdalrymple/node-gitlab/blob/master/CHANGELOG.md)
