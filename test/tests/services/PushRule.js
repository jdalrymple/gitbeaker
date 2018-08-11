import { PushRule } from '../../../src';

describe('PushRule', () => {
  it('should create or edit push rule on upsert', async () => {
    const service = new PushRule({
      url: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });
    const pushRules = {
      upsert: true,
      member_check: true
    }
    const result = await service.edit(1, pushRules);

    expect(result).toBeInstanceOf(Object);
    expect(result.member_check).toBeTrue();
  });
});
