import program, { Options } from 'sywac';
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
function globalConfig(env = process.env): { [name: string]: Options } {
  return {
    'gb-token': {
      alias: 'gl-token',
      desc: 'Your Gitlab Personal Token',
      type: 'string',
      defaultValue: env.GITBEAKER_TOKEN || env.GITLAB_TOKEN,
    },
    'gb-oauth-token': {
      alias: 'gl-oauth-token',
      desc: 'Your Gitlab OAuth Token',
      type: 'string',
      defaultValue: env.GITBEAKER_OAUTH_TOKEN || env.GITLAB_OAUTH_TOKEN,
    },
    'gb-job-token': {
      alias: 'gl-job-token',
      desc: 'Your Gitlab Job Token',
      type: 'string',
      defaultValue: env.GITBEAKER_JOB_TOKEN || env.GITLAB_JOB_TOKEN,
    },
    'gb-host': {
      alias: 'gl-host',
      desc: 'Your Gitlab API host (Defaults to https://www.gitlab.com)',
      type: 'string',
      defaultValue: env.GITBEAKER_HOST || env.GITLAB_HOST,
    },
    'gb-version': {
      alias: 'gl-version',
      desc: 'The targetted Gitlab API version (Defaults to 4)',
      type: 'number',
      defaultValue:
        (env.GITBEAKER_VERSION && parseInt(env.GITBEAKER_VERSION, 10)) ||
        (env.GITLAB_VERSION && parseInt(env.GITLAB_VERSION, 10)),
    },
    'gb-sudo': {
      alias: 'gl-sudo',
      desc: '[Sudo](https://docs.gitlab.com/ee/api/#sudo) query parameter',
      type: 'string',
      defaultValue: env.GITBEAKER_SUDO || env.GITLAB_SUDO,
    },
    'gb-camelize': {
      alias: 'gl-camelize',
      desc: 'Camelizes all response body keys',
      type: 'boolean',
      defaultValue:
        (env.GITBEAKER_CAMELIZE && env.GITBEAKER_CAMELIZE === 'true') ||
        (env.GITLAB_CAMELIZE && env.GITLAB_CAMELIZE === 'true'),
    },
    'gb-request-timeout': {
      alias: 'gl-request-timeout',
      desc: 'Timeout for API requests. Measured in ms',
      type: 'number',
      defaultValue:
        (env.GITBEAKER_REQUEST_TIMEOUT && parseInt(env.GITBEAKER_REQUEST_TIMEOUT, 10)) ||
        (env.GITBEAKER_REQUEST_TIMEOUT && parseInt(env.GITBEAKER_REQUEST_TIMEOUT, 10)),
    },
    'gb-profile-token': {
      alias: 'gl-profile-token',
      desc:
        '[Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html)',
      type: 'string',
      defaultValue: env.GITBEAKER_PROFILE_TOKEN || env.GITLAB_PROFILE_TOKEN,
    },
    'gb-profile-mode': {
      alias: 'gl-profile-mode',
      desc:
        '[Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html)',
      type: 'string',
      defaultValue: env.GITBEAKER_PROFILE_MODE || env.GITLAB_PROFILE_MODE,
    },
  };
}

// Options to be ignored when making an API call
const ignoreOptions = ['_', '$0', 'v', 'version', 'h', 'help', 'g', 'global-args'];

// Helper function to param case strings
function param(string) {
  const attempt = decamelize(string, '-');

  return attempt !== string ? attempt : depascalize(string, '-');
}

function setupAPIMethods(setupArgs, methodArgs) {
  methodArgs.forEach((name) => {
    if (name === 'options') return;

    setupArgs.positional(`[--${param(name)}] <${param(name)}>`, {
      group: 'Required Options',
      type: 'string',
    });
  });

  return setupArgs;
}

function runAPIMethod(ctx, args, apiName, method) {
  const coreArgs = {};
  const optionalArgs = {};
  const initArgs = {};

  Object.entries(args).forEach(([argName, value]) => {
    if (ignoreOptions.includes(argName) || value == null) return;

    const camelCased = camelize(argName.replace('gb-', '').replace('gl-', ''), '-');

    if (globalConfig()[argName.replace('gl-', 'gb-')]) {
      initArgs[camelCased] = value;
    } else if (method.args.includes(camelCased)) coreArgs[camelCased] = value;
    else optionalArgs[camelCased] = value;
  });

  // Create service
  const s = new Gitbeaker[apiName](initArgs);

  // Execute function
  return s[method.name](...Object.values(coreArgs), optionalArgs)
    .then((r) => {
      ctx.output = JSON.stringify(r, null, 3);
    })
    .catch((e) => {
      ctx.output = e;
    });
}

function setupAPIs(setupArgs, apiName, methods) {
  Object.entries(globalConfig()).forEach(([k, v]) => {
    setupArgs.option(`${k} <value>`, {
      group: 'Base Options',
      ...v,
    });
  });

  for (let i = 1; i < methods.length; i += 1) {
    const method = methods[i];

    setupArgs.command(param(method.name), {
      setup: (setupMethodArgs) => setupAPIMethods(setupMethodArgs, method.args),
      run: (args, ctx) => runAPIMethod(ctx, args, apiName, method),
    });
  }

  return setupArgs;
}

// Add default settings
const cli = program
  .version('-v, --version')
  .help('-h, --help')
  .epilogue('Copyright 2019')
  .style({
    usagePrefix: (s) => usageStyle(s),
    group: (s) => groupStyle(s),
    flags: (s) => optionStyle(s),
    usageCommandPlaceholder: (s) => commandStyle(s),
    usageOptionsPlaceholder: (s) => optionStyle(s),
    desc: (s) => descriptionStyle(s),
    hints: (s) => hintStyle(s),
  });

// Add Global commands
cli.boolean('-g --global-args', {
  desc: 'Show global arguments currently set in the enviroment variables',
});

cli.command('*', (argv, ctx) => {
  if (!argv.g) return;

  const display = {};

  Object.entries(globalConfig()).forEach(([k, v]) => {
    if (v.defaultValue == null) return;

    display[k] = {
      alias: v.alias,
      description: v.desc,
      value: v.defaultValue,
    };
  });

  ctx.output =
    Object.keys(display).length === 0
      ? 'No global variables have been set!'
      : JSON.stringify(display, null, 3);
});

// Add all supported API's
Object.entries(map).forEach(([apiName, methods]) => {
  cli.command(param(apiName), {
    desc: `The ${apiName} API`,
    setup: (setupArgs) => setupAPIs(setupArgs, apiName, methods),
  });
});

export { cli };
