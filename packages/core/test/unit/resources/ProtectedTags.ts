import { AccessLevel, ProtectedTags } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProtectedTags;

beforeEach(() => {
  service = new ProtectedTags({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('ProtectedTags.all', () => {
  it('should request GET /projects/:id/protected_tags', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/protected_tags', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProtectedTags.create', () => {
  it('should request POST /projects/:id/protected_tags', async () => {
    await service.create(1, 'name', { createAccessLevel: AccessLevel.DEVELOPER });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/protected_tags', {
      body: {
        name: 'name',
        createAccessLevel: AccessLevel.DEVELOPER,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProtectedTags.protect', () => {
  it('should request POST /projects/:id/protected_tags', async () => {
    const spy = vi.spyOn(service, 'create');

    await service.protect(1, 'name', { createAccessLevel: AccessLevel.DEVELOPER });

    expect(spy).toHaveBeenCalledWith(1, 'name', { createAccessLevel: AccessLevel.DEVELOPER });
  });
});

describe('ProtectedTags.show', () => {
  it('should request GET /projects/:id/protected_tags/:tag_name', async () => {
    await service.show(1, 'name', { sudo: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/protected_tags/name',
      {
        showExpanded: undefined,
        sudo: 1,
      },
    );
  });

  it('should request GET /projects/:id/protected_tags/:tag_name without options', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/protected_tags/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProtectedTags.remove', () => {
  it('should request DEL /projects/:id/protected_tags/:tag_name without options', async () => {
    await service.remove(1, 'name');

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(
      service,
      'projects/1/protected_tags/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request DEL /projects/:id/protected_tags/:tag_name', async () => {
    await service.remove(1, 'name', { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(
      service,
      'projects/1/protected_tags/name',
      {
        showExpanded: undefined,
        sudo: 1,
      },
    );
  });
});

describe('ProtectedTags.unprotect', () => {
  it('should request DEL /projects/:id/protected_tags/:tag_name without options', async () => {
    const spy = vi.spyOn(service, 'remove');

    await service.unprotect(1, 'name');

    expect(spy).toHaveBeenCalledWith(1, 'name', undefined);
  });

  it('should request DEL /projects/:id/protected_tags/:tag_name', async () => {
    const spy = vi.spyOn(service, 'remove');

    await service.unprotect(1, 'name', { sudo: 1 });

    expect(spy).toHaveBeenCalledWith(1, 'name', { sudo: 1 });
  });
});
