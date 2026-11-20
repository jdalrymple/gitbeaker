import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserFollows } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: UserFollows;

beforeEach(() => {
  service = new UserFollows({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('UserFollows.follow', () => {
  it('should request POST /users/1/follow', async () => {
    await service.follow(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/follow', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('UserFollows.unfollow', () => {
  it('should request POST /users/1/unfollow', async () => {
    await service.unfollow(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unfollow', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('UserFollows.showFollowers', () => {
  it('should request GET /users/1/followers', async () => {
    await service.showFollowers(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/followers', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('UserFollows.showFollowing', () => {
  it('should request GET /users/1/following', async () => {
    await service.showFollowing(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/following', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});
