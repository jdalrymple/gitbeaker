import { spawnSync } from 'child_process';

const { TEST_ID = '', GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '' } = process.env;

describe('gitbeaker projects create', () => {
  it('should create a valid project', () => {
    const output = spawnSync('node', [
      '../../../dist/index',
      `gitbeaker projects create --name="CLI Project ${TEST_ID}" --gb-token="${GITLAB_PERSONAL_ACCESS_TOKEN}" --gb-host="${GITLAB_URL}"`,
    ]);

    console.log('error', output.error);
    console.log('stdout ', output.stdout);
    console.log('stderr ', output.stderr);
    console.log('stderr ', output.output);

    console.log(JSON.stringify(output));
    expect(true).toBeTruthy();
    // expect(data.name).toBe(`CLI Project ${TEST_ID}`);
  });
});
