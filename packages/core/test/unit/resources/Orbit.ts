import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Orbit } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Orbit;

beforeEach(() => {
  service = new Orbit({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Orbit.createQuery', () => {
  it('should request POST /orbit/query', async () => {
    await service.createQuery({ query: { a: 1 }, queryType: 'json' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'orbit/query', {
      body: { query: { a: 1 }, queryType: 'json' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Orbit.showSchema', () => {
  it('should request GET /orbit/schema', async () => {
    await service.showSchema();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'orbit/schema', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /orbit/schema with options', async () => {
    await service.showSchema({ expand: 'x', responseFormat: 'llm' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'orbit/schema', {
      searchParams: { expand: 'x', responseFormat: 'llm' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Orbit.showStatus', () => {
  it('should request GET /orbit/status', async () => {
    await service.showStatus();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'orbit/status', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /orbit/status with options', async () => {
    await service.showStatus({ responseFormat: 'raw' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'orbit/status', {
      searchParams: { responseFormat: 'raw' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Orbit.allTools', () => {
  it('should request GET /orbit/tools', async () => {
    await service.allTools();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'orbit/tools', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
