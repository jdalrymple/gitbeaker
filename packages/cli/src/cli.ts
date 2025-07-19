import Chalk from 'chalk';
import Sywac from 'sywac';
import * as Gitbeaker from '@gitbeaker/rest';
import API_MAP from '@gitbeaker/core/map.json' with { type: 'json' }; // eslint-disable-line import/no-unresolved
import {
  buildArgumentObjects,
  getCLISafeNormalizedTerm,
  getDisplayConfig,
  getExposedAPIs,
  getGlobalConfig,
} from './utils';
import type { MethodTemplate } from './utils';

function setupAPIMethods(setupArgs, methodArgs: string[]) {
  methodArgs.forEach((name) => {
    setupArgs.positional(
      `[--${getCLISafeNormalizedTerm(name)}] <${getCLISafeNormalizedTerm(name)}>`,
      {
        group: 'Required Options',
        type: 'string',
      },
    );
  });

  return setupArgs;
}

function runAPIMethod(ctx, args: Record<string, string>, apiName: string, method: MethodTemplate) {
  const globalConfig = getGlobalConfig();

  const { initArgs, coreArgs, optionalArgs } = buildArgumentObjects(globalConfig, method, args);

  // Create service
  const s = new Gitbeaker[apiName](initArgs);

  // Execute function
  return s[method.name](...Object.values(coreArgs), optionalArgs).then((r) => {
    ctx.output = JSON.stringify(r, null, 3);
  });
}

function setupAPIs(setupArgs, apiName: string, methods: MethodTemplate[]) {
  const globalConfig = getGlobalConfig();

  Object.entries(globalConfig).forEach(([k, v]) => {
    setupArgs.option(`--${k} <value>`, {
      group: 'Base Options',
      ...v,
    });
  });

  for (let i = 0; i < methods.length; i += 1) {
    const method = methods[i];

    setupArgs.command(getCLISafeNormalizedTerm(method.name), {
      setup: (setupMethodArgs) => setupAPIMethods(setupMethodArgs, method.args),
      run: (args: Record<string, string>, ctx) => runAPIMethod(ctx, args, apiName, method),
    });
  }

  return setupArgs;
}

// Add default settings
// Styling settings
const commandStyle = Chalk.hex('#e34329').bold;
const groupStyle = Chalk.hex('#fca325').bold;
const usageStyle = Chalk.hex('#fc6e26').bold;
const optionStyle = Chalk.white.bold;
const descriptionStyle = Chalk.hex('#848484');
const hintStyle = Chalk.hex('#6a5f88');

const cli = Sywac.version('-v, --version')
  .help('-h, --help')
  .showHelpByDefault()
  .epilogue(`Copyright ${new Date().getFullYear()}`)
  .style({
    usagePrefix: (s: string) => usageStyle(s),
    group: (s: string) => groupStyle(s),
    usageCommandPlaceholder: (s: string) => commandStyle(s),
    flags: (s: string) => optionStyle(s),
    usageOptionsPlaceholder: (s: string) => optionStyle(s),
    desc: (s: string) => descriptionStyle(s),
    hints: (s: string) => hintStyle(s),
  });

// Add Global commands
cli.boolean('-g --global-args', {
  desc: 'Show global arguments currently set in the environment variables',
});

cli.command('*', (argv, ctx) => {
  if (!argv.g) return;

  const globalConfig = getGlobalConfig();
  const display = getDisplayConfig(globalConfig);

  ctx.output =
    Object.keys(display).length === 0
      ? 'No global variables have been set!'
      : JSON.stringify(display, null, 3);
});

// Add all supported API's
const exposedAPIs = getExposedAPIs(API_MAP as Record<string, MethodTemplate[]>);

Object.entries(exposedAPIs).forEach(([apiName, methods]) => {
  cli.command(getCLISafeNormalizedTerm(apiName), {
    desc: `The ${apiName} API`,
    setup: (setupArgs) => setupAPIs(setupArgs, apiName, methods),
  });
});

export { cli };
