import { RequestHelper } from '../../../src/infrastructure';
import { ProtectedBranches } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ProtectedBranches;

beforeEach(() => {
  service = new ProtectedBranches({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ProtectedBranches.all', () => {
  it('should request GET /projects/:id/protected_branches', async () => {
    await service.all(1, { search: 'dedde' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/protected_branches', {
      search: 'dedde',
    });
  });

  it('should request GET /projects/:id/protected_branches without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_branches',
      undefined,
    );
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
    const spy = jest.spyOn(service, 'create');

    await service.protect(1, 'name', { allowForcePush: true });

    expect(spy).toHaveBeenCalledWith(1, 'name', { allowForcePush: true });
  });
});

describe('ProtectedBranches.show', () => {
  it('should request GET /projects/:id/protected_branches/:branch_name', async () => {
    await service.show(1, 'name', { sudo: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_branches/name',
      {
        sudo: 1,
      },
    );
  });

  it('should request GET /projects/:id/protected_branches/:branch_name without options', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_branches/name',
      undefined,
    );
  });
});

describe('ProtectedBranches.remove', () => {
  it('should request DEL /projects/:id/protected_branches/:branch_name without options', async () => {
    await service.remove(1, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_branches/name',
      undefined,
    );
  });

  it('should request DEL /projects/:id/protected_branches/:branch_name', async () => {
    await service.remove(1, 'name', { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_branches/name',
      { sudo: 1 },
    );
  });
});

describe('ProtectedBranches.unprotect', () => {
  it('should request DEL /projects/:id/protected_branches/:branch_name without options', async () => {
    const spy = jest.spyOn(service, 'remove');

    await service.unprotect(1, 'name');

    expect(spy).toHaveBeenCalledWith(1, 'name', undefined);
  });

  it('should request DEL /projects/:id/protected_branches/:branch_name', async () => {
    const spy = jest.spyOn(service, 'remove');

    await service.unprotect(1, 'name', { sudo: 1 });

    expect(spy).toHaveBeenCalledWith(1, 'name', { sudo: 1 });
  });
});
