import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Features } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Features;

beforeEach(() => {
  service = new Features({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Features.all', () => {
  it('should request GET /features', async () => {
    await service.all({ perPage: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'features', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: { perPage: 3 },
    });
  });
});

describe('Features.allDefinitions', () => {
  it('should request GET /features/definitions', async () => {
    await service.allDefinitions();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'features/definitions', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: {},
    });
  });
});

describe('Features.create', () => {
  it('should request POST /features/flag', async () => {
    await service.create('flag', 50, { key: 'percentage_of_time', force: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'features/flag', {
      sudo: undefined,
      showExpanded: undefined,
      body: { key: 'percentage_of_time', force: true, value: 50 },
    });
  });
});

describe('Features.remove', () => {
  it('should request DELETE /features/flag', async () => {
    await service.remove('flag');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'features/flag', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});
