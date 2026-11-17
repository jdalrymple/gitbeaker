import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupSSHCertificates } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupSSHCertificates;

beforeEach(() => {
  service = new GroupSSHCertificates({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupSSHCertificates.all', () => {
  it('should request GET groups/1/ssh_certificates without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/ssh_certificates', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET groups/1/ssh_certificates with options', async () => {
    await service.all(1, { perPage: 3, maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/ssh_certificates', {
      maxPages: 2,
      searchParams: { perPage: 3 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupSSHCertificates.create', () => {
  it('should request POST groups/1/ssh_certificates', async () => {
    await service.create(1, 'ssh-rsa key', 'title');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/ssh_certificates', {
      body: { key: 'ssh-rsa key', title: 'title' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupSSHCertificates.remove', () => {
  it('should request DEL groups/1/ssh_certificates/2', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/ssh_certificates/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
