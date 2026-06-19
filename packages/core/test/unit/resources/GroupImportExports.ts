import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupImportExports } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupImportExports;

beforeEach(() => {
  service = new GroupImportExports({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupImportExport.download', () => {
  it('should request GET /groups/:id/export/download', async () => {
    await service.download(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/export/download', {
      asStream: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/export/download with stream flag', async () => {
    await service.download(1, { asStream: true });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/1/export/download', {
      asStream: true,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupImportExport.import', () => {
  it('should request POST /groups/import', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });
    const expectedFile = new File([content], 'test.tar.gz', { type: content.type });

    await service.import({ content, filename: 'test.tar.gz' }, 'path', { name: 'test' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'groups/import',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    // Verify FormData contents
    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formData = call[2].body as FormData;
    const formDataObj = Object.fromEntries(formData.entries());
    expect(formDataObj).toEqual({
      path: 'path',
      name: 'test',
      file: expect.objectContaining({
        type: expectedFile.type,
        size: expectedFile.size,
        name: expectedFile.name
      })
    });
  });
});

describe('GroupImportExport.scheduleExport', () => {
  it('should request POST /groups/:id/export', async () => {
    await service.scheduleExport(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/export', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
