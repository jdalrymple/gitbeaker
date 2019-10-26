#!/usr/bin/env node
import 'dotenv';
import { camelizeKeys } from 'xcase';
import { param, constant } from 'change-case';
import program from 'yargs';
import * as core from '../core';
import pkg from '../../package.json';

// Add default options
program
  .alias('v', 'version')
  .version(pkg.version)
  .describe('v', 'Show version information')

  .alias('h', 'help')
  .help('help')
  .showHelpOnFail(false, 'Specify --help for available options');

// Add all supported API's
const map = require('../../dist/map.json') || {};

Object.entries(map).forEach(([name, methods]: [string, { name: string; args: string[] }[]]) => {
  const baseArgs: string[] = methods[0].args;

  program.command(param(name), `The ${name} API`, cmdYargs => {
    cmdYargs
      .option('gl-token', { describe: 'Your Gitlab Personal Token', type: 'string' })
      .option('gl-oauth-token', { describe: 'Your Gitlab OAuth Token', type: 'string' })
      .option('gl-job-token', { describe: 'Your Gitlab Job Token', type: 'string' })
      .option('gl-host', {
        describe: 'Your Gitlab API host (Defaults to https://www.gitlab.com)',
        type: 'string',
      })
      .option('gl-version', {
        describe: 'The targetted Gitlab API version (Defaults to v4)',
        type: 'number',
      })
      .option('gl-sudo', { type: 'string' })
      .option('gl-camelize', { type: 'boolean' })
      .option('gl-profile-token', { type: 'string' })
      .option('gl-profile-mode', { type: 'string' });

    for (let i = 1; i < methods.length; i += 1) {
      const m = methods[i];

      cmdYargs.command(
        param(m.name),
        '',
        subCmdYargs => {
          m.args.forEach(arg => {
            if (arg === 'options') return;

            subCmdYargs.option(`${param(arg)}`, {
              demandOption: true,
            });
          });

          return subCmdYargs;
        },
        args => {
          const casedArgs = camelizeKeys(args);
          const coreArgs = {};
          const optionalArgs = {};
          const initArgs = {};

          for (const [name, value] of Object.entries(casedArgs)) {
            const baseOption = baseArgs.find(x => x === name.replace('gl-', ''));

            if (baseOption) {
              initArgs[baseOption] = value || process.env[`GITLAB_${constant(baseOption)}`];
            } else if (m.args.includes(name)) coreArgs[name] = value;
            else optionalArgs[name] = value;
          }

          // Create service
          const s = new core[name](initArgs);

          // Execute function
          return s[m.name](...Object.values(coreArgs), optionalArgs);
        },
      );
    }

    return cmdYargs;
  });
});

program.epilog('Copyright 2019').argv;
