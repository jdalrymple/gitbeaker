/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const fs = require('fs');
const fse = require('fs-extra');
const Promise = require('bluebird');

const kebabCase = require('lodash.kebabcase');

const ES6_COMMAND = 'gitlab';
const ES5_COMMAND = 'gitlabe5';

const writeFile = Promise.promisify(fs.writeFile);

function buildBinDirectory(command, path) {
  const nameArray = fs.readdirSync('./src/services').map((file) => {
    let result = file;
    if (result === 'index.js') {
      result = '';
    }
    const name = kebabCase(`${result.replace('.js', '')}`);
    return `${command}${name ? '-' : ''}${name}`;
  });
  const packageInfo = fse.readJsonSync('./package.json');
  packageInfo.bin = packageInfo.bin || {};
  nameArray.forEach((name) => {
    packageInfo.bin[name] = `bin/${name}`;
  });
  fse.writeJsonSync('./package.json', packageInfo, { spaces: 2 });

  return Promise.all(nameArray.map(name => writeFile(`./bin/${name}`,
    `#!/usr/bin/env node \n require('../dist/${path}/cli/index').default('${name}');`)));
}

Promise.all(buildBinDirectory(ES6_COMMAND, 'latest'), buildBinDirectory(ES5_COMMAND, 'es5')).then(() => {
  console.log('Build bin finished');
}).catch((error) => {
  console.error(error.message);
});
