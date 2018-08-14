const fs = require('fs');
const fse = require('fs-extra');

const kebabCase = require('lodash.kebabcase');

const ES6_COMMAND = 'gitlab';
const ES5_COMMAND = 'gitlabe5';

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

  nameArray.forEach((name) => {
    fs.writeFileSync(`./bin/${name}`,
      `#!/usr/bin/env node \n
require('../dist/${path}/cli/index').default('${name}');`);
  });
}

buildBinDirectory(ES6_COMMAND, 'latest');
buildBinDirectory(ES5_COMMAND, 'es5');
