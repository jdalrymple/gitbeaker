import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserSupportPin } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: UserSupportPin;

beforeEach(() => {
  service = new UserSupportPin({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('UserSupportPin.create', () => {
  it('should request POST /user/support_pin', async () => {
    await service.create();

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/support_pin', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserSupportPin.show', () => {
  it('should request GET /user/support_pin without userId', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/support_pin', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /users/:id/support_pin with userId', async () => {
    await service.show({ userId: 5 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/5/support_pin', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserSupportPin.revoke', () => {
  it('should request POST /users/:id/support_pin/revoke', async () => {
    await service.revoke(5);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/5/support_pin/revoke', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
