import { camelize, decamelize } from 'xcase';
import type { Options as SywacOptions } from 'sywac';

export interface MethodTemplate {
  name: string;
  args: string[];
}

export interface GlobalCLIConfig {
  [name: string]: SywacOptions;
}

const NORMALIZED_EXCEPTION_TERMS: Record<string, string> = [
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
].reduce((prev, cur) => {
  return { ...prev, [cur]: cur.charAt(0).toUpperCase() + cur.slice(1).toLowerCase() };
}, {});

export function getCLISafeNormalizedTerm(term: string): string {
  if (term.length === 0) return term;

  let normalized = term;

  // Handle exceptions
  Object.entries(NORMALIZED_EXCEPTION_TERMS)
    .filter(([k]) => term.includes(k))
    .forEach(([k, v]) => {
      normalized = normalized.replace(k, v);
    });

  // Convert from pascalcase to camelcase
  normalized = normalized.charAt(0).toLowerCase() + normalized.slice(1);

  return decamelize(normalized, '-');
}

export function getAPISafeNormalizedTerm(term: string): string {
  if (term.length === 0) return term;

  let normalized = camelize(term.replace(/(gb|gl)-/g, ''), '-');

  // Handle exceptions
  Object.entries(NORMALIZED_EXCEPTION_TERMS)
    .filter(([, v]) => normalized.includes(v))
    .forEach(([k, v]) => {
      normalized = normalized.replace(v, k);
    });

  return normalized;
}

export function normalizeEnvVariables(env: NodeJS.ProcessEnv): Record<string, string> {
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

    const term = argName.replace('gl-', 'gb-');
    const normalized: string = getAPISafeNormalizedTerm(term);

    if (globalConfig[term]) {
      initArgs[normalized] = value;
    } else if (method.args.includes(normalized)) coreArgs[normalized] = value;
    else optionalArgs[normalized] = value;
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
  const normalEnv = normalizeEnvVariables(env);

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
      desc: 'Sudo query parameter - https://docs.gitlab.com/api/#sudo',
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
      desc: `Requests Profiles Token - https://docs.gitlab.com/administration/monitoring/performance/request_profiling.html`,
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_PROFILE_TOKEN,
    },
    'gb-profile-mode': {
      alias: 'gl-profile-mode',
      desc: 'Requests Profiles Token - https://docs.gitlab.com/administration/monitoring/performance/request_profiling.html',
      type: 'string',
      defaultValue: normalEnv.GITBEAKER_PROFILE_MODE,
    },
  };
}

export function getExposedAPIs(map: Record<string, MethodTemplate[]>) {
  // Exclude Gitlab resource and constants from exposure
  const { Gitlab, AccessLevel, ...exposed } = map;

  return exposed;
}
