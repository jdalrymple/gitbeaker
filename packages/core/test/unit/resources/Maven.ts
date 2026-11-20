import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Maven } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Maven;

beforeEach(() => {
  service = new Maven({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Maven.downloadPackageFile', () => {
  it('should request GET /packages/maven/:path/:filename without a prefix', async () => {
    await service.downloadPackageFile('com/example', 'a.jar');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'packages/maven/com/example/a.jar', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should use the project prefix', async () => {
    await service.downloadPackageFile('com/example', 'a.jar', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/maven/com/example/a.jar',
      { showExpanded: undefined, sudo: undefined },
    );
  });

  it('should use the group prefix', async () => {
    await service.downloadPackageFile('com/example', 'a.jar', { groupId: 2, sudo: 'u' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/maven/com/example/a.jar',
      { showExpanded: undefined, sudo: 'u' },
    );
  });
});

describe('Maven.uploadPackageFile', () => {
  it('should request PUT /projects/:id/packages/maven/:path/:filename', async () => {
    const content = new Blob(['jar'], { type: 'application/java-archive' });

    await service.uploadPackageFile(1, 'com/example', { content, filename: 'a.jar' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/packages/maven/com/example/a.jar',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({ size: content.size }),
    });
  });
});
