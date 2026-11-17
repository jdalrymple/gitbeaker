import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DependencyProxy } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: DependencyProxy;

beforeEach(() => {
  service = new DependencyProxy({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('DependencyProxy.remove', () => {
  it('should request POST /groups/1/dependency_proxy/cache', async () => {
    await service.remove(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/dependency_proxy/cache', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
