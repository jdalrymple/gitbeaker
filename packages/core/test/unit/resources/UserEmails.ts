import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserEmails } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: UserEmails;

beforeEach(() => {
  service = new UserEmails({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('UserEmails.all', () => {
  it('should request GET /user/emails', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'user/emails', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /users/:id/emails', async () => {
    await service.all({ userId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'users/1/emails', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserEmails.add', () => {
  it('should request POST /user/emails', async () => {
    await service.add('email');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'user/emails', {
      body: {
        email: 'email',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /users/:id/emails', async () => {
    await service.add('email', { userId: 1 });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'users/1/emails', {
      body: {
        email: 'email',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserEmails.show', () => {
  it('should request GET /user/emails/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'user/emails/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserEmails.remove', () => {
  it('should request DEL /users/:id/emails/:id', async () => {
    await service.remove(2, { userId: 1 });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'users/1/emails/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request DEL /user/emails/:id', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'user/emails/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
