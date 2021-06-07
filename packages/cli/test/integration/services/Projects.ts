import { promisify } from 'util';
import { exec } from 'child_process';

const execP = promisify(exec);

const { TEST_ID = '', GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '' } = process.env;

describe('gitbeaker projects create', () => {
  it('should create a valid project', async () => {
    const command = `projects create --name="CLI Project ${TEST_ID}" --gb-token="${GITLAB_PERSONAL_ACCESS_TOKEN}" --gb-host="${GITLAB_URL}"`;
    const { stdout } = await execP(`node dist/index.js ${command}`);
    const { name } = JSON.parse(stdout);

    expect(name).toBe(`CLI Project ${TEST_ID}`);
  });
});
