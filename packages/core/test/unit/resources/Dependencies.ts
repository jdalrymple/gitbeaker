import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Dependencies } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Dependencies;

beforeEach(() => {
  service = new Dependencies({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Dependencies.all', () => {
  it('should request GET projects/1/dependencies without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/dependencies', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET projects/1/dependencies with package_manager', async () => {
    await service.all(1, { package_manager: ['npm'], maxPages: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/dependencies', {
      maxPages: 3,
      searchParams: { package_manager: ['npm'] },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
