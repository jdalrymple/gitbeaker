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

URL to your GitLab instance should not include `/api/v3` path.

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
This started off as a fork from [node-gitlab](https://github.com/node-gitlab/node-gitlab) but i ended up rewriting 90% of the code. Here are the original work's [contributers](https://github.com/node-gitlab/node-gitlab#contributors).


License
-------

MIT


Changelog
=========

- POC
