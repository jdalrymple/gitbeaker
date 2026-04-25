import { Packages } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Packages;

beforeEach(() => {
  service = new Packages({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('Packages.all', () => {
  it('should request GET /projects/:id/packages', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/packages', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/packages', async () => {
    await service.all({ groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/1/packages', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should throw an error is neither groupId or projectId is passed', () => {
    expect(() => service.all()).toThrow(
      'Missing required argument. Please supply a projectId or groupId in the options parameter.',
    );
  });
});

describe('Packages.remove', () => {
  it('should request DEL /projects/:id/packages/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/packages/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Packages.removeFile', () => {
  it('should request DEL /projects/:id/packages/:id/package_files', async () => {
    await service.removeFile(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/2/package_files/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Packages.show', () => {
  it('should request GET /projects/:id/packages/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/packages/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Packages.allFiles', () => {
  it('should request GET /projects/:id/packages/:id/package_files', async () => {
    await service.allFiles(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/2/package_files',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
