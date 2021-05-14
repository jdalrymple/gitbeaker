import { RequestHelper } from '../../../src/infrastructure';
import { FeatureFlags } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: FeatureFlags;

beforeEach(() => {
  service = new FeatureFlags({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating FeatureFlags service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(FeatureFlags);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('FeatureFlags.all', () => {
  it('should request GET /projects/:id/features_flags without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/features_flags', {});
  });

  it('should request GET /projects/:id/features_flags', async () => {
    await service.all(1, { scopes: 'enabled' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/features_flags', {
      scopes: 'enabled',
    });
  });
});

describe('FeatureFlags.create', () => {
  it('should request POST /projects/:id/features_flags', async () => {
    await service.create(1, 'name', '1');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/features_flags', {
      version: '1',
      name: 'name',
    });
  });
});

describe('FeatureFlags.edit', () => {
  it('should request PUT /projects/:id/features_flags/:flag_name', async () => {
    await service.edit(1, 'name', { test: 1 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/features_flags/name', {
      test: 1,
    });
  });
});

describe('FeatureFlags.remove', () => {
  it('should request DEL /projects/:id/features_flags/:flag_name', async () => {
    await service.remove(1, 'name', { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/features_flags/name', {
      sudo: 1,
    });
  });
});

describe('FeatureFlags.show', () => {
  it('should request GET /projects/:id/features_flags/:flag_name', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/features_flags/name',
      undefined,
    );
  });
});
