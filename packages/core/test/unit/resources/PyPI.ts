import { PyPI } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: PyPI;

beforeEach(() => {
  service = new PyPI({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('PyPI.downloadPackageFile', () => {
  it('should request GET /projects/1/packages/pypi/files/:sha/:fileIdentifier', async () => {
    await service.downloadPackageFile('sha', 'id', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1//packages/pypi/files/sha/id',
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET /groups/1/packages/pypi/files/:sha/:fileIdentifier', async () => {
    await service.downloadPackageFile('sha', 'id', { groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'groups/1//packages/pypi/files/sha/id',
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should throw an error if groupId or projectId is not passed', () => {
    expect(() => service.downloadPackageFile('sha', 'id', {} as any)).toThrow();
  });
});

describe('PyPI.showPackageDescriptor', () => {
  it('should request GET /projects/1/packages/pypi/simple/:name', async () => {
    await service.showPackageDescriptor('name', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1//packages/pypi/simple/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET /groups/1/packages/pypi/simple/:name', async () => {
    await service.showPackageDescriptor('name', { groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'groups/1//packages/pypi/simple/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should throw an error if groupId or projectId is not passed', () => {
    expect(() => service.showPackageDescriptor('name', {} as any)).toThrow();
  });
});

describe('PyPI.uploadPackageFile', () => {
  it('should request POST /projects/1/packages/pypi', async () => {
    const content = new Blob(['text'], { type: 'text/plain' });
    const file = { content, filename: 'pkg.txt' };

    await service.uploadPackageFile(1, file);

    const expectedFormData = new FormData();
    expectedFormData.append('file', content, 'pkg.txt');
    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/packages/pypi', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
