import * as pkg from '../../package.json';

jest.mock('@gitbeaker/core', () => ({
  ...jest.requireActual('@gitbeaker/core'),
  getAPIMap: jest.fn(() => ({
    Projects: [
      {
        name: 'constructor',
        args: [
          'token',
          'jobToken',
          'oauthToken',
          'sudo',
          'profileToken',
          'requesterFn',
          'profileMode',
          'host',
          'prefixUrl',
          'version',
          'camelize',
          'rejectUnauthorized',
          'requestTimeout',
        ],
      },
      {
        name: 'all',
        args: [],
      },
      {
        name: 'create',
        args: [],
      },
    ],
  })),
}));
jest.mock('@gitbeaker/node');
jest.mock('ora', () => ({
  start: () => ({
    success: jest.fn(),
    fail: jest.fn(),
  }),
}));

const OLD_ENV = process.env;
let Projects;

beforeEach(async () => {
  jest.resetModules();

  // eslint-disable-next-line
  ({ Projects } = await import('@gitbeaker/node'));

  process.env = { ...OLD_ENV };
});

afterEach(() => {
  process.env = OLD_ENV;
});

describe('General', () => {
  it('should return the expose a gitbeaker commnad', () => {
    expect(pkg.bin).toHaveProperty('gitbeaker');
  });
});

describe('gitbeaker -g -- CLI global Enviroment Variables', () => {
  it('should return an object of available gitbeaker cli.parse environment variables -- --global-args alias', async () => {
    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(output).toBe('No global variables have been set!');
  });

  it('should return an object of available gitbeaker cli.parse environment variables -- -g alias', async () => {
    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(output).toBe('No global variables have been set!');
  });

  it('should only have the personal token set', async () => {
    process.env.GITBEAKER_TOKEN = 'token1';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-token'].value).toBe('token1');
  });

  it('should only have the personal token set by alias', async () => {
    process.env.GITLAB_TOKEN = 'glfaketoken';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-token'].value).toBe('glfaketoken');
  });

  it('should only have the oauth token set', async () => {
    process.env.GITBEAKER_OAUTH_TOKEN = 'gboafaketoken';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-oauth-token'].value).toBe('gboafaketoken');
  });

  it('should only have the oauth token set by alias', async () => {
    process.env.GITLAB_OAUTH_TOKEN = 'gloafaketoken';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-oauth-token'].value).toBe('gloafaketoken');
  });

  it('should  only have the job token set', async () => {
    process.env.GITBEAKER_JOB_TOKEN = 'gbjfaketoken';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-job-token'].value).toBe('gbjfaketoken');
  });

  it('should only have the job token set by alias', async () => {
    process.env.GITLAB_JOB_TOKEN = 'gljfaketoken';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-job-token'].value).toBe('gljfaketoken');
  });

  it('should only have the host set', async () => {
    process.env.GITBEAKER_HOST = 'www.gbfakehost.com';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-host'].value).toBe('www.gbfakehost.com');
  });

  it('should only have the host set by alias', async () => {
    process.env.GITLAB_HOST = 'www.ghfakehost.com';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-host'].value).toBe('www.ghfakehost.com');
  });

  it('should only have the version set', async () => {
    process.env.GITBEAKER_VERSION = '4';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-version'].value).toBe(4);
  });

  it('should only have the version set by alias', async () => {
    process.env.GITLAB_VERSION = '4';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-version'].value).toBe(4);
  });

  it('should only have sudo set', async () => {
    process.env.GITBEAKER_SUDO = 'gbsudoaccount';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-sudo'].value).toBe('gbsudoaccount');
  });

  it('should only have sudo set by alias', async () => {
    process.env.GITLAB_SUDO = 'glsudoaccount';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-sudo'].value).toBe('glsudoaccount');
  });

  it('should only have the camelize set', async () => {
    process.env.GITBEAKER_CAMELIZE = 'true';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-camelize'].value).toBe(true);
  });

  it('should only have the camelize set by alias', async () => {
    process.env.GITLAB_CAMELIZE = 'true';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-camelize'].value).toBe(true);
  });

  it('should only have the profile token set', async () => {
    process.env.GITBEAKER_PROFILE_TOKEN = 'gbptoken';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-profile-token'].value).toBe('gbptoken');
  });

  it('should only have the profile token set by alias', async () => {
    process.env.GITLAB_PROFILE_TOKEN = 'glptoken';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-profile-token'].value).toBe('glptoken');
  });

  it('should only have the profile mode set', async () => {
    process.env.GITBEAKER_PROFILE_MODE = 'gbpmode';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-profile-mode'].value).toBe('gbpmode');
  });

  it('should only have the profile mode set by alias', async () => {
    process.env.GITLAB_PROFILE_MODE = 'glpmode';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-profile-mode'].value).toBe('glpmode');
  });
});

