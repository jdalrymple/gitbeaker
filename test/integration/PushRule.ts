import { PushRule } from '../../src';

describe('PushRule', () => {
  // the feature is not available for CE users https://gitlab.com/gitlab-org/gitlab-ee/issues/3825
  xit('should create or edit push rule on upsert', async () => {
    const service = new PushRule({
      host: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });

    const result = await service.edit(1, {
      upsert: true,
      memberCheck: true,
    });

    expect(result).toBeInstanceOf(Object);
    expect(result.member_check).toBeTrue();
  });
});
