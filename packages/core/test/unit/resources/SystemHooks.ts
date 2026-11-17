import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SystemHooks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: SystemHooks;

beforeEach(() => {
  service = new SystemHooks({
    requesterFn: vi.fn<RequesterFn>(),
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

describe('SystemHooks.create', () => {
  it('should request POST /hooks', async () => {
    await service.create('url', { token: 'abc', pushEvents: true, sudo: 1 });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'hooks', {
      body: { url: 'url', token: 'abc', pushEvents: true },
      showExpanded: undefined,
      sudo: 1,
    });
  });
});

describe('SystemHooks.edit', () => {
  it('should request PUT /hooks/:hook_id', async () => {
    await service.edit(2, { token: 'new', sudo: 1 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'hooks/2', {
      body: { token: 'new' },
      showExpanded: undefined,
      sudo: 1,
    });
  });
});

describe('SystemHooks.test', () => {
  it('should request POST /hooks/:hook_id', async () => {
    await service.test(2);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'hooks/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('SystemHooks.show', () => {
  it('should request GET /hooks/:hook_id', async () => {
    await service.show(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'hooks/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('SystemHooks.setUrlVariable', () => {
  it('should request PUT /hooks/:hook_id/url_variables/:key', async () => {
    await service.setUrlVariable(2, 'KEY', 'val');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'hooks/2/url_variables/KEY', {
      body: { value: 'val' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('SystemHooks.removeUrlVariable', () => {
  it('should request DEL /hooks/:hook_id/url_variables/:key', async () => {
    await service.removeUrlVariable(2, 'KEY');

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'hooks/2/url_variables/KEY', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
