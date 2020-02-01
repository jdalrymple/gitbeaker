#!/usr/bin/env node
/* eslint no-console: 0 */

import program, { Options } from 'sywac';
import ora from 'ora';
import chalk from 'chalk';
import { camelize, decamelize, depascalize } from 'xcase';
import * as Gitbeaker from '@gitbeaker/node';
import * as map from '@gitbeaker/core/dist/map.json';

// Styling settings
const commandStyle = chalk.hex('#e34329').bold;
const groupStyle = chalk.hex('#fca325').bold;
const usageStyle = chalk.hex('#fc6e26').bold;
const optionStyle = chalk.white.bold;
const descriptionStyle = chalk.hex('#848484');
const hintStyle = chalk.hex('#6a5f88');

// Globally configurable arguments
const globalConfig: { [name: string]: Options } = {
  'gb-token': {
    alias: 'gl-token',
    desc: 'Your Gitlab Personal Token',
    type: 'string',
    defaultValue: process.env.GITBEAKER_TOKEN || process.env.GITLAB_TOKEN,
  },
  'gb-oauth-token': {
    alias: 'gl-oauth-token',
    desc: 'Your Gitlab OAuth Token',
    type: 'string',
    defaultValue: process.env.GITBEAKER_OAUTH_TOKEN || process.env.GITLAB_OAUTH_TOKEN,
  },
  'gb-job-token': {
    alias: 'gl-job-token',
    desc: 'Your Gitlab Job Token',
    type: 'string',
    defaultValue: process.env.GITBEAKER_JOB_TOKEN || process.env.GITLAB_JOB_TOKEN,
  },
  'gb-host': {
    alias: 'gl-host',
    desc: 'Your Gitlab API host (Defaults to https://www.gitlab.com)',
    type: 'string',
    defaultValue: process.env.GITBEAKER_HOST || process.env.GITLAB_HOST,
  },
  'gb-version': {
    alias: 'gl-version',
    desc: 'The targetted Gitlab API version (Defaults to 4)',
    type: 'number',
    defaultValue:
      (process.env.GITBEAKER_VERSION && parseInt(process.env.GITBEAKER_VERSION, 10)) ||
      (process.env.GITLAB_VERSION && parseInt(process.env.GITLAB_VERSION, 10)),
  },
  'gb-sudo': {
    alias: 'gl-sudo',
    desc: '[Sudo](https://docs.gitlab.com/ee/api/#sudo) query parameter',
    type: 'string',
    defaultValue: process.env.GITBEAKER_SUDO || process.env.GITLAB_SUDO,
  },
  'gb-camelize': {
    alias: 'gl-camelize',
    desc: 'Camelizes all response body keys',
    type: 'boolean',
    defaultValue:
      (process.env.GITBEAKER_CAMELIZE && process.env.GITBEAKER_CAMELIZE === 'true') ||
      (process.env.GITLAB_CAMELIZE && process.env.GITLAB_CAMELIZE === 'true'),
  },
  'gb-request-timeout': {
    alias: 'gl-request-timeout',
    desc: 'Timeout for API requests. Measured in ms',
    type: 'number',
    defaultValue:
      (process.env.GITBEAKER_REQUEST_TIMEOUT &&
        parseInt(process.env.GITBEAKER_REQUEST_TIMEOUT, 10)) ||
      (process.env.GITBEAKER_REQUEST_TIMEOUT &&
        parseInt(process.env.GITBEAKER_REQUEST_TIMEOUT, 10)),
  },
  'gb-profile-token': {
    alias: 'gl-profile-token',
    desc:
      '[Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html)',
    type: 'string',
    defaultValue: process.env.GITBEAKER_PROFILE_TOKEN || process.env.GITLAB_PROFILE_TOKEN,
  },
  'gb-profile-mode': {
    alias: 'gl-profile-mode',
    desc:
      '[Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html)',
    type: 'string',
    defaultValue: process.env.GITBEAKER_PROFILE_MODE || process.env.GITLAB_PROFILE_MODE,
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

    const camelCased = camelize(argName.replace('gb-', '').replace('gl-', ''), '-');

    if (globalConfig[argName]) {
      initArgs[camelCased] = value;
    } else if (method.args.includes(camelCased)) coreArgs[camelCased] = value;
    else optionalArgs[camelCased] = value;
  });

  // Create service
  const s = new Gitbeaker[apiName](initArgs);

  // Execute function
  const spinner = ora({ text: 'Calling Gitlab', color: 'yellow' }).start();

  return s[method.name](...Object.values(coreArgs), optionalArgs)
    .then(r => {
      spinner.succeed('Success!');
      console.log(JSON.stringify(r, null, 3));
    })
    .catch(e => {
      console.debug(e);
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
        alias: v.alias,
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
