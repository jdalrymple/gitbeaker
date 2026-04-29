import { BroadcastMessages } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: BroadcastMessages;

beforeEach(() => {
  service = new BroadcastMessages({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('BroadcastMessages.all', () => {
  it('should request GET /broadcast_messages', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'broadcast_messages', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('BroadcastMessages.create', () => {
  it('should request POST /broadcast_messages', async () => {
    await service.create({ prop: 'test epic' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'broadcast_messages', {
      body: {
        prop: 'test epic',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('BroadcastMessages.edit', () => {
  it('should request PUT /broadcast_messages', async () => {
    await service.edit(2, { prop: 4 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'broadcast_messages/2', {
      body: {
        prop: 4,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('BroadcastMessages.remove', () => {
  it('should request DEL /broadcast_messages/:id', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'broadcast_messages/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('BroadcastMessages.show', () => {
  it('should request GET /broadcast_messages/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'broadcast_messages/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
