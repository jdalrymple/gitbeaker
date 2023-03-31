import { RequestHelper } from '../../../src/infrastructure';
import { ApplicationSettings } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ApplicationSettings;

beforeEach(() => {
  service = new ApplicationSettings({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('ApplicationSettings.show', () => {
  it('should request GET /application/settings', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/settings', undefined);
  });
});

describe('ApplicationSettings.edit', () => {
  it('should request PUT /application_settings with a terms property', async () => {
    await service.edit({ terms: 'Testing terms' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/settings', {
      terms: 'Testing terms',
    });
  });
});
