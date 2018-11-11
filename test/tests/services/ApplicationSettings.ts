import { ApplicationSettings } from '../../../src';

describe('ApplicationSettings.all', () => {
  it('should return an array', async () => {
    const service = new ApplicationSettings({
      host: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });
    const settings = await service.all();

    expect(settings).toBeObject();
  });
});
