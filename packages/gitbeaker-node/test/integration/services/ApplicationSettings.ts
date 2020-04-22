import { ApplicationSettings } from '../../../src';

let service;

beforeAll(async () => {
  service = new ApplicationSettings({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('ApplicationSettings.all', () => {
  let settings;

  beforeEach(async () => {
    settings = await service.all();
  });

  it('should return an object', async () => {
    expect(settings).toBeObject();
  });

  /**
   * @see https://docs.gitlab.com/ee/api/settings.html#get-current-application-settings
   */
  it('should contain all the required properties', async () => {
    expect(settings).toContainKeys(['id', 'gravatar_enabled']);
  });
});

describe('ApplicationSettings.edit', () => {
  it('should update Application Settings', async () => {
    const settings = await service.edit({ terms: 'Testing terms' });

    expect(settings).toBeObject();
    expect(settings.terms).toBe('Testing terms');
  });
});
