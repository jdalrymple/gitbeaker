import pkg from '../../package.json';

jest.mock('@gitbeaker/rest');

const OLD_ENV = process.env;
let Projects;

beforeEach(async () => {
  jest.resetModules();

  ({ Projects } = await import('@gitbeaker/rest'));

  process.env = { ...OLD_ENV };
});

afterEach(() => {
  process.env = OLD_ENV;
});

describe('gitbeaker -v -- Package Version', () => {
  it('should return the current version number of the package', async () => {
    const { cli } = await import('../../src/cli');
    const { output } = await cli.parse('-v');

    expect(output).toBe(pkg.version);
  });
});

describe('gitbeaker -g -- CLI global Enviroment Variables', () => {
  it('should return an object of available gitbeaker cli.parse environment variables -- --global-args alias', async () => {
    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(output).toBe('No global variables have been set!');
  });

  it('should return an object of available gitbeaker cli.parse environment variables -- -g alias', async () => {
    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(output).toBe('No global variables have been set!');
  });

  it('should only have the personal token set', async () => {
    process.env.GITBEAKER_TOKEN = 'token1';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-token'].value as string).toBe('token1');
  });

  it('should only have the personal token set by alias', async () => {
    process.env.GITLAB_TOKEN = 'glfaketoken';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-token'].value as string).toBe('glfaketoken');
  });

  it('should only have the oauth token set', async () => {
    process.env.GITBEAKER_OAUTH_TOKEN = 'gboafaketoken';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-oauth-token'].value as string).toBe('gboafaketoken');
  });

  it('should only have the oauth token set by alias', async () => {
    process.env.GITLAB_OAUTH_TOKEN = 'gloafaketoken';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-oauth-token'].value as string).toBe('gloafaketoken');
  });

  it('should  only have the job token set', async () => {
    process.env.GITBEAKER_JOB_TOKEN = 'gbjfaketoken';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-job-token'].value as string).toBe('gbjfaketoken');
  });

  it('should only have the job token set by alias', async () => {
    process.env.GITLAB_JOB_TOKEN = 'gljfaketoken';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-job-token'].value as string).toBe('gljfaketoken');
  });

  it('should only have the host set', async () => {
    process.env.GITBEAKER_HOST = 'www.gbfakehost.com';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-host'].value as string).toBe('www.gbfakehost.com');
  });

  it('should only have the host set by alias', async () => {
    process.env.GITLAB_HOST = 'www.ghfakehost.com';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-host'].value as string).toBe('www.ghfakehost.com');
  });

  it('should only have sudo set', async () => {
    process.env.GITBEAKER_SUDO = 'gbsudoaccount';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-sudo'].value as string).toBe('gbsudoaccount');
  });

  it('should only have sudo set by alias', async () => {
    process.env.GITLAB_SUDO = 'glsudoaccount';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-sudo'].value as string).toBe('glsudoaccount');
  });

  it('should only have the camelize set', async () => {
    process.env.GITBEAKER_CAMELIZE = 'true';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-camelize'].value as string).toBe('true');
  });

  it('should only have the camelize set by alias', async () => {
    process.env.GITLAB_CAMELIZE = 'true';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-camelize'].value as string).toBe('true');
  });

  it('should only have the profile token set', async () => {
    process.env.GITBEAKER_PROFILE_TOKEN = 'gbptoken';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-profile-token'].value as string).toBe('gbptoken');
  });

  it('should only have the profile token set by alias', async () => {
    process.env.GITLAB_PROFILE_TOKEN = 'glptoken';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-profile-token'].value as string).toBe('glptoken');
  });

  it('should only have the profile mode set', async () => {
    process.env.GITBEAKER_PROFILE_MODE = 'gbpmode';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-profile-mode'].value as string).toBe('gbpmode');
  });

  it('should only have the profile mode set by alias', async () => {
    process.env.GITLAB_PROFILE_MODE = 'glpmode';

    const { cli } = await import('../../src/cli');
    const { output }: { output: string } = await cli.parse('-g');

    expect(JSON.parse(output)['gb-profile-mode'].value as string).toBe('glpmode');
  });
});

describe('gitbeaker projects create -- CLI resource', () => {
  it('should create a valid project using configuration from environment variables', async () => {
    process.env.GITBEAKER_HOST = 'host';
    process.env.GITBEAKER_TOKEN = 'token';

    const { cli } = await import('../../src/cli');

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
    const { cli } = await import('../../src/cli');

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

    const { cli } = await import('../../src/cli');

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

    const { cli } = await import('../../src/cli');

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
