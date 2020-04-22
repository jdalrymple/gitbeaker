/* eslint no-console: 0 */
import { exec } from 'child_process';
import { promisify } from 'util';
import { resolve } from 'path';
import strip from 'strip-ansi';
import pkg from '../../package.json';

const execP = promisify(exec);
let env: Record<string, string | undefined> = {};

function cli(cmd, options = {}) {
  const name = cmd.split(' ').shift();
  const args = cmd.replace(name, '').trim();
  const binary = resolve(pkg.bin[name]);

  expect(pkg.bin).toHaveProperty(name);

  return execP(`node ${binary} ${args}`, options);
}

beforeEach(() => {
  env = {};
});

describe('gitbeaker -g -- CLI global Enviroment Variables', () => {
  it('should return an object of available gitbeaker cli environment variables', async () => {
    const { stdout } = await cli('gitbeaker -g', { env });

    expect(strip(stdout)).toBe('No global variables have been set!\n');
  });

  it('should only have the personal token set', async () => {
    env.GITBEAKER_TOKEN = 'faketoken';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-token'].value).toBe('faketoken');
  });

  it('should only have the personal token set by alias', async () => {
    env.GITLAB_TOKEN = 'faketoken';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-token'].value).toBe('faketoken');
  });

  it('should only have the oauth token set', async () => {
    env.GITBEAKER_OAUTH_TOKEN = 'faketoken';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-oauth-token'].value).toBe('faketoken');
  });

  it('should only have the oauth token set by alias', async () => {
    env.GITLAB_OAUTH_TOKEN = 'faketoken';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-oauth-token'].value).toBe('faketoken');
  });

  it('should  only have the job token set', async () => {
    env.GITBEAKER_JOB_TOKEN = 'faketoken';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-job-token'].value).toBe('faketoken');
  });

  it('should only have the job token set by alias', async () => {
    env.GITLAB_JOB_TOKEN = 'faketoken';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-job-token'].value).toBe('faketoken');
  });

  it('should only have the host set', async () => {
    env.GITBEAKER_HOST = 'www.fakehost.com';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-host'].value).toBe('www.fakehost.com');
  });

  it('should only have the host set by alias', async () => {
    env.GITLAB_HOST = 'www.fakehost.com';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-host'].value).toBe('www.fakehost.com');
  });

  it('should only have the version set', async () => {
    env.GITBEAKER_VERSION = '4';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-version'].value).toBe(4);
  });

  it('should only have the version set by alias', async () => {
    env.GITLAB_VERSION = '4';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-version'].value).toBe(4);
  });

  it('should only have sudo set', async () => {
    env.GITBEAKER_SUDO = 'sudoaccount';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-sudo'].value).toBe('sudoaccount');
  });

  it('should only have sudo set by alias', async () => {
    env.GITLAB_SUDO = 'sudoaccount';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-sudo'].value).toBe('sudoaccount');
  });

  it('should only have the camelize set', async () => {
    env.GITBEAKER_CAMELIZE = 'true';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-camelize'].value).toBe(true);
  });

  it('should only have the camelize set by alias', async () => {
    env.GITLAB_CAMELIZE = 'true';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-camelize'].value).toBe(true);
  });

  it('should only have the profile token set', async () => {
    env.GITBEAKER_PROFILE_TOKEN = 'faketoken';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-profile-token'].value).toBe('faketoken');
  });

  it('should only have the profile token set by alias', async () => {
    env.GITLAB_PROFILE_TOKEN = 'faketoken';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-profile-token'].value).toBe('faketoken');
  });

  it('should only have the profile mode set', async () => {
    env.GITBEAKER_PROFILE_MODE = 'mode1';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-profile-mode'].value).toBe('mode1');
  });

  it('should only have the profile mode set by alias', async () => {
    env.GITLAB_PROFILE_MODE = 'mode1';

    const { stdout } = await cli('gitbeaker -g', { env });

    expect(JSON.parse(stdout)['gb-profile-mode'].value).toBe('mode1');
  });
});

describe('gitbeaker -v -- Package Version', () => {
  it('should return the current version number of the package', async () => {
    const { stdout } = await cli('gitbeaker -v');

    expect(stdout.trim()).toBe(pkg.version);
  });
});

describe('gitbeaker projects create', () => {
  it('should create a valid project using configuration from environment variables', async () => {
    env.GITBEAKER_HOST = process.env.GITLAB_URL;
    env.GITBEAKER_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;

    const { stdout } = await cli('gitbeaker projects create --name="Project Creation CLI test1"', {
      env,
    });

    expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test1');
  });

  it('should create a valid project using configuration passed in arguments', async () => {
    const { stdout } = await cli(
      `gitbeaker projects create --gl-token=${process.env.PERSONAL_ACCESS_TOKEN} --gl-host=${process.env.GITLAB_URL} --name="Project Creation CLI test2"`,
      {
        env: process.env,
      },
    );

    expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test2');
  });

  it('should create a valid project using configuration passed in arguments and defined in the environment variables', async () => {
    process.env.GITLAB_HOST = process.env.GITLAB_URL;

    const { stdout } = await cli(
      `
      gitbeaker projects create --gl-token=${process.env.PERSONAL_ACCESS_TOKEN} --name="Project Creation CLI test3"`,
      {
        env: process.env,
      },
    );

    expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test3');
  });

  it('should create a valid project using configuration passed in arguments, overriding those defined in the environment variables', async () => {
    process.env.GITLAB_TOKEN = 'faketoken';

    const { stdout } = await cli(
      `
      gitbeaker projects create --gl-host=${process.env.GITLAB_URL} --gl-token=${process.env.PERSONAL_ACCESS_TOKEN} --name="Project Creation CLI test4"`,
      {
        env: process.env,
      },
    );

    expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test4');
  });
});

describe('gitbeaker projects all', () => {
  it('should create a valid project using configuration from environment variables', async () => {
    env.GITBEAKER_HOST = process.env.GITLAB_URL;
    env.GITBEAKER_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;

    // Create a project first
    await cli('gitbeaker projects create --name="Project Creation CLI all1"', {
      env,
    });

    // Get all projects
    const { stdout } = await cli('gitbeaker projects all --simple=true', {
      env,
    });

    const found = JSON.parse(stdout).some((p) => p.name === 'Project Creation CLI all1');

    expect(found).toBeTruthy();
  });
});
