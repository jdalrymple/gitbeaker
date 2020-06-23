import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { ApplicationSettings } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ApplicationSettings;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new ApplicationSettings({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating ApplicationSettings service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ApplicationSettings);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('ApplicationSettings.all', () => {
  it('should request GET /application/settings', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'application/settings', undefined);
  });
});

describe('ApplicationSettings.edit', () => {
  it('should request PUT /application_settings with a terms property', async () => {
    await service.edit({ terms: 'Testing terms' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'application/settings', {
      terms: 'Testing terms',
    });
  });
});
