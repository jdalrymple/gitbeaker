[![Dependency Status](https://david-dm.org/jdalrymple/node-gitlab-api/status.svg)](https://david-dm.org/jdalrymple/node-test#info=dependencies) [![devDependency Status](https://david-dm.org/jdalrymple/node-gitlab-api/dev-status.svg)](https://david-dm.org/jdalrymple/node-test#info=devDependencies)

node-gitlab-api
===============

--

[GitLab](https://github.com/gitlabhq/gitlabhq) API Nodejs library.
It wraps the HTTP v4 api library described [here](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api).

Install
=======

```bash
# Install from npm
npm install gitlab
```

Usage
=====

URL to your GitLab instance should not include `/api/v4` path.

```javascript
// Connection
const GitlabAPI = require('gitlab-api')({
  url:   'http://example.com', // Defaults to http://gitlab.com
  token: 'abcdefghij123456'
})
  
// Listing users
let users = await gitlab.users.all();

console.log(users);

// Listing projects
let projects = await gitlab.projects.all();

console.log(projects);
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

Contributors
------------
This started off as a fork from [node-gitlab](https://github.com/node-gitlab/node-gitlab) but I ended up rewriting 90% of the code. Here are the original work's [contributers](https://github.com/node-gitlab/node-gitlab#contributors).


License
-------

MIT

Changelog
=========

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

