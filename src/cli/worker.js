/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const path = require('path');

const fs = require('fs');

const nconf = require('nconf');

const isString = require('lodash.isstring');

const kebabCase = require('lodash.kebabcase');

const camelCase = require('lodash.camelcase');

const chunk = require('lodash.chunk');

const fromPairs = require('lodash.frompairs');

const stringify = require('json-stable-stringify');

const program = require('commander');

let NAMESPACE = '';
// require('./sub-command');

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

let Gitlab;

function requireOrGetGitlab() {
  // fix circular dependency
  // eslint-disable-next-line
  Gitlab = require('../index.js').default;
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


function createPara(arr = []) {
  return arr.map(item => `<${item}>`).join(' ');
}


function createSubCommandByDesc(commander, name, desc = '', para = []) {
  return commander.command(`${name} ${createPara(para)}`, desc);
}

function createCommand(commander, name, para = []) {
  return commander.command(`${name} ${createPara(para)}`);
}

function createDesc(commander, clsName, { desc = null, options = false }) {
  let reslut = desc || 'This commas has not options.';

  if (options) {
    reslut = 'Please check options by official document.';
  }

  commander.description(reslut);
}

function createAlias(commander, { alias = null }) {
  if (alias) {
    commander.alias(alias);
  }
}

function createAction(commander, clsName, fnName) {
  commander.action((...args) => {
    const gitlab = requireOrGetGitlab();
    const argsArr = args.slice();
    let command = null;
    if (argsArr.length > 0) {
      const { 0: last } = argsArr.splice(-1, 1);
      command = last;
    }
    if (command && command.parent) {
      const parsed = command.parseOptions(command.normalize(command.parent.rawArgs.slice(2)));
      if (parsed.unknown.length > 1) {
        const chunkData = chunk(parsed.unknown, 2).map(item => [item[0].replace('--', ''), item[1]]);
        const options = fromPairs(chunkData);
        argsArr.push(options);
      }
    }

    const fn = gitlab[clsName][fnName];
    fn.apply(gitlab[clsName], argsArr)
      .then(stringifyFormat)
      .catch(err => console.error(err.message));
  });
}

export function cls(target) {
  if (NAMESPACE) {
    return;
  }
  const clsName = kebabCase(target.name);
  createSubCommandByDesc(program, clsName, `use gitlab-${clsName}`);
}

export function api(...args) {
  // copy
  const argsArr = args.slice();
  let options = {};
  if (argsArr.length > 0 && !isString(argsArr[argsArr.length - 1])) {
    // remove options
    const { 0: last } = argsArr.splice(-1, 1);
    options = last;
  }

  return (target, fnName, descriptor) => {
    const clsName = target.constructor.name;
    if (NAMESPACE === clsName) {
      const commander = createCommand(program, fnName, argsArr);
      commander.allowUnknownOption(true);
      createDesc(commander, clsName, options);
      createAlias(commander, options);
      createAction(commander, clsName, fnName);
    }

    return descriptor;
  };
}

export function create(namespace) {
  NAMESPACE = camelCase(namespace).replace('gitlab', '');
  requireOrGetGitlab();
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
