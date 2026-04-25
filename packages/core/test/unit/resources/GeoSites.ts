import { GeoSites } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_sites', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoSites.create', () => {
  it('should request POST /geo_sites', async () => {
    await service.create('name', 'url');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'geo_sites', {
      body: {
        name: 'name',
        url: 'url',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoSites.edit', () => {
  it('should request PUT /geo_sites/:id', async () => {
    await service.edit(1);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'geo_sites/1', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /geo_sites/:id with options', async () => {
    await service.edit(1, { internalUrl: 'url' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'geo_sites/1', {
      body: {
        internalUrl: 'url',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoSites.allFailures', () => {
  it('should request POST /geo_sites/current/failures', async () => {
    await service.allFailures();

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'geo_sites/current/failures', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoSites.repair', () => {
  it('should request POST /geo_sites/:id/repair', async () => {
    await service.repair(1);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'geo_sites/1/repair', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoSites.show', () => {
  it('should request GET /geo_sites/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'geo_sites/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoSites.showStatus', () => {
  it('should request GET /geo_sites/:id/status', async () => {
    await service.showStatus(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'geo_sites/1/status', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoSites.allStatuses', () => {
  it('should request GET /geo_sites/statuses', async () => {
    await service.allStatuses();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'geo_sites/statuses', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
