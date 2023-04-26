import { RequestHelper } from '../../../src/infrastructure';
import { GeoNodes } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: GeoNodes;

beforeEach(() => {
  service = new GeoNodes({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('GeoNodes.all', () => {
  it('should request GET /geo_nodes', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes', undefined);
  });
});

describe('GeoNodes.create', () => {
  it('should request POST /geo_nodes', async () => {
    await service.create('name', 'url');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'geo_nodes', {
      name: 'name',
      url: 'url',
    });
  });
});

describe('GeoNodes.edit', () => {
  it('should request PUT /geo_nodes/:id', async () => {
    await service.edit(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'geo_nodes/1', undefined);
  });

  it('should request PUT /geo_nodes/:id with options', async () => {
    await service.edit(1, { name: 'name', url: 'url' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'geo_nodes/1', {
      name: 'name',
      url: 'url',
    });
  });
});

describe('GeoNodes.allFailures', () => {
  it('should request POST /geo_nodes/current/failures', async () => {
    await service.allFailures();

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'geo_nodes/current/failures',
      undefined,
    );
  });
});

describe('GeoNodes.repair', () => {
  it('should request POST /geo_nodes/:id/repair', async () => {
    await service.repair(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'geo_nodes/1/repair', undefined);
  });
});

describe('GeoNodes.show', () => {
  it('should request GET /geo_nodes/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/1', undefined);
  });
});

describe('GeoNodes.showStatus', () => {
  it('should request GET /geo_nodes/:id/status', async () => {
    await service.showStatus(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/1/status', undefined);
  });
});

describe('GeoNodes.allStatuses', () => {
  it('should request GET /geo_nodes/statuses', async () => {
    await service.allStatuses();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/statuses', undefined);
  });
});
