[![dependencies Status](https://david-dm.org/jdalrymple/node-gitlab-api/status.svg)](https://david-dm.org/jdalrymple/node-gitlab-api)[![devDependencies Status](https://david-dm.org/jdalrymple/node-gitlab-api/dev-status.svg)](https://david-dm.org/jdalrymple/node-gitlab-api?type=dev)[![Code Climate](https://codeclimate.com/github/jdalrymple/node-gitlab-api/badges/gpa.svg)](https://codeclimate.com/github/jdalrymple/node-gitlab-api)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



[![NPM](https://nodei.co/npm/node-gitlab-api.png?downloads=true&stars=true)](https://nodei.co/npm/node-gitlab-api/)

# node-gitlab-api

[GitLab](https://github.com/gitlabhq/gitlabhq) API NodeJS library.
It wraps the HTTP v4 API library described [here](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api).

## Table of Contents

* [Install](#install)
* [Usage](#usage)
    * [Import](#import)
    * [Examples](#examples)
    * [Pagination](#pagination)
* [Docs](#docs)
	* [Projects](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/projects.md)
	* [Groups](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/groups.md)
* [Contributors](#contributors)
* [Tests](#tests)
* [License](#licence)
* [Changelog](#changelog)

## Install

```bash
# Install from npm
npm install node-gitlab-api
```

## Usage
### Import
#### ES6 (>=node 8.0.0)
URL to your GitLab instance should not include `/api/v4` path.

Instantiate the library using a basic token created in your [Gitlab Profile](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html)
```javascript
import GitlabAPI from 'node-gitlab-api';

const API = GitlabAPI({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456'	//Can be created in your profile. 
})
```

Or, use a OAuth token instead!

```javascript
import GitlabAPI from 'node-gitlab-api';

const API = GitlabAPI({
  url:   'http://example.com', // Defaults to http://gitlab.com
  oauthToken: 'abcdefghij123456'
})
```
#### ES5
The same parameters as above, but the require url inclues a `/dist/es5`:

```javascript
const GitlabAPI = require('node-gitlab-api/dist/es5').default({
  ...
})
```

### Examples
Once you have your library instantiated, you can utilize many of the API's functionality:

Using the await/async method

```javascript
// Listing users
let users = await GitlabAPI.Users.all();
```

Or using Promise-Then notation
```javascript
// Listing projects
GitlabAPI.Projects.all()
.then((projects) => {
	console.log(projects)
})
```

General rule about all the function parameters:
- If its a required parameter, it is a named argument in the functions
- If its an optional parameter, it is defined in a options object following the named arguments

ie. 

```javascript
GitlabAPI.Projects.create(projectId, {
	//options defined in the Gitlab API documentation
})
```

### Pagination

For any .all() function on a resource, it will return all the items from Gitlab. This can be troublesome if there are many items, as the request it self can take a while to be fulfilled. As such, a maxPages option can be passed to limit the scope of the all function.


```javascript
// Listing projects
let projects = await GitlabAPI.Projects.all({maxPages:2});

```

You can also use this in conjunction to the perPage argument which would override the default of 30 per page set by Gitlab:

```javascript
// Listing projects
let projects = await GitlabAPI.Projects.all({maxPages:2, perPage:40});

```

## Docs

Although there are the official docs for the API, below are some additional docs for this node package! Would eventually like to document everything, but there is quite a bit to document. PR's are welcome! 😎

* [Projects](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/projects.md)
* [Groups](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/groups.md)

## Tests

Nothing yet, but its on the TODO list :P

## Contributors

This started off as a fork from [node-gitlab](https://github.com/node-gitlab/node-gitlab) but I ended up rewriting 90% of the code. Here are the original work's [contributors](https://github.com/node-gitlab/node-gitlab#contributors).

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

## License

[MIT](https://github.com/jdalrymple/node-gitlab-api/blob/master/LICENSE.md)

## Changelog

[3.0.0](https://github.com/jdalrymple/node-gitlab-api/) (2018-3-16)
------------------
- Exporting all services seperatly ie. const { Projects } from 'node-gitlab-api'; as well as the usual default export: const Gitlab from 'node-gitlab-api'
- Exporting namespaces which are groups of related API's. These include: ProjectsNamespace, UsersNamespace and GroupsNamespace
- Added activies support to the Users service
- Added events support to the Projects, and Users
- Added full support for ProjectVariables and GroupVariables
- Added support for UserGPGKeys
- Added support for UserImpersonationTokens
- Added support for SystemHooks

...to be continued


### Breaking Changes between 2.2.4 and 3.0.0
- All services being exported are not capitalized for clarity that they are themselves api's and not properties. ie. GitlabAPI.Projects vs GitlabAPI.projects
-

[2.2.4](https://github.com/jdalrymple/node-gitlab-api/5d7c031ca2b833b28633647195560379d88ba5b3) (2018-2-12)
------------------
- Fixed the missing options for tags.all #40
- Added delete key method to UserKeys.js #41 thanks to [Claude Abounegm](https://github.com/claude-abounegm)

[2.2.3](https://github.com/jdalrymple/node-gitlab-api/ce7f17693168b5dec3b36eb1d5ab796c9374613f) (2018-2-3)
------------------
- Fixing bug within the customAttributes logic

[2.2.2](https://github.com/jdalrymple/node-gitlab-api/ca1906879d869bf5b9aca0b2f64e46c89f3b5f4f) (2018-1-24)
------------------
- Fixing bug with the version support

[2.2.1](https://github.com/jdalrymple/node-gitlab-api/e864064c98feda59d594d77b67f7d0657db78700) (2018-1-23)
------------------
- Added support for the Version API through version.show()

[2.2.0](https://github.com/jdalrymple/node-gitlab-api/96e414a75ad97e88ecaaff15a6c1409a9e27b963) (2018-1-18)
------------------
- Fixed the missing options parameter for the ProjectRepositoryCommitComment's model thanks to [Martin Benninger](https://github.com/MartinBenninger) in PR [#21](https://github.com/jdalrymple/node-gitlab-api/pull/21)
- Removal of the left over debug console.logs's within project issues again by [Martin Benninger](https://github.com/MartinBenninger) in PR [#21](https://github.com/jdalrymple/node-gitlab-api/pull/22)
- Added proper docs for ProjectRepositoryFiles, enabled default urlEncoding for the passed in file paths and also documented
how to run locally via npm linking for Development testing thanks to [Adam Dehnel](https://github.com/arsdehnel) in [PR #23](https://github.com/jdalrymple/node-gitlab-api/pull/23)
- Exposed the Merge Requests resource which was missing from the exports list thanks to [fewieden](https://github.com/fewieden) in [PR #26](https://github.com/jdalrymple/node-gitlab-api/pull/26)
- Added support for the Project Enviroments API and the Project Jobs API thanks to [Jeff Pelton](https://github.com/comster) in [PR #28](https://github.com/jdalrymple/node-gitlab-api/pull/28)
- Fixing parse function to handle encoded urls that dont include '/' such as in groups #24

### Breaking Changes between 2.1.0 and 2.2.0
- Fixed a problem with the get responses where the response contained the full request response and not just the body

[2.1.0](https://github.com/jdalrymple/node-gitlab-api/0ea73235e0b465a0d4717a7e1f33251b58777b60) (2017-12-15)
------------------
- Added es5 support and clarified the default supported versions of node (>=8.0.0 for default)
- Updating project docs for consistency
- Adding project unsharing to API. It was in the docs, but missing from the API
- Updating deprecated protected branches endpoint. Previously this was `projects.branches.protect` now its `projects.protectedBranches.protect`
- Added Owned Runners and Runner Jobs API 

### Breaking Changes between 1.3.3 and 2.1.0
- The `list` functions are no longer supported and have all been renamed to `all`
- The `update` functions are no longer supported and have all been renamed to  `edit`
- The `addKey` function has been renamed to `add` in UserKeys class
- The deploy_keys and merge_requests properties have been renamed to deployKeys and mergeRequests
- Removed old group member functions from the groups class as they have been moved to the GroupMembers class. This includes the addMember, listMembers, editMember, and removeMember. These functions can now be access via group.members.add, group.members.all, group.members.edit and group.members.remove respectively.
- Removed the old group project functions from the Group class. These are now located in the GroupProject class. The functions that have been removed are listProjects, addProjects. These functions can be access by group.projects.all, and group.projects.add respectively.
- Updated the structure of the ProjectRepository class such that its commits, branches, tags and files are properties and can be accessed like `repository.commits.all()` etc.
- Removed unused labels endpoint since it already exists under projects.labels


[2.0.1-rc.1](https://github.com/jdalrymple/node-gitlab-api/62a4d360f0ca2cd584caf852d96ced3761992072) (2017-11-29)
------------------
- Updating pagination changes into v2.0.1
- Removed unused labels endpoint since it already exists under projects.labels
- Added a mergeRequests class for the merge_requests endpoints
- Extended the ProjectMergeRequests class for additional functionality that was missing for project merge requests such as 
accepting merge requests, cancelling merges when the pipeline succeeds, listing issues that will close on merge, subscribing/unsubscribing to merges, creating todos, time spent and time estimates as well as time stats.
- Fixed the notes endpoints for ProjectMergeRequests. This can now be access via projects.mergeRequests.notes.[command here]
- Added comments endpoints to the ProjectRepositoryCommits class
- Added the ability to post a status to a specific commit to the Project class


[1.3.3](https://github.com/jdalrymple/node-gitlab-api/b8a3db4a4aaf9482fb3905883d92d940babfb461) (2017-11-29)
------------------
- Adding pagination to project pipelines thanks to [Tamás Török-Vistai](https://github.com/tvtamas)
 
[2.0.0-rc.2](https://github.com/jdalrymple/node-gitlab-api/62a4d360f0ca2cd584caf852d96ced3761992072) (2017-11-28)
------------------
- Updating all recent core changes into v2.0.0

[1.3.2](https://github.com/jdalrymple/node-gitlab-api/87e3d4b0a9616c19d69e3d6213c196948240d93e) (2017-11-28)
------------------
- Adding default values for the BaseModel options parameter.

[1.3.1](https://github.com/jdalrymple/node-gitlab-api/ba80ac10e1e08176da7a3a9848758a989a7199dd) (2017-11-27)
------------------
- Fixed broken argument reference in the showFile and showFileRaw functions.

[2.0.0-rc.1](https://github.com/jdalrymple/node-gitlab-api/7246896c7bad7b238179109d1d6a391b0c2ef302) (2017-11-25)
------------------
- Updated project docs for clarity
- Cleaned up many linting problems within the class models
- Removed mutator operations on the options arguments
- Renamed ProjectKeys to ProjectDeployKeys
- Renamed `list` functions to `all` for consistency
- Renamed `update` functions to `edit` for consistency
- Renaming addKey just to add in UserKeys class
- Renaming deploy_keys and merge_requests to deployKeys and mergeRequests for consistency
- Adding Project Access Requests
- Removing old group member functions from the groups class as they have been moved to the GroupMembers class. This includes the addMember, listMembers, editMember, and removeMember. These functions can now be access via group.members.add, group.members.all, group.members.edit and group.members.remove respectively.
- Removed the old group project functions from the Group class. These are now located in the GroupProject class. The functions that have been removed are listProjects, addProjects. These functions can be access by group.projects.all, and group.projects.add respectively.
- Methods in the ProjectDeployKeys class updated for consistency
- Methods in the ProjectHooks updated for consistency
- Updated the structure of the ProjectRepository class with commits, branches, tags and files properties.
- Added contributors, showBlob and showBlobRaw functions to the ProjectRepository class

[1.3.0](https://github.com/jdalrymple/node-gitlab-api/3048a3989fabe3992044baccdab1e53257f0f379) (2017-11-25)
------------------
- Extending the Groups API, see docs for a full overview.


[1.2.0](https://github.com/jdalrymple/node-gitlab-api/b08779a321fb25668df1e0f7e001394679cc47ba) (2017-11-25)
------------------
- Adding fix to the API constructor to include the [missing oauthToken](https://github.com/jdalrymple/node-gitlab-api/pulls?q=is%3Apr+is%3Aclosed) thanks to [Salim Benabbou](https://github.com/Salimlou).
- Updated some of the outdated gitlab repository file endpoints outlined in [Issue #11](https://github.com/jdalrymple/node-gitlab-api/issues/11): [showFile](https://docs.gitlab.com/ee/api/repository_files.html#get-file-from-repository), [updateFile](https://docs.gitlab.com/ee/api/repository_files.html#update-existing-file-in-repository), and [createFile](https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository). Also added [deleteFile](https://docs.gitlab.com/ee/api/repository_files.html#delete-existing-file-in-repository) and [showRawFile](https://docs.gitlab.com/ee/api/repository_files.html#get-raw-file-from-repository).
- Fixing bug where many pages where attempted to be loaded on every GET request.

[1.1.4](https://github.com/jdalrymple/node-gitlab-api/328bc29fe48d1bf18c83779a214cce34e80dda09) (2017-11-17)
------------------
- Library maintenance, cleaning up spelling errors, updating dependencies, adding to contributors lists etc.

[1.1.3](https://github.com/jdalrymple/node-gitlab-api/6f28ce1726ce371d4b0272d5f8305080d51e3e25) (2017-11-17)
------------------
- Fixing typos in the project sharing (group_access) thanks to [Christoph Lehmann](https://github.com/christophlehmann)
- Updated the ReadMe to be more clear based on suggestions from [Frank V](https://github.com/FrankV01)

[1.1.2](https://github.com/jdalrymple/node-gitlab-api/36570c32be7cd564bda9c7c7dc07059987969bd4) (2017-10-29)
------------------
- Updated the protected branch functionality by adding an options parameter originally proposed by [Martin Bour](https://github.com/shadygrove)
- Removed old paging logic from groups
- Updating library dependencies

[1.1.1](https://github.com/jdalrymple/node-gitlab-api/67df1c8772614b3856f2995eaa7d260d0f697e49) (2017-09-24)
------------------
- Patch, fixed a broken pagination property 
- Adding in missing options parameter  in the groups API thanks to a pull request from [Cory Zibell](https://github.com/coryzibell)

[1.1.0](https://github.com/jdalrymple/node-gitlab-api/385ef9f351981f26180e1381525ade458bcde1cd) (2017-09-24)
------------------
- Adding proper pagination support thanks to a problem noticed by [Mike Wyatt](https://github.com/mikew)

[1.0.14](https://github.com/jdalrymple/node-gitlab-api/b8fb74828503f0a6432376ad156b7f9e33f6228e) (2017-08-1)
------------------
- Adding default file name for file uploads. If none is supplied, the file name is
inferred from the file path

[1.0.13](https://github.com/jdalrymple/node-gitlab-api/3eb244a5b487f487859f750e46c8fa287b4455c4) (2017-07-31)
------------------
- Fixed another bug in the project file upload functionality

[1.0.12](https://github.com/jdalrymple/node-gitlab-api/commit/6f77ee0a462a19ae65bd6206eb94c72e271ba673) (2017-07-30)
------------------
- Added issue links (for related issues)
- Fixed project file upload

[1.0.11](https://github.com/jdalrymple/node-gitlab-api/commit/af4eb6955f583b5be4a4032d2d532d81bb2cf54d) (2017-07-20)
------------------
- Fixing the problem where Id was used instead of IId's for Project issues
- Fixing the naming convention for Project Issues
- Standardized the use of parseInt in the code base
- Removed instances of duplicate code found by code climate


[1.0.10](https://github.com/jdalrymple/node-gitlab-api/commit/c4a55aba89d83fda1552b3d5688b090b0c2b60aa) (2017-07-13)
------------------
- Fixing Issues #1, #2, and #3

[1.0.9](https://github.com/jdalrymple/node-gitlab-api/commit/7a90dbb6354fe956fff37c56f938a833e3fc5ea1) (2017-07-06)
------------------
- Fixing broken Notes API reference
- Added Project triggers, members and hooks docs
- Moved Project Runners into its own scope and separated out general Runners API logic

[1.0.8](https://github.com/jdalrymple/node-gitlab-api/commit/491a707624ba9f58818014eacfeb7182b8ecf800) (2017-06-30)
------------------
- Adding more to the Project Issue Notes API
- Updating Readme to show examples of connecting with OAuth tokens
- Begun adding documentation for projects

[1.0.7](https://github.com/jdalrymple/node-gitlab-api/commit/50642ad764ecd20d2a9e279cf2a47e7b5efe8f07) (2017-06-23)
------------------
- Fixing bug within the Issues API; reference to an old function.

[1.0.6](https://github.com/jdalrymple/node-gitlab-api/commit/2b02d1e354c1c267683d10b893ad055fe856a214) (2017-06-23)
------------------
- Fixing bug within the Labels API; Missing required argument.

[1.0.5](https://github.com/jdalrymple/node-gitlab-api/commit/03a22b46a62d7b68937575b0b74b6fd3496f7cbf) (2017-06-23)
------------------
- Fixing bug within the delete API calls. It was missing query parameters

[1.0.4](https://github.com/jdalrymple/node-gitlab-api/commit/9d9ef2615c6dd778a3fb1c6140d5ce009c421bb1) (2017-06-23)
------------------
- Adding more to the Labels API
- Cleaned up the Issues class

[1.0.3](https://github.com/jdalrymple/node-gitlab-api/commit/fe5a5fbb8d01fb670b7c7b14ce2c5b7f30d71fe5) (2017-06-23)
------------------
- Updating problems within the Milestone API
- Removed the old 'list' calls for projects and issues which displayed a deprecated message. Only all is available now.

[1.0.2](https://github.com/jdalrymple/node-gitlab-api/commit/a295d5a613efa13be79fec5fa2835076047cdcc5) (2017-06-22)
------------------
- Updating examples in ReadMe
- Adding dependency badges
- Removing unused test files

[1.0.1](https://github.com/jdalrymple/node-gitlab-api/commit/64a8f8c7720f5df9a67d3f26cc8712fc21eb3ac0) (2017-06-21)
------------------
- Initial release
- TODO: Tests, Examples

## Development

To get this running locally rather than from your `node_modules` folder:

```bash
$ git clone https://github.com/jdalrymple/node-gitlab-api.git
$ cd node-gitlab-api
$ npm install
$ npm build
```

And then inside whatever project you are using `node-gitlab-api` in you change your references to use that repo.  In your package.json of that upstream project change:

```json
  "dependencies": {
    ...
    "node-gitlab-api": "2.1.0"
    ...
  }
```

to this

```json
  "dependencies": {
    ...
    "node-gitlab-api": "<path-to-your-clone>"
    ...
  }
```