/* eslint no-console: 0 */
import { exec } from 'child_process';
import { promisify } from 'util';

const runCmd = promisify(exec);

it('should create a valid project using configuration from environment variables', async () => {
  process.env.GITLAB_HOST = process.env.GITLAB_URL;
  process.env.GITLAB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;

  const { stdout } = await runCmd('gitlab projects create --name="Project Creation CLI test1"', {
    env: process.env,
  });

  expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test1');
});

it('should create a valid project using configuration passed in arguments', async () => {
  const { stdout } = await runCmd(
    `gitlab projects create --gl-token=${process.env.PERSONAL_ACCESS_TOKEN} --gl-host=${process.env.GITLAB_URL} --name="Project Creation CLI test2"`,
    {
      env: process.env,
    },
  );

  expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test2');
});

it('should create a valid project using configuration passed in arguments and defined in the environment variables', async () => {
  process.env.GITLAB_HOST = process.env.GITLAB_URL;

  const { stdout } = await runCmd(
    `
    gitlab projects create --gl-token=${process.env.PERSONAL_ACCESS_TOKEN} --name="Project Creation CLI test3"`,
    {
      env: process.env,
    },
  );

  expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test3');
});

it('should create a valid project using configuration passed in arguments, overriding those defined in the environment variables', async () => {
  process.env.GITLAB_TOKEN = 'faketoken';

  const { stdout } = await runCmd(
    `
    gitlab projects create --gl-host=${process.env.GITLAB_URL} --gl-token=${process.env.PERSONAL_ACCESS_TOKEN} --name="Project Creation CLI test4"`,
    {
      env: process.env,
    },
  );

  expect(JSON.parse(stdout).name).toEqual('Project Creation CLI test4');
});
