import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Experiments } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Experiments;

beforeEach(() => {
  service = new Experiments({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Experiments.all', () => {
  it('should request GET /experiments without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'experiments', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should pass options as searchParams', async () => {
    await service.all({ perPage: 3, maxPages: 1, sudo: 'u' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'experiments', {
      maxPages: 1,
      searchParams: { perPage: 3 },
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});
