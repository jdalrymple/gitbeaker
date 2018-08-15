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
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/jdalrymple/node-gitlab/blob/master/LICENSE.md)

# node-gitlab

 🤖 [GitLab](https://github.com/gitlabhq/gitlabhq) API NodeJS library with full support of all the [Gitlab API](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api) services.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
    - [Supported APIs](#supported-apis)
    - [Import](#import)
        - [Specific Imports](#specific-imports)
        - [Bundle Imports](#bundle-imports)
    - [Examples](#examples)
    - [Pagination](#pagination)
- [Migrating from node-gitlab](#migrating-from-node-gitlabnode-gitlab)
- [Docs](#docs)
- [Development](#development)
- [Testing](#testing)
- [CLI](#cli)
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
Namespaces
NotificationSettings
PagesDomains
Search
SidekiqMetrics
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
ProjectVariables
Repositories
RepositoryFiles
Runners
Services
Tags
Todos
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
// ES6 (>=node 8.0.0)
import Gitlab from 'gitlab';

// ES5, assuming native or polyfilled Promise is available
const Gitlab = require('gitlab/dist/es5').default


// Instantiating
const api = new Gitlab({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456'	// Can be created in your profile.
})

// Or, use a OAuth token instead!

const api = new Gitlab({
  url:   'http://example.com', // Defaults to http://gitlab.com
  oauthToken: 'abcdefghij123456'
})

```

#### Specific Imports

Sometimes you don't want to import and instantiate the whole Gitlab API, perhaps you only want access to the Projects API. To do this, one only needs to import and instantiate this specific API:

```javascript
import { Projects } from 'gitlab';

const service = new Projects({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456' // Can be created in your profile.
})

```

#### Bundle Imports

It can be annoying to have to import all the API's pertaining to a specific resource. For example, the Projects resource is composed of many API's, Projects, Issues, Labels, MergeRequests, etc. For convenience, there is a Bundle export for importing and instantiating all these related API's at once.


```javascript
import { ProjectsBundle } from 'gitlab';

const services = new ProjectsBundle({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456' // Can be created in your profile.
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
ProjectVariables
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

### Using XMLHttpRequest
This package uses the [Request](https://github.com/request/request) library by default, which is built into Node. However, if your code is running in a browser, you can get better built-in resolution of proxies and self-signed certificates by using the browser's XMLHttpRequest implementation instead:

```javascript
import Gitlab from 'gitlab';

const api = new Gitlab({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456',	// Can be created in your profile.

  useXMLHttpRequest: true // Use the browser's XMLHttpRequest instead of Node's Request library
})
```

**WARNING:** Currently this option does not support the `multipart/form-data` content type, and therefore the endpoint for [uploading a file to a project](https://docs.gitlab.com/ee/api/projects.html#upload-a-file) will not work correctly. All other endpoints should work exactly as expected.

### Examples
Once you have your library instantiated, you can utilize many of the API's functionality:

Using the await/async method

```javascript
import Gitlab from 'gitlab';

const api = new Gitlab({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456' // Can be created in your profile.
});

// Listing users
let users = await api.Users.all();

// Or using Promise-Then notation
api.Projects.all()
.then((projects) => {
	console.log(projects)
})
```

General rule about all the function parameters:
- If its a required parameter, it is a named argument in the functions
- If its an optional parameter, it is defined in a options object following the named arguments

ie.

```javascript
import Gitlab from 'gitlab';

const api = new Gitlab({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456' // Can be created in your profile.
});

api.Projects.create(projectId, {
	//options defined in the Gitlab API documentation
})
```

### Pagination

For any .all() function on a resource, it will return all the items from Gitlab. This can be troublesome if there are many items, as the request it self can take a while to be fulfilled. As such, a maxPages option can be passed to limit the scope of the all function.


```javascript
import Gitlab from 'gitlab';

const api = new Gitlab({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456' // Can be created in your profile.
});

let projects = await api.Projects.all({maxPages:2});

```

You can also use this in conjunction to the perPage argument which would override the default of 30 per page set by Gitlab:

```javascript
import Gitlab from 'gitlab';

const api = new Gitlab({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456' // Can be created in your profile.
});

let projects = await api.Projects.all({maxPages:2, perPage:40});

```

Additionally, if you would like to get back the pagination information, to know how many total pages there are for example, pass the pagination option:

```javascript
...
let { data, pagination } = await api.Projects.all({ perPage:40, maxPages:2, showPagination: true });
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

## Migrating from node-gitlab/node-gitlab

With the success of this library thanks to the community, this has become the main npm package to interact with the Gitlab API. As such, there will be a little bit of growing pains for those upgrading from the original node-gitlab v1.8 to our newest 3.0.0 release, far too many to list here. I hope the library is written clearly enough to ease this transition, but if there is anything that you're having trouble with please feel free to create an issue! If not myself, someone will definitely have the answer to help get you all setup up as quickly as possible.  

## Docs

Although there are the [official docs](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api) for the API, there are some extra goodies offered by this package! After the 3.0.0 release, the next large project will be putting together proper documentation for these goodies [#39]! Stay tuned!! 

## Development

To get this running locally rather than from your `node_modules` folder:

```bash
$ git clone https://github.com/jdalrymple/node-gitlab.git
$ cd node-gitlab
$ npm install
$ npm build
```

And then inside whatever project you are using `node-gitlab` in you change your references to use that repo.  In your package.json of that upstream project change:

```json
  "dependencies": {
    ...
    "node-gitlab": "2.1.0"
    ...
  }
```

to this

```json
  "dependencies": {
    ...
    "node-gitlab": "<path-to-your-clone>"
    ...
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
  - export PERSONAL_ACCESS_TOKEN=$(docker exec -it gitlab bash -lc 'printf "%q" "${PERSONAL_ACCESS_TOKEN}"')
  - export GITLAB_URL=$(docker exec -it gitlab bash -lc 'printf "%q" "${GITLAB_URL}"')
```

1. Now run the tests

```bash
npm run test
```

You can also define them in front of the npm script

```
PERSONAL_ACCESS_TOKEN='abcdefg' GITLAB_URL='http://localhost:8080' npm run test
```

> Note it may take about 3 minutes to get the variables while Gitlab is starting up in the container

## CLI
```bash
npm install -g node-gitlab
```

```bash
# ES6 (>=node 8.0.0)
gitlab
// ES5
gitlabe5
```

[git-style-sub-commands](https://github.com/tj/commander.js#git-style-sub-commands)

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
- [Pavel Birukov](https://github.com/r00ger)
- [Sharma-Rajat](https://github.com/Sharma-Rajat)
- [Joseph Petersen](https://github.com/casz)
- [Igor Katsuba](https://github.com/Defenderbass)
- [Michael Townsend](https://github.com/Continuities)
- [bodtx](https://github.com/bodtx)
- [Artem](https://github.com/arthot)
- [Munif Tanjim](https://github.com/MunifTanjim)
- [Max Wittig](https://github.com/max-wittig)
- [Quentin Dreyer](https://github.com/qkdreyer)
- [Norm MacLennan](https://github.com/maclennann)
- [jnovick](https://github.com/jnovick)
- [Fabian Aussems](https://github.com/mozinator)
- [mdsb100](https://github.com/mdsb100)

## License

[MIT](https://github.com/jdalrymple/node-gitlab/blob/master/LICENSE.md)

## Changelog

[Here](https://github.com/jdalrymple/node-gitlab/blob/master/CHANGELOG.md)
