import { SystemHooks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: SystemHooks;

beforeEach(() => {
  service = new SystemHooks({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('SystemHooks.all', () => {
  it('should request GET /hooks without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'hooks', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /hooks with options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'hooks', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('SystemHooks.add', () => {
  it('should request POST /hooks', async () => {
    await service.add('url');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'hooks', {
      body: {
        url: 'url',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('SystemHooks.remove', () => {
  it('should request DEL /hooks/:hook_id with options', async () => {
    await service.remove(2, { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'hooks/2', {
      showExpanded: undefined,
      sudo: 1,
    });
  });

  it('should request DEL /hooks/:hook_id without options', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'hooks/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
