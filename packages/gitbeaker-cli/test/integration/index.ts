/* eslint no-console: 0 */
import strip from 'strip-ansi';
import { exec } from 'child_process';
import { promisify } from 'util';
import { resolve } from 'path';
import pkg from '../../package.json';

const execP = promisify(exec);

function cli(cmd, options = {}) {
  const args = cmd.replace('gitbeaker', '').trim();
  const binary = resolve(__dirname, '..', '..', pkg.bin.gitbeaker);

  console.log(`node ${binary} ${args}`);
  console.log(options);

  return execP(`node ${binary} ${args}`, options);
}

describe('General', () => {
  it('should return the expose a gitbeaker commnad', async () => {
    expect(pkg.bin).toHaveProperty('gitbeaker');
  });
});

describe('gitbeaker -g -- CLI global Enviroment Variables', () => {
  it('should return an object of available gitbeaker cli environment variables', async () => {
    const { stdout } = await cli('gitbeaker -g');

    expect(strip(stdout)).toBe('No global variables have been set!\n');
  });

  it('should only have the personal token set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_TOKEN: 'gbfaketoken' },
    });

    expect(JSON.parse(stdout)['gb-token'].value).toBe('gbfaketoken');
  });

  it('should only have the personal token set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_TOKEN: 'glfaketoken' },
    });

    expect(JSON.parse(stdout)['gb-token'].value).toBe('glfaketoken');
  });

  it('should only have the oauth token set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_OAUTH_TOKEN: 'gboafaketoken' },
    });

    expect(JSON.parse(stdout)['gb-oauth-token'].value).toBe('gboafaketoken');
  });

  it('should only have the oauth token set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_OAUTH_TOKEN: 'gloafaketoken' },
    });

    expect(JSON.parse(stdout)['gb-oauth-token'].value).toBe('gloafaketoken');
  });

  it('should  only have the job token set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_JOB_TOKEN: 'gbjfaketoken' },
    });

    expect(JSON.parse(stdout)['gb-job-token'].value).toBe('gbjfaketoken');
  });

  it('should only have the job token set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_JOB_TOKEN: 'gljfaketoken' },
    });

    expect(JSON.parse(stdout)['gb-job-token'].value).toBe('gljfaketoken');
  });

  it('should only have the host set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_HOST: 'www.gbfakehost.com' },
    });

    expect(JSON.parse(stdout)['gb-host'].value).toBe('www.gbfakehost.com');
  });

  it('should only have the host set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_HOST: 'www.ghfakehost.com' },
    });

    expect(JSON.parse(stdout)['gb-host'].value).toBe('www.ghfakehost.com');
  });

  it('should only have the version set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_VERSION: '4' },
    });

    expect(JSON.parse(stdout)['gb-version'].value).toBe(4);
  });

  it('should only have the version set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_VERSION: '4' },
    });

    expect(JSON.parse(stdout)['gb-version'].value).toBe(4);
  });

  it('should only have sudo set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_SUDO: 'gbsudoaccount' },
    });

    expect(JSON.parse(stdout)['gb-sudo'].value).toBe('gbsudoaccount');
  });

  it('should only have sudo set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_SUDO: 'glsudoaccount' },
    });

    expect(JSON.parse(stdout)['gb-sudo'].value).toBe('glsudoaccount');
  });

  it('should only have the camelize set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_CAMELIZE: 'true' },
    });

    expect(JSON.parse(stdout)['gb-camelize'].value).toBe(true);
  });

  it('should only have the camelize set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_CAMELIZE: 'true' },
    });

    expect(JSON.parse(stdout)['gb-camelize'].value).toBe(true);
  });

  it('should only have the profile token set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_PROFILE_TOKEN: 'gbptoken' },
    });

    expect(JSON.parse(stdout)['gb-profile-token'].value).toBe('gbptoken');
  });

  it('should only have the profile token set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_PROFILE_TOKEN: 'glptoken' },
    });

    expect(JSON.parse(stdout)['gb-profile-token'].value).toBe('glptoken');
  });

  it('should only have the profile mode set', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITBEAKER_PROFILE_MODE: 'gbpmode' },
    });

    expect(JSON.parse(stdout)['gb-profile-mode'].value).toBe('gbpmode');
  });

  it('should only have the profile mode set by alias', async () => {
    const { stdout } = await cli('gitbeaker -g', {
      env: { ...process.env, GITLAB_PROFILE_MODE: 'glpmode' },
    });

    expect(JSON.parse(stdout)['gb-profile-mode'].value).toBe('glpmode');
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
    const output = await cli('gitbeaker projects create --name="Project Creation CLI test1"', {
      env: {
        ...process.env,
        GITBEAKER_HOST: process.env.GITLAB_URL,
        GITBEAKER_TOKEN: process.env.PERSONAL_ACCESS_TOKEN,
      },
    });

    const { stdout } = output;

    expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test1');
  });

  it('should create a valid project using configuration passed in arguments', async () => {
    const output = await cli(
      `gitbeaker projects create --gl-token=${process.env.PERSONAL_ACCESS_TOKEN} --gb-host=${process.env.GITLAB_URL} --name="Project Creation CLI test2"`,
    );

    const { stdout } = output;

    console.log(output);

    expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test2');
  });

  it('should create a valid project using configuration passed in arguments and defined in the environment variables', async () => {
    process.env.GITLAB_HOST = process.env.GITLAB_URL;

    const { stdout } = await cli(
      `
      gitbeaker projects create --gb-token=${process.env.PERSONAL_ACCESS_TOKEN} --name="Project Creation CLI test3"`,
      {
        env: {
          ...process.env,
          GITLAB_HOST: process.env.GITLAB_URL,
        },
      },
    );

    expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test3');
  });

  it('should create a valid project using configuration passed in arguments, overriding those defined in the environment variables', async () => {
    const { stdout } = await cli(
      `
      gitbeaker projects create --gb-host=${process.env.GITLAB_URL} --gb-token=${process.env.PERSONAL_ACCESS_TOKEN} --name="Project Creation CLI test4"`,
      {
        env: {
          ...process.env,
          GITLAB_TOKEN: 'faketoken',
        },
      },
    );

    expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test4');
  });
});

describe('gitbeaker projects all', () => {
  it('should create a valid project using configuration from environment variables', async () => {
    const env = {
      ...process.env,
      GITBEAKER_HOST: process.env.GITLAB_URL,
      GITBEAKER_TOKEN: process.env.PERSONAL_ACCESS_TOKEN,
    };

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
