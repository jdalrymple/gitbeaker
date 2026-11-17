import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectRemoteMirrors } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectRemoteMirrors;

beforeEach(() => {
  service = new ProjectRemoteMirrors({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectRemoteMirrors.all', () => {
  it('should request GET projects/1/remote_mirrors without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/remote_mirrors', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET projects/1/remote_mirrors with options', async () => {
    await service.all(1, { perPage: 2, maxPages: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/remote_mirrors', {
      maxPages: 3,
      searchParams: { perPage: 2 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectRemoteMirrors.createPullMirror', () => {
  it('should request POST projects/1/mirror/pull without options', async () => {
    await service.createPullMirror(1, 'https://u', true);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/mirror/pull', {
      body: { importUrl: 'https://u', mirror: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST projects/1/mirror/pull with options', async () => {
    await service.createPullMirror(1, 'https://u', false, { onlyProtectedBranches: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/mirror/pull', {
      body: { onlyProtectedBranches: true, importUrl: 'https://u', mirror: false },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectRemoteMirrors.createPushMirror', () => {
  it('should request POST projects/1/remote_mirrors without options', async () => {
    await service.createPushMirror(1, 'https://u');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/remote_mirrors', {
      body: { url: 'https://u' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST projects/1/remote_mirrors with options', async () => {
    await service.createPushMirror(1, 'https://u', { enabled: true, authMethod: 'password' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/remote_mirrors', {
      body: { enabled: true, authMethod: 'password', url: 'https://u' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectRemoteMirrors.edit', () => {
  it('should request PUT projects/1/remote_mirrors/2', async () => {
    await service.edit(1, 2, { enabled: false });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/remote_mirrors/2', {
      body: { enabled: false },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectRemoteMirrors.remove', () => {
  it('should request DEL projects/1/remote_mirrors/2', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/remote_mirrors/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectRemoteMirrors.show', () => {
  it('should request GET projects/1/remote_mirrors/2', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/remote_mirrors/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectRemoteMirrors.publicKey', () => {
  it('should request GET projects/1/remote_mirrors/2/public_key', async () => {
    await service.publicKey(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/remote_mirrors/2/public_key',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ProjectRemoteMirrors.sync', () => {
  it('should request POST projects/1/remote_mirrors/2/sync', async () => {
    await service.sync(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/remote_mirrors/2/sync', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
