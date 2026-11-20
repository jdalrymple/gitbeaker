import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupServiceAccounts } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupServiceAccounts;

beforeEach(() => {
  service = new GroupServiceAccounts({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupServiceAccounts.create', () => {
  it('should request POST /groups/1/service_accounts', async () => {
    await service.create(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/service_accounts', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /groups/1/service_accounts with options', async () => {
    await service.create(1, { name: 'n', username: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/service_accounts', {
      body: { name: 'n', username: 'u' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupServiceAccounts.addPersonalAccessToken', () => {
  it('should request POST /groups/1/service_accounts/2', async () => {
    await service.addPersonalAccessToken(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/service_accounts/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupServiceAccounts.createPersonalAccessToken', () => {
  it('should request POST /groups/1/service_accounts/2', async () => {
    await service.createPersonalAccessToken(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/service_accounts/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupServiceAccounts.rotatePersonalAccessToken', () => {
  it('should request POST /groups/1/service_accounts/2/personal_access_tokens/3/rotate', async () => {
    await service.rotatePersonalAccessToken(1, 2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/service_accounts/2/personal_access_tokens/3/rotate',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
