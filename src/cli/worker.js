/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const path = require('path');

const fs = require('fs');

const nconf = require('nconf');

const stringify = require('json-stable-stringify');

const Gitlab = require('../index.js').default;

let gitlab;

((function makeConfigFile() {
  const gitlabDirPath = path.join(process.env[(process.platform === 'win32' ? 'USERPROFILE' : 'HOME')], '.gitlab');

  if (!fs.existsSync(gitlabDirPath)) {
    fs.mkdirSync(gitlabDirPath);
  }

  const configFilePath = path.join(gitlabDirPath, 'config.json');

  nconf.file({
    file: configFilePath,
  });
})());

function stringifyFormat(data) {
  if (data != null) {
    console.log(stringify(data, {
      space: 2,
    }));
  }
}

function checkOptions() {
  if (!nconf.get('url')) {
    console.log("You should set url by 'gitlab url http://example.com' ");
    return false;
  }
  if (!nconf.get('token')) {
    console.log("You should set token by 'gitlab token abcdefghij123456' ");
    return false;
  }
  return true;
}

function requireOrGetGitlab() {
  if (gitlab != null) {
    return gitlab;
  }
  if (checkOptions()) {
    gitlab = new Gitlab({
      url: nconf.get('url'),
      token: nconf.get('token'),
    });
    return gitlab;
  }
  return null;
}

export function getConfigCmd() {
  const config = nconf.get();
  stringifyFormat(config);
}

export function urlCmd(url) {
  if (url != null) {
    nconf.set('url', url);
    nconf.save();
    return console.log("Save url. Please make sure your settings are 'http' or 'https'.");
  }
  return console.log(nconf.get('url'));
}

export function tokenCmd(token) {
  if (token != null) {
    nconf.set('token', token);
    nconf.save();
    console.log('Save token');
  }
  return console.log(nconf.get('token'));
}

export function whoAmICmd() {
  gitlab = requireOrGetGitlab();
  gitlab.Users.current().then(stringifyFormat);
}
