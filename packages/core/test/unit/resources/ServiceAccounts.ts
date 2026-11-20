import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ServiceAccounts } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ServiceAccounts;

beforeEach(() => {
  service = new ServiceAccounts({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ServiceAccounts.all', () => {
  it('should request GET /service_accounts without scope', async () => {
    await service.all({ orderBy: 'id' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'service_accounts', {
      maxPages: undefined,
      searchParams: { orderBy: 'id' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/service_accounts', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/service_accounts', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/service_accounts', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/service_accounts', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should throw when both projectId and groupId are given', () => {
    expect(() => service.all({ projectId: 1, groupId: 2 } as any)).toThrow(
      'Too many arguments provided',
    );
  });
});

describe('ServiceAccounts.create', () => {
  it('should request POST /service_accounts', async () => {
    await service.create({ name: 'bot' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'service_accounts', {
      body: { name: 'bot' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /groups/:id/service_accounts', async () => {
    await service.create({ groupId: 2, name: 'bot' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/2/service_accounts', {
      body: { name: 'bot' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ServiceAccounts.edit', () => {
  it('should request PATCH /service_accounts/:id', async () => {
    await service.edit(3, { name: 'bot' });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'service_accounts/3', {
      body: { name: 'bot' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PATCH /projects/:id/service_accounts/:id', async () => {
    await service.edit(3, { projectId: 1, name: 'bot' });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'projects/1/service_accounts/3', {
      body: { name: 'bot' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ServiceAccounts.remove', () => {
  it('should request DELETE /service_accounts/:id', async () => {
    await service.remove(3, { hardDelete: true });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'service_accounts/3', {
      searchParams: { hardDelete: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request DELETE /groups/:id/service_accounts/:id', async () => {
    await service.remove(3, { groupId: 2 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/2/service_accounts/3', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
