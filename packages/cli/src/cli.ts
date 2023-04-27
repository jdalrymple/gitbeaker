import Chalk from 'chalk';
import Sywac from 'sywac';
import { camelize, decamelize, depascalize } from 'xcase';
import * as Gitbeaker from '@gitbeaker/rest';
import API_MAP from '@gitbeaker/core/map.json' assert { type: 'json' }; // eslint-disable-line import/no-unresolved

// Styling settings
const commandStyle = Chalk.hex('#e34329').bold;
const groupStyle = Chalk.hex('#fca325').bold;
const usageStyle = Chalk.hex('#fc6e26').bold;
const optionStyle = Chalk.white.bold;
const descriptionStyle = Chalk.hex('#848484');
const hintStyle = Chalk.hex('#6a5f88');

interface MethodTemplate {
  name: string;
  args: string[];
}

// Globally configurable arguments
function normalizeEnviromentVariables(env): Record<string, string> {
  const normalized = { ...env };
  const suffixes = [
    'TOKEN',
    'OAUTH_TOKEN',
    'JOB_TOKEN',
    'HOST',
    'SUDO',
    'CAMELIZE',
    'REQUEST_TIMEOUT',
    'PROFILE_TOKEN',
    'PROFILE_MODE',
  ];

  suffixes.forEach((s) => {
    if (normalized[`GITLAB_${s}`] && !normalized[`GITBEAKER_${s}`]) {
      normalized[`GITBEAKER_${s}`] = normalized[`GITLAB_${s}`];
    }
  });

  return normalized;
}

function globalConfig(env = process.env): { [name: string]: Sywac.Options } {
  const normalEnv = normalizeEnviromentVariables(env);

  return {
    'gb-token': {
      alias: 'gl-token',
      desc: 'Your Gitlab Personal Token',
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_TOKEN,
    },
    'gb-oauth-token': {
      alias: 'gl-oauth-token',
      desc: 'Your Gitlab OAuth Token',
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_OAUTH_TOKEN,
    },
    'gb-job-token': {
      alias: 'gl-job-token',
      desc: 'Your Gitlab Job Token',
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_JOB_TOKEN,
    },
    'gb-host': {
      alias: 'gl-host',
      desc: 'Your Gitlab API host (Defaults to https://www.gitlab.com)',
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_HOST,
    },
    'gb-sudo': {
      alias: 'gl-sudo',
      desc: '[Sudo](https://docs.gitlab.com/ee/api/#sudo) query parameter',
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_SUDO,
    },
    'gb-camelize': {
      alias: 'gl-camelize',
      desc: 'Camelizes all response body keys',
      type: 'boolean',
      defaultValue: normalEnv.GITBEAKER_CAMELIZE,
    },
    'gb-request-timeout': {
      alias: 'gl-request-timeout',
      desc: 'Timeout for API requests. Measured in ms',
      type: 'number',
      defaultValue:
        normalEnv.GITBEAKER_REQUEST_TIMEOUT && parseInt(normalEnv.GITBEAKER_REQUEST_TIMEOUT, 10),
    },
    'gb-profile-token': {
      alias: 'gl-profile-token',
      desc: '[Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html)',
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_PROFILE_TOKEN,
    },
    'gb-profile-mode': {
      alias: 'gl-profile-mode',
      desc: '[Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html)',
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_PROFILE_MODE,
    },
  };
}

// Options to be ignored when making an API call
const ignoreOptions = ['_', '$0', 'v', 'version', 'h', 'help', 'g', 'global-args'];

// Helper function to param case strings
function param(value: string): string {
  let cleaned = value;

  // Handle exceptions
  const exceptions = [
    'GitLabCI',
    'YML',
    'GPG',
    'SSH',
    'IId',
    'NPM',
    'NuGet',
    'DORA4',
    'LDAP',
    'CICD',
    'SAML',
    'SCIM',
    'PyPI',
  ];

  exceptions
    .filter((e) => value.includes(e))
    .forEach((ex) => {
      cleaned = cleaned.replace(ex, ex.charAt(0).toUpperCase() + ex.slice(1).toLowerCase());
    });

  // Decamelize
  const decamelized = decamelize(cleaned, '-');

  return decamelized !== cleaned ? decamelized : depascalize(cleaned, '-');
}

function setupAPIMethods(setupArgs, methodArgs: string[]) {
  methodArgs.forEach((name) => {
    if (typeof name !== 'string') return;

    setupArgs.positional(`[--${param(name)}] <${param(name)}>`, {
      group: 'Required Options',
      type: 'string',
    });
  });

  return setupArgs;
}

function runAPIMethod(ctx, args: Record<string, string>, apiName: string, method: MethodTemplate) {
  const coreArgs = {};
  const optionalArgs = {};
  const initArgs = {};

  Object.entries(args).forEach(([argName, value]) => {
    if (ignoreOptions.includes(argName) || value == null) return;

    const camelCased: string = camelize(argName.replace('gb-', '').replace('gl-', ''), '-');

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

function setupAPIs(setupArgs, apiName: string, methods: MethodTemplate[]) {
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
      run: (args: Record<string, string>, ctx) => runAPIMethod(ctx, args, apiName, method),
    });
  }

  return setupArgs;
}

// Add default settings
const cli = Sywac.version('-v, --version')
  .help('-h, --help')
  .showHelpByDefault()
  .epilogue('Copyright 2023')
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
  desc: 'Show global arguments currently set in the environment variables',
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
Object.entries(API_MAP as Record<string, MethodTemplate[]>).forEach(([apiName, methods]) => {
  // Skip Gitlab export
  if (apiName === 'Gitlab') return;

  cli.command(param(apiName), {
    desc: `The ${apiName} API`,
    setup: (setupArgs) => setupAPIs(setupArgs, apiName, methods),
  });
});

export { cli };
