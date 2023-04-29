import { camelize, decamelize, depascalize } from 'xcase';
import type { Options as SywacOptions } from 'sywac';

export interface MethodTemplate {
  name: string;
  args: string[];
}

export interface GlobalCLIConfig {
  [name: string]: SywacOptions;
}

export function param(value: string): string {
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

export function normalizeEnviromentVariables(env: NodeJS.ProcessEnv): Record<string, string> {
  const normalized = {};
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
    if (env[`GITLAB_${s}`]) normalized[`GITBEAKER_${s}`] = env[`GITLAB_${s}`];
    if (env[`GITBEAKER_${s}`]) normalized[`GITBEAKER_${s}`] = env[`GITBEAKER_${s}`];
  });

  return normalized;
}

export function buildArgumentObjects(
  globalConfig: GlobalCLIConfig,
  method: MethodTemplate,
  rawArgs: Record<string, string>,
) {
  // Options to be ignored when making an API call
  const ignoreOptions = ['_', '$0', 'v', 'version', 'h', 'help', 'g', 'global-args'];
  const coreArgs = {};
  const optionalArgs = {};
  const initArgs = {};

  Object.entries(rawArgs).forEach(([argName, value]) => {
    if (ignoreOptions.includes(argName) || value == null) return;

    const camelCased: string = camelize(argName.replace('gb-', '').replace('gl-', ''), '-');

    if (globalConfig[argName.replace('gl-', 'gb-')]) {
      initArgs[camelCased] = value;
    } else if (method.args.includes(camelCased)) coreArgs[camelCased] = value;
    else optionalArgs[camelCased] = value;
  });

  return {
    initArgs,
    coreArgs,
    optionalArgs,
  };
}

export function getDisplayConfig(globalConfig: GlobalCLIConfig) {
  const display = {};

  Object.entries(globalConfig).forEach(([k, v]) => {
    if (v.defaultValue == null) return;

    display[k] = {
      alias: v.alias,
      description: v.desc,
      value: v.defaultValue,
    };
  });

  return display;
}

export function getGlobalConfig(env = process.env): GlobalCLIConfig {
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

export function getExposedAPIs(map: Record<string, MethodTemplate[]>) {
  // Exclude Gitlab resource from exposure
  const { Gitlab, ...expose } = map;

  return expose;
}