describe('gitbeaker -v -- Package Version', () => {
  it('should return the current version number of the package', async () => {
    // eslint-disable-next-line
    const { cli } = require('../../src/cli');
    const { output } = await cli.parse('-v');

    expect(output).toBe(pkg.version);
  });
});

describe('gitbeaker projects create', () => {
  it('should create a valid project using configuration from environment variables', async () => {
    process.env.GITBEAKER_HOST = 'host';
    process.env.GITBEAKER_TOKEN = 'token';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');

    await cli.parse('projects create --name="Project Creation CLI test"');

    expect(Projects).toHaveBeenCalledWith({
      host: 'host',
      token: 'token',
      camelize: false,
    });

    expect(Projects.mock.instances[0].create).toHaveBeenCalledWith({
      name: 'Project Creation CLI test',
    });
  });

  it('should create a valid project using configuration passed in arguments', async () => {
    // eslint-disable-next-line
    const { cli } = require('../../src/cli');

    await cli.parse(
      'projects create --gb-token=token1 --gb-host=host1 --name="Project Creation CLI test1"',
    );

    expect(Projects).toHaveBeenCalledWith({
      host: 'host1',
      token: 'token1',
      camelize: false,
    });

    expect(Projects.mock.instances[0].create).toHaveBeenCalledWith({
      name: 'Project Creation CLI test1',
    });
  });

  it('should create a valid project using configuration passed in arguments and defined in the environment variables', async () => {
    process.env.GITBEAKER_HOST = 'host2';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');

    await cli.parse('projects create --gb-token=token2 --name="Project Creation CLI test2"');

    expect(Projects).toHaveBeenCalledWith({
      host: 'host2',
      token: 'token2',
      camelize: false,
    });

    expect(Projects.mock.instances[0].create).toHaveBeenCalledWith({
      name: 'Project Creation CLI test2',
    });
  });

  it('should create a valid project using configuration passed in arguments, overriding those defined in the environment variables', async () => {
    process.env.GITBEAKER_HOST = 'host';
    process.env.GITBEAKER_TOKEN = 'token';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');

    await cli.parse(
      'projects create --gb-token=token3  --gb-host=host3 --name="Project Creation CLI test3"',
    );

    expect(Projects).toHaveBeenCalledWith({
      host: 'host3',
      token: 'token3',
      camelize: false,
    });

    expect(Projects.mock.instances[0].create).toHaveBeenCalledWith({
      name: 'Project Creation CLI test3',
    });
  });
});

describe('gitbeaker projects all', () => {
  it('should create a valid project using configuration from environment variables', async () => {
    process.env.GITBEAKER_HOST = 'host';
    process.env.GITBEAKER_TOKEN = 'token';

    // eslint-disable-next-line
    const { cli } = require('../../src/cli');

    await cli.parse('projects all --simple=true');

    expect(Projects.mock.instances[0].all).toHaveBeenCalledWith({
      simple: 'true',
    });
  });
});
