import { ProtectedBranches } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProtectedBranches;

beforeEach(() => {
  service = new ProtectedBranches({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('ProtectedBranches.all', () => {
  it('should request GET /projects/:id/protected_branches', async () => {
    await service.all(1, { search: 'dedde' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/protected_branches', {
      maxPages: undefined,
      searchParams: {
        search: 'dedde',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/protected_branches without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/protected_branches', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProtectedBranches.create', () => {
  it('should request POST /projects/:id/protected_branches', async () => {
    await service.create(1, 'name', { allowForcePush: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/protected_branches', {
      searchParams: {
        name: 'name',
        allowForcePush: true,
      },
    });
  });
});

describe('ProtectedBranches.protect', () => {
  it('should request POST /projects/:id/protected_branches', async () => {
    const spy = vi.spyOn(service, 'create');

    await service.protect(1, 'name', { allowForcePush: true });

    expect(spy).toHaveBeenCalledWith(1, 'name', { allowForcePush: true });
  });
});

describe('ProtectedBranches.show', () => {
  it('should request GET /projects/:id/protected_branches/:branch_name', async () => {
    await service.show(1, 'name', { sudo: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/protected_branches/name',
      {
        showExpanded: undefined,
        sudo: 1,
      },
    );
  });

  it('should request GET /projects/:id/protected_branches/:branch_name without options', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/protected_branches/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProtectedBranches.remove', () => {
  it('should request DEL /projects/:id/protected_branches/:branch_name without options', async () => {
    await service.remove(1, 'name');

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(
      service,
      'projects/1/protected_branches/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request DEL /projects/:id/protected_branches/:branch_name', async () => {
    await service.remove(1, 'name', { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(
      service,
      'projects/1/protected_branches/name',
      { showExpanded: undefined, sudo: 1 },
    );
  });
});

describe('ProtectedBranches.unprotect', () => {
  it('should request DEL /projects/:id/protected_branches/:branch_name without options', async () => {
    const spy = vi.spyOn(service, 'remove');

    await service.unprotect(1, 'name');

    expect(spy).toHaveBeenCalledWith(1, 'name', undefined);
  });

  it('should request DEL /projects/:id/protected_branches/:branch_name', async () => {
    const spy = vi.spyOn(service, 'remove');

    await service.unprotect(1, 'name', { sudo: 1 });

    expect(spy).toHaveBeenCalledWith(1, 'name', { sudo: 1 });
  });
});
