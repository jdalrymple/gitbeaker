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
    requestTimeout: 3000,
  });
});

describe('Instantiating ProtectedBranches service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ProtectedBranches);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('ProtectedBranches.all', () => {
  it('should request GET /projects/:id/protected_branches', async () => {
    await service.all(1, { test: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/protected_branches', {
      test: 1,
    });
  });

  it('should request GET /projects/:id/protected_branches without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/protected_branches', {});
  });
});

describe('ProtectedBranches.protect', () => {
  it('should request POST /projects/:id/protected_branches', async () => {
    await service.protect(1, 'name', { test: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/protected_branches', {
      name: 'name',
      test: 1,
    });
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

describe('ProtectedBranches.unprotect', () => {
  it('should request DEL /projects/:id/protected_branches/:branch_name without options', async () => {
    await service.unprotect(1, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_branches/name',
      undefined,
    );
  });

  it('should request DEL /projects/:id/protected_branches/:branch_name', async () => {
    await service.unprotect(1, 'name', { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_branches/name',
      { sudo: 1 },
    );
  });
});
