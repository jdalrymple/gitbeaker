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

const APIMap = {};

let NAMESPACE = '';

let COMMAND = 'gitlab';

let gitlabInstance;


((function makeConfigFile() {
  const gitlabDirPath = path.join(process.env[(process.platform === 'win32' ? 'USERPROFILE' : 'HOME')], '.gitlab-cli');

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

function clsObjectFromAPIMap(clsName) {
  let value = APIMap[clsName];
  if (!value) {
    APIMap[clsName] = {};
    value = APIMap[clsName];
  }
  return value;
}

function apiObjectFromAPIMap(clsName, fnName, obj = null) {
  const clsObj = clsObjectFromAPIMap(clsName);
  let value = clsObj[fnName];
  if (obj && !value) {
    clsObj[fnName] = obj;
    value = clsObj[fnName];
  }
  return value;
}

function createPara(arr = []) {
  return arr.map(item => `${item}`).join(' ');
}


function createSubCommandByDesc(commander, name, desc = '', para = []) {
  return commander.command(`${name} ${createPara(para)}`, desc);
}

function createCommand(commander, name, para = []) {
  return commander.command(`${name} ${createPara(para)}`);
}

function createDesc(commander, clsName, { desc = null, options = false, method = null }) {
  let reslut = desc || 'This API has not options.';

  if (options) {
    reslut = 'Please check options by official document.';
  }

  if (method) {
    reslut = `Method: ${method}. ${reslut}`;
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

function createAPI(argsArr, options) {
  return (target, fnName, descriptor) => {
    // createAPI maybe called by cls
    const clsName = target.constructor.name;
    apiObjectFromAPIMap(clsName, fnName, {
      argsArr,
      options,
    });
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

export function cls(superTarget = null) {
  return (target) => {
    const clsName = kebabCase(target.name);
    if (NAMESPACE) {
      if (typeof superTarget === 'function' && superTarget.name) {
        // If has super, I must to inherit api by myself.
        const superClsName = superTarget.name;
        const superObj = clsObjectFromAPIMap(superClsName);

        // eslint-disable-next-line
        for (const fnName in superObj) {
          const item = superObj[fnName];
          createAPI(item.argsArr, item.options)(target.prototype, fnName, null);
        }
      }
      return;
    }
    createSubCommandByDesc(program, clsName, `use ${COMMAND}-${clsName}`);
  };
}

export function api(...args) {
  // copy
  const argsArr = args.slice();
  let options = {};
  /*
   * options must be at the end
   */
  if (argsArr.length > 0 && !isString(argsArr[argsArr.length - 1])) {
    // remove options
    const { 0: last } = argsArr.splice(-1, 1);
    options = last;
  }

  return createAPI(argsArr, options);
}

export function create(namespace) {
  const regExp = /(gitlab)|(gitlabe5)/;
  NAMESPACE = camelCase(namespace).replace(regExp, '');
  const matched = camelCase(namespace).match(regExp);
  if (matched && matched.length) {
    const { 0: first } = matched;
    COMMAND = first;
  }
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
