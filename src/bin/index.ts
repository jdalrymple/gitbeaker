#!/usr/bin/env node
/* eslint no-console: 0 */

import program, { Options } from 'sywac';
import ora from 'ora';
import chalk from 'chalk';
import { camelize, decamelize, depascalize } from 'xcase';
import * as core from '../core';

/* eslint global-require: 0 import/no-unresolved: 0 */
const map: [string, { name: string; args: string[] }[]] = require('./map.json') || {};

// Styling settings
const commandStyle = chalk.hex('#e34329').bold;
const groupStyle = chalk.hex('#fca325').bold;
const usageStyle = chalk.hex('#fc6e26').bold;
const optionStyle = chalk.white.bold;
const descriptionStyle = chalk.hex('#848484');
const hintStyle = chalk.hex('#6a5f88');

// Globally configurable arguments
const globalConfig: { [name: string]: Options } = {
  'gl-token': {
    desc: 'Your Gitlab Personal Token',
    type: 'string',
    defaultValue: process.env.GITLAB_TOKEN,
  },
  'gl-oauth-token': {
    desc: 'Your Gitlab OAuth Token',
    type: 'string',
    defaultValue: process.env.GITLAB_OAUTH_TOKEN,
  },
  'gl-job-token': {
    desc: 'Your Gitlab Job Token',
    type: 'string',
    defaultValue: process.env.GITLAB_JOB_TOKEN,
  },
  'gl-host': {
    desc: 'Your Gitlab API host (Defaults to https://www.gitlab.com)',
    type: 'string',
    defaultValue: process.env.GITLAB_HOST,
  },
  'gl-version': {
    desc: 'The targetted Gitlab API version (Defaults to 4)',
    type: 'number',
    defaultValue: process.env.GITLAB_VERSION && parseInt(process.env.GITLAB_VERSION, 10),
  },
  'gl-sudo': {
    desc: '[Sudo](https://docs.gitlab.com/ee/api/#sudo) query parameter',
    type: 'string',
    defaultValue: process.env.GITLAB_SUDO,
  },
  'gl-camelize': {
    desc: 'Camelizes all response body keys',
    type: 'boolean',
    defaultValue: process.env.GITLAB_CAMELIZE && process.env.GITLAB_CAMELIZE === 'true',
  },
  'gl-request-timeout': {
    desc: 'Timeout for API requests. Measured in ms',
    type: 'number',
    defaultValue:
      process.env.GITLAB_REQUEST_TIMEOUT && parseInt(process.env.GITLAB_REQUEST_TIMEOUT, 10),
  },
  'gl-profile-token': {
    desc:
      '[Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html)',
    type: 'string',
    defaultValue: process.env.GITLAB_PROFILE_TOKEN,
  },
  'gl-profile-mode': {
    desc:
      '[Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html)',
    type: 'string',
    defaultValue: process.env.GITLAB_PROFILE_MODE,
  },
};

// Options to be ignored when making an API call
const ignoreOptions = ['_', '$0', 'v', 'version', 'h', 'help', 'g', 'global-args'];

// Helper function to param case strings
function param(string) {
  const attempt = decamelize(string, '-');

  return attempt !== string ? attempt : depascalize(string, '-');
}

function setupAPIMethods(setupArgs, methodArgs) {
  methodArgs.forEach(name => {
    if (name === 'options') return;

    setupArgs.positional(`[--${param(name)}] <${param(name)}>`, {
      group: 'Required Options',
      type: 'string',
    });
  });

  return setupArgs;
}

function runAPIMethod(args, apiName, method) {
  const coreArgs = {};
  const optionalArgs = {};
  const initArgs = {};

  Object.entries(args).forEach(([argName, value]) => {
    if (ignoreOptions.includes(argName)) return;

    const camelCased = camelize(argName.replace('gl-', ''), '-');

    if (globalConfig[argName]) {
      initArgs[camelCased] = value;
    } else if (method.args.includes(camelCased)) coreArgs[camelCased] = value;
    else optionalArgs[camelCased] = value;
  });

  // Create service
  const s = new core[apiName](initArgs);

  // Execute function
  const spinner = ora({ text: 'Calling Gitlab', color: 'yellow' }).start();

  return s[method.name](...Object.values(coreArgs), optionalArgs)
    .then(r => {
      spinner.succeed('Success!');
      console.log(JSON.stringify(r, null, 3));
    })
    .catch(e => {
      spinner.fail(e.description);
    });
}

function setupAPIs(setupArgs, apiName, methods) {
  Object.entries(globalConfig).forEach(([k, v]) => {
    setupArgs.option(`${k} <value>`, {
      group: 'Base Options',
      ...v,
    });
  });

  for (let i = 1; i < methods.length; i += 1) {
    const method = methods[i];

    setupArgs.command(param(method.name), {
      setup: setupMethodArgs => setupAPIMethods(setupMethodArgs, method.args),
      run: args => runAPIMethod(args, apiName, method),
    });
  }

  return setupArgs;
}

// Add default settings
program
  .version('-v, --version')
  .help('-h, --help')
  .epilogue('Copyright 2019')
  .style({
    usagePrefix: s => usageStyle(s),
    group: s => groupStyle(s),
    flags: s => optionStyle(s),
    usageCommandPlaceholder: s => commandStyle(s),
    usageOptionsPlaceholder: s => optionStyle(s),
    desc: s => descriptionStyle(s),
    hints: s => hintStyle(s),
  });

program.option('-g, --global-args', {
  type: 'helpType',
  desc: 'Show global arguments currently set in the enviroment variables',
});

// Add all supported API's
Object.entries(map).forEach(([apiName, methods]) => {
  program.command(param(apiName), {
    desc: `The ${apiName} API`,
    setup: setupArgs => setupAPIs(setupArgs, apiName, methods),
  });
});

// Parse input
program.parse().then(({ argv, output }) => {
  // Handle global args option
  if (argv.g) {
    const display = {};

    Object.entries(globalConfig).forEach(([k, v]) => {
      if (v.defaultValue === undefined) return;

      display[k] = {
        description: v.desc,
        value: v.defaultValue,
      };
    });

    if (Object.keys(display).length === 0) {
      console.log(optionStyle('No global variables have been set!'));
    } else {
      console.log(JSON.stringify(display, null, 3));
    }
  } else if (output) console.log(output);
});
