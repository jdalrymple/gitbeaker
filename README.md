[![dependencies Status](https://david-dm.org/jdalrymple/node-gitlab-api/status.svg)](https://david-dm.org/jdalrymple/node-gitlab-api)[![devDependencies Status](https://david-dm.org/jdalrymple/node-gitlab-api/dev-status.svg)](https://david-dm.org/jdalrymple/node-gitlab-api?type=dev)[![Code Climate](https://codeclimate.com/github/jdalrymple/node-gitlab-api/badges/gpa.svg)](https://codeclimate.com/github/jdalrymple/node-gitlab-api)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



[![NPM](https://nodei.co/npm/node-gitlab-api.png?downloads=true&stars=true)](https://nodei.co/npm/node-gitlab-api/)

# node-gitlab-api

[GitLab](https://github.com/gitlabhq/gitlabhq) API Nodejs library.
It wraps the HTTP v4 api library described [here](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api).

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Docs](#docs)
	* [Projects](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/projects.md)
* [Contributors](#contributors)
* [License](#licence)
* [Changelog](#changelog)

## Install

```bash
# Install from npm
npm install node-gitlab-api
```

## Usage

URL to your GitLab instance should not include `/api/v4` path.

Instantiate the library using a basic token created in your [Gitlab Profile](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html)
```javascript
const GitlabAPI = require('node-gitlab-api')({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456'	//Can be created in your profile. 
})
```

Or, use a oauth token instead!

```javascript
const GitlabAPI = require('node-gitlab-api')({
  url:   'http://example.com', // Defaults to http://gitlab.com
  oauthToken: 'abcdefghij123456'
})
```

Once you have your library instatiated, you can utilize many of the api's functionality:

Using the await/async method

```javascript
// Listing users
let users = await GitlabAPI.users.all();
```

Or using Promise-Then notation
```javascript
// Listing projects
gitlab.projects.all()
.then((projects) => {
	console.log(projects)
})
```

General rule about all the function parameters:
- If its a required parameter, it is a named argument in the functions
- If its an optional parameter, it is defined in a options object following the named arguments

ie. 

```javascript
GitlabAPI.projects.create(projectId, {
	//options defined in the gitlab api documentation
})
```

### Pagination

For any .all() function on a reasource, it will return all the items from gitlab. This can be troublesome if there are many items, as the request it self can take a while to be fulfilled. As such, a maxPages option can be passed to limit the scope of the all function.


```javascript
// Listing projects
let projects = await gitlab.projects.all({max_pages:2});

```

You can also use this in conjunction to the perPage argument which would override the default of 30 per page set by Gitlab:

```javascript
// Listing projects
let projects = await gitlab.projects.all({max_pages:2, per_page:40});

```


## Docs

Although there are the offical docs for the API, i realised i should still explain the function calls in this library, so i wrote some up!

* [Projects](https://github.com/jdalrymple/node-gitlab-api/blob/master/docs/projects.md)

## Contributors

This started off as a fork from [node-gitlab](https://github.com/node-gitlab/node-gitlab) but I ended up rewriting 90% of the code. Here are the original work's [contributers](https://github.com/node-gitlab/node-gitlab#contributors).

- [Dylan DesRosier](https://github.com/ddesrosier)
- [Shady Grove](https://github.com/shadygrove)
- [Christoph Lehmann](https://github.com/christophlehmann)
- [Frank V](https://github.com/FrankV01)

## License

MIT

## Changelog
[1.1.3](https://github.com/jdalrymple/node-gitlab-api/6f28ce1726ce371d4b0272d5f8305080d51e3e25) (2017-09-24)
------------------
- Fixing typos in the project sharing (group_access) thanks to [Christoph Lehmann](https://github.com/christophlehmann)
- Updated the ReadMe to be more clear based on suggestions from [Frank V](https://github.com/FrankV01)

[1.1.2](https://github.com/jdalrymple/node-gitlab-api/36570c32be7cd564bda9c7c7dc07059987969bd4) (2017-09-24)
------------------
- Updated the protected branch functionality by adding an options parameter originally proposed by [shadygrove](https://github.com/shadygrove)
- Removed old paging logic from groups
- Updating library dependencies

[1.1.1](https://github.com/jdalrymple/node-gitlab-api/67df1c8772614b3856f2995eaa7d260d0f697e49) (2017-09-24)
------------------
- Patch, fixed a broken pagination property 

[1.1.0](https://github.com/jdalrymple/node-gitlab-api/385ef9f351981f26180e1381525ade458bcde1cd) (2017-09-24)
------------------
- Adding proper pagination support

[1.0.14](https://github.com/jdalrymple/node-gitlab-api/b8fb74828503f0a6432376ad156b7f9e33f6228e) (2017-08-1)
------------------
- Adding default file name for file uploads. If none is supplied, the filename is
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
- Standadized the use of parseInt in the codebase
- Removed instances of duplicate code found by code climate


[1.0.10](https://github.com/jdalrymple/node-gitlab-api/commit/c4a55aba89d83fda1552b3d5688b090b0c2b60aa) (2017-07-13)
------------------
- Fixing Issues #1, #2, and #3

[1.0.9](https://github.com/jdalrymple/node-gitlab-api/commit/7a90dbb6354fe956fff37c56f938a833e3fc5ea1) (2017-07-06)
------------------
- Fixing broken Notes API reference
- Added Project triggers, members and hooks docs
- Moved Project Runners into its own scope and seperated out general Runners API logic

[1.0.8](https://github.com/jdalrymple/node-gitlab-api/commit/491a707624ba9f58818014eacfeb7182b8ecf800) (2017-06-30)
------------------
- Adding more to the Project Issue Notes API
- Updating Readme to show examples of connecting with oauth tokens
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
- Updating examples in readme
- Adding dependancy badges
- Removing unused test files

[1.0.1](https://github.com/jdalrymple/node-gitlab-api/commit/64a8f8c7720f5df9a67d3f26cc8712fc21eb3ac0) (2017-06-21)
------------------
- Initial release
- TODO: Tests, Examples

