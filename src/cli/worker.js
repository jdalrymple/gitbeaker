/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const path = require('path');

const fs = require('fs');

const nconf = require('nconf');

const isString = require('lodash.isstring');

const stringify = require('json-stable-stringify');

const program = require('commander');

const rootCommenderMap = {};
// exports.done = false;

// exports.done = true;

require('./sub-command');

// fix circular dependency
const Gitlab = require('../index.js').default;

let gitlabInstance;

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
  if (gitlabInstance != null) {
    return gitlabInstance;
  }
  if (checkOptions()) {
    gitlabInstance = new Gitlab({
      url: nconf.get('url'),
      token: nconf.get('token'),
    });
    return gitlabInstance;
  }
  return null;
}


function createPara(arr) {
  return arr.map(item => `<${item}>`).join(' ');
}


function createCommand(commander, name, para) {
  return commander.command(`${name} ${createPara(para)}`);
}


function createDesc(commander, clsName, { desc = null }) {
  const reslut = desc || `Check https://github.com/jdalrymple/node-gitlab/blob/master/src/services/${clsName}.js`;

  commander.description(reslut);
}

function createAlias(commander, { alias = null }) {
  if (alias) {
    commander.alias(alias);
  }
}

function getOrCreateRootCommender(commander, name, para = []) {
  let value = rootCommenderMap[name];
  if (!value) {
    rootCommenderMap[name] = createCommand(commander, name, para);
    value = rootCommenderMap[name];
  }
  return value;
}

function createAction(subCommander, clsName, fnName) {
  subCommander.action((...args) => {
    const gitlab = requireOrGetGitlab();
    gitlab[clsName][fnName]().then(stringifyFormat);
  });
}

export function cli(...args) {
  // copy
  const argsArr = args.slice();
  let options = {};
  if (!isString(argsArr[argsArr.length - 1])) {
    // remove options
    options = argsArr.shift();
  }
  return (target, fnName, descriptor) => {
    const clsName = target.constructor.name;
    let rootCommender = getOrCreateRootCommender(program, clsName);
    createDesc(rootCommender, clsName, options);
    rootCommender = rootCommender.forwardSubcommands();

    const subCommander = createCommand(rootCommender, fnName, argsArr);
    createAlias(subCommander, options);
    createAction(subCommander, clsName, fnName);

    return descriptor;
  };
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
  const gitlab = requireOrGetGitlab();
  gitlab.Users.current().then(stringifyFormat);
}
