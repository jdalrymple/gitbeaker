import { exec } from 'child_process';
import { promisify } from 'util';
import strip from 'strip-ansi';
import pkg from '../../../package.json';

const runCmd = promisify(exec);

describe('gitlab -g -- CLI Global Enviroment Variables', () => {
  it('should return an object of available gitlab cli environment variables', async () => {
    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(strip(stdout)).toBe('No global variables have been set!\n');
  });

  it('should only have the personal token set', async () => {
    process.env.GITLAB_TOKEN = 'faketoken';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-token'].value).toBe('faketoken');
  });

  it('should only have the oauth token set', async () => {
    process.env.GITLAB_OAUTH_TOKEN = 'faketoken';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-oauth-token'].value).toBe('faketoken');
  });

  it('should  only have the job token set', async () => {
    process.env.GITLAB_JOB_TOKEN = 'faketoken';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-job-token'].value).toBe('faketoken');
  });

  it('should only have the host set', async () => {
    process.env.GITLAB_HOST = 'www.fakehost.com';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-host'].value).toBe('www.fakehost.com');
  });

  it('should only have the version set', async () => {
    process.env.GITLAB_VERSION = '4';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-version'].value).toBe(4);
  });

  it('should only have sudo set', async () => {
    process.env.GITLAB_SUDO = 'sudoaccount';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-sudo'].value).toBe('sudoaccount');
  });

  it('should only have the camelize set', async () => {
    process.env.GITLAB_CAMELIZE = 'true';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-camelize'].value).toBe(true);
  });

  it('should only have the profile token set', async () => {
    process.env.GITLAB_PROFILE_TOKEN = 'faketoken';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-profile-token'].value).toBe('faketoken');
  });

  it('should only have the profile mode set', async () => {
    process.env.GITLAB_PROFILE_MODE = 'mode1';

    const { stdout } = await runCmd('gitlab -g', {
      env: process.env,
    });

    expect(JSON.parse(stdout)['gl-profile-mode'].value).toBe('mode1');
  });
});

describe('gitlab -v -- Package Version', () => {
  it('should return the current version number of the package', async () => {
    const { stdout } = await runCmd('gitlab -v');

    expect(stdout.trim()).toBe(pkg.version);
  });
});
