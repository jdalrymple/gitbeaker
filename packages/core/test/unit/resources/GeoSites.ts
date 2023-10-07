import { RequestHelper } from '../../../src/infrastructure';
import { GeoSites } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: GeoSites;

beforeEach(() => {
  service = new GeoSites({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('GeoSites.all', () => {
  it('should request GET /geo_sites', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_sites', undefined);
  });
});

describe('GeoSites.create', () => {
  it('should request POST /geo_sites', async () => {
    await service.create('name', 'url');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'geo_sites', {
      name: 'name',
      url: 'url',
    });
  });
});

describe('GeoSites.edit', () => {
  it('should request PUT /geo_sites/:id', async () => {
    await service.edit(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'geo_sites/1', undefined);
  });

  it('should request PUT /geo_sites/:id with options', async () => {
    await service.edit(1, { internalUrl: 'url' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'geo_sites/1', {
      internalUrl: 'url',
    });
  });
});

describe('GeoSites.allFailures', () => {
  it('should request POST /geo_sites/current/failures', async () => {
    await service.allFailures();

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'geo_sites/current/failures',
      undefined,
    );
  });
});

describe('GeoSites.repair', () => {
  it('should request POST /geo_sites/:id/repair', async () => {
    await service.repair(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'geo_sites/1/repair', undefined);
  });
});

describe('GeoSites.show', () => {
  it('should request GET /geo_sites/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_sites/1', undefined);
  });
});

describe('GeoSites.showStatus', () => {
  it('should request GET /geo_sites/:id/status', async () => {
    await service.showStatus(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_sites/1/status', undefined);
  });
});

describe('GeoSites.allStatuses', () => {
  it('should request GET /geo_sites/statuses', async () => {
    await service.allStatuses();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_sites/statuses', undefined);
  });
});
