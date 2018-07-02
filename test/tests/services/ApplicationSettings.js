import { ApplicationSettings } from '../../../src';

describe('ApplicationSettings.all', () => {
  it('should return an array', async () => {
    const service = new ApplicationSettings({
      url: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });
    const settings = await service.all();

    expect(settings).toBeAnObject();
  });

  it('should contain all the required properties', async () => {
    const service = new ApplicationSettings({
      url: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });
    const settings = await service.all();

    console.log(settings);

    expect(settings).toContainAllKeys([
      'id',
    ]);
  });
});
