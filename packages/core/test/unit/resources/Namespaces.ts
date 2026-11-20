import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Namespaces } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Namespaces;

beforeEach(() => {
  service = new Namespaces({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Namespaces.all', () => {
  it('should request GET namespaces without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'namespaces', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET namespaces with options', async () => {
    await service.all({ search: 'x', ownedOnly: true, maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'namespaces', {
      maxPages: 2,
      searchParams: { search: 'x', ownedOnly: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Namespaces.exists', () => {
  it('should request GET namespaces/ns/exists without options', async () => {
    await service.exists('ns');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'namespaces/ns/exists', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET namespaces/ns/exists with parentId', async () => {
    await service.exists('ns', { parentId: 5 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'namespaces/ns/exists', {
      searchParams: { parentId: 5 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Namespaces.show', () => {
  it('should request GET namespaces/1', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'namespaces/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET namespaces/grp%2Fsub with string id', async () => {
    await service.show('grp/sub');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'namespaces/grp%2Fsub', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
