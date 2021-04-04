const { TEST_ID } = process.env;

describe('gitbeaker projects create', () => {
  it('should create a valid project', async () => {
    // eslint-disable-next-line
    const { cli } = require('../../../dist/index');
    const { output } = await cli.parse(
      `gitbeaker projects create --name="CLI Project ${TEST_ID}" --gb-token="${process.env.PERSONAL_ACCESS_TOKEN}" --gb-host="${process.env.GITLAB_URL}"`,
    );
    const data = JSON.parse(output);

    expect(data.name).toBe(`CLI Project ${TEST_ID}`);
  });
});
