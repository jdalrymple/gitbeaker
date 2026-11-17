import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserModeration } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: UserModeration;

beforeEach(() => {
  service = new UserModeration({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('UserModeration.approve', () => {
  it('should request POST /users/:id/approve', async () => {
    await service.approve(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/approve', {
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('UserModeration.reject', () => {
  it('should request POST /users/:id/reject', async () => {
    await service.reject(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/reject', {
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('UserModeration.activate', () => {
  it('should request POST /users/:id/activate', async () => {
    await service.activate(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/activate', {
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('UserModeration.deactivate', () => {
  it('should request POST /users/:id/deactivate', async () => {
    await service.deactivate(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/deactivate', {
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('UserModeration.block', () => {
  it('should request POST /users/:id/block', async () => {
    await service.block(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/block', {
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('UserModeration.unblock', () => {
  it('should request POST /users/:id/unblock', async () => {
    await service.unblock(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unblock', {
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('UserModeration.ban', () => {
  it('should request POST /users/:id/ban', async () => {
    await service.ban(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/ban', {
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('UserModeration.unban', () => {
  it('should request POST /users/:id/unban', async () => {
    await service.unban(1, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unban', {
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});
