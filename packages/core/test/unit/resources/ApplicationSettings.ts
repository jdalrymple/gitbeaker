import { ApplicationSettings } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: ApplicationSettings;

beforeEach(() => {
  service = new ApplicationSettings({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ApplicationSettings.show', () => {
  it('should request GET /application/settings', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'application/settings', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ApplicationSettings.edit', () => {
  it('should request PUT /application/settings with a terms property', async () => {
    await service.edit({ terms: 'Testing terms' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'application/settings', {
      body: {
        terms: 'Testing terms',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
