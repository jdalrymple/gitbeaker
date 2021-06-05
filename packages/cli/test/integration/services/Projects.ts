const { TEST_ID = '', GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '' } = process.env;

describe('gitbeaker projects create', () => {
  it('should create a valid project', async () => {
    // eslint-disable-next-line
    const { cli } = require('../../../dist/index');
    const { output } = await cli.parse(
      `gitbeaker projects create --name="CLI Project ${TEST_ID}" --gb-token="${GITLAB_PERSONAL_ACCESS_TOKEN}" --gb-host="${GITLAB_URL}"`,
    );
    const data = JSON.parse(output);

    expect(data.name).toBe(`CLI Project ${TEST_ID}`);
  });
});
