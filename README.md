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
  url:   'http://example.com' // Defaults to http://gitlab.com
  token: 'abcdefghij123456'
})
  

// Listing users
let users = await gitlab.users.all();

console.log(users);

// Listing projects
let projects = await gitlab.projects.all();

console.log(projects);
```

Contributors
------------
This started off as a fork from [node-gitlab](https://github.com/node-gitlab/node-gitlab) but I ended up rewriting 90% of the code. Here are the original work's [contributers](https://github.com/node-gitlab/node-gitlab#contributors).


License
-------

MIT

Changelog
=========

------------------

- Initial release, still missing a testing suite, travis triggers and overall review

[Initial Release](https://github.com/jdalrymple/node-gitlab-api/commit/64a8f8c7720f5df9a67d3f26cc8712fc21eb3ac0) (2017-06-21)
------------------
