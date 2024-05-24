import { RequestHelper } from '../../../src/infrastructure';
import { AccessLevel, ProtectedTags } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ProtectedTags;

beforeEach(() => {
  service = new ProtectedTags({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ProtectedTags.all', () => {
  it('should request GET /projects/:id/protected_tags', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_tags',
      undefined,
    );
  });
});

describe('ProtectedTags.create', () => {
  it('should request POST /projects/:id/protected_tags', async () => {
    await service.create(1, 'name', { createAccessLevel: AccessLevel.DEVELOPER });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/protected_tags', {
      searchParams: {
        name: 'name',
        createAccessLevel: AccessLevel.DEVELOPER,
      },
    });
  });
});

describe('ProtectedTags.protect', () => {
  it('should request POST /projects/:id/protected_tags', async () => {
    const spy = jest.spyOn(service, 'create');

    await service.protect(1, 'name', { createAccessLevel: AccessLevel.DEVELOPER });

    expect(spy).toHaveBeenCalledWith(1, 'name', { createAccessLevel: AccessLevel.DEVELOPER });
  });
});

describe('ProtectedTags.show', () => {
  it('should request GET /projects/:id/protected_tags/:tag_name', async () => {
    await service.show(1, 'name', { sudo: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/protected_tags/name', {
      sudo: 1,
    });
  });

  it('should request GET /projects/:id/protected_tags/:tag_name without options', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_tags/name',
      undefined,
    );
  });
});

describe('ProtectedTags.remove', () => {
  it('should request DEL /projects/:id/protected_tags/:tag_name without options', async () => {
    await service.remove(1, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/protected_tags/name',
      undefined,
    );
  });

  it('should request DEL /projects/:id/protected_tags/:tag_name', async () => {
    await service.remove(1, 'name', { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/protected_tags/name', {
      sudo: 1,
    });
  });
});

describe('ProtectedTags.unprotect', () => {
  it('should request DEL /projects/:id/protected_tags/:tag_name without options', async () => {
    const spy = jest.spyOn(service, 'remove');

    await service.unprotect(1, 'name');

    expect(spy).toHaveBeenCalledWith(1, 'name', undefined);
  });

  it('should request DEL /projects/:id/protected_tags/:tag_name', async () => {
    const spy = jest.spyOn(service, 'remove');

    await service.unprotect(1, 'name', { sudo: 1 });

    expect(spy).toHaveBeenCalledWith(1, 'name', { sudo: 1 });
  });
});
