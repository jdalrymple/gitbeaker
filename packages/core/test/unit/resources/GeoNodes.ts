import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GeoNodes } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GeoNodes;

beforeEach(() => {
  service = new GeoNodes({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GeoNodes.all', () => {
  it('should request GET /geo_nodes', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoNodes.create', () => {
  it('should request POST /geo_nodes', async () => {
    await service.create('name', 'url');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'geo_nodes', {
      body: {
        name: 'name',
        url: 'url',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoNodes.edit', () => {
  it('should request PUT /geo_nodes/:id', async () => {
    await service.edit(1);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'geo_nodes/1', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /geo_nodes/:id with options', async () => {
    await service.edit(1, { name: 'name', url: 'url' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'geo_nodes/1', {
      body: {
        name: 'name',
        url: 'url',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoNodes.allFailures', () => {
  it('should request POST /geo_nodes/current/failures', async () => {
    await service.allFailures();

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'geo_nodes/current/failures', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoNodes.repair', () => {
  it('should request POST /geo_nodes/:id/repair', async () => {
    await service.repair(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'geo_nodes/1/repair', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoNodes.show', () => {
  it('should request GET /geo_nodes/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoNodes.showStatus', () => {
  it('should request GET /geo_nodes/:id/status', async () => {
    await service.showStatus(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/1/status', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GeoNodes.allStatuses', () => {
  it('should request GET /geo_nodes/statuses', async () => {
    await service.allStatuses();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'geo_nodes/statuses', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
