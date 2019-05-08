import { ApplicationSettings } from '../../../src';

describe('ApplicationSettings.all', () => {
  let settings: ReturnType<ApplicationSettings['all']>;

  beforeEach(async () => {
    const service = new ApplicationSettings({
      host: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });

    settings = await service.all();
  });

  it('Should return an object', async () => {
    expect(settings).toBeObject();
  });

  /**
   * @see https://docs.gitlab.com/ee/api/settings.html#get-current-application-settings
   */
  it('should contain all the required properties', async () => {
    expect(settings).toContainKeys(['id', 'gravatarEnabled']);
  });
});
