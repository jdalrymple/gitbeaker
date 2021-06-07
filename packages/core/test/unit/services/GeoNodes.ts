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

describe('Instantiating GeoNodes service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(GeoNodes);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
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
    await service.create(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'geo_nodes/1', undefined);
  });
});

describe('GeoNodes.edit', () => {
  it('should request PUT /geo_nodes/:id', async () => {
    await service.edit(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'geo_nodes/1', undefined);
  });
});

describe('GeoNodes.failures', () => {
  it('should request POST /geo_nodes/current/failures', async () => {
    await service.failures();

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'geo_nodes/current/failures',
      undefined,
    );
  });
});

describe('GeoNodes.repair', () => {
  it('should request DELETE /geo_nodes/:id', async () => {
    await service.repair(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'geo_nodes/1', undefined);
  });
});

describe('GeoNodes.show', () => {
  it('should request GET /geo_nodes/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/1', undefined);
  });
});

describe('GeoNodes.status', () => {
  it('should request GET /geo_nodes/:id/status', async () => {
    await service.status(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/1/status', undefined);
  });
});

describe('GeoNodes.statuses', () => {
  it('should request GET /geo_nodes/statuses', async () => {
    await service.statuses();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/statuses', undefined);
  });
});
