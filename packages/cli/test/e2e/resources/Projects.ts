import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const execP: (command: string) => Promise<{ stdout: string }> = promisify(exec);

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;

describe('gitbeaker projects create', () => {
  it('should create a valid project', async () => {
    const command = `projects create --name="CLI Project - e2e ${TEST_ID}" --gb-token="${GITLAB_PERSONAL_ACCESS_TOKEN}" --gb-host="${GITLAB_URL}"`;
    const { stdout } = await execP(`node dist/index.mjs ${command}`);
    const { name } = JSON.parse(stdout.toString());

    expect(name).toBe(`CLI Project - e2e ${TEST_ID}`);
  });
});
