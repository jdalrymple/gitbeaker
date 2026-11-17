import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ModelRegistry } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ModelRegistry;

beforeEach(() => {
  service = new ModelRegistry({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ModelRegistry.download', () => {
  it('should request GET without path', async () => {
    await service.download(1, 2, 'file.bin', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/ml_models/2/files/file.bin',
      { sudo: 'u', showExpanded: true, searchParams: {} },
    );
  });

  it('should request GET with path (encoded as one segment)', async () => {
    await service.download(1, 2, 'file.bin', { path: 'dir' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/ml_models/2/files/dir%2Ffile.bin',
      { sudo: undefined, showExpanded: undefined, searchParams: {} },
    );
  });
});

describe('ModelRegistry.authorizeUpload', () => {
  it('should request PUT .../authorize', async () => {
    await service.authorizeUpload(1, 2, 'file.bin', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/ml_models/2/files/file.bin/authorize',
      { sudo: 'u', showExpanded: true, searchParams: {} },
    );
  });

  it('should include path', async () => {
    await service.authorizeUpload(1, 2, 'file.bin', { path: 'dir' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/ml_models/2/files/dir%2Ffile.bin/authorize',
      { sudo: undefined, showExpanded: undefined, searchParams: {} },
    );
  });
});

describe('ModelRegistry.upload', () => {
  it('should request PUT with form data', async () => {
    const file = new Blob(['content']);

    await service.upload(1, 2, 'file.bin', file, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/ml_models/2/files/file.bin',
      { sudo: 'u', showExpanded: true, body: expect.any(FormData) },
    );

    const { body } = vi.mocked(RequestHelper.put()).mock.lastCall![2] as { body: FormData };

    expect(body.get('file')).toBeInstanceOf(Blob);
  });

  it('should include path', async () => {
    await service.upload(1, 2, 'file.bin', new Blob(['c']), { path: 'dir' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/ml_models/2/files/dir%2Ffile.bin',
      { sudo: undefined, showExpanded: undefined, body: expect.any(FormData) },
    );
  });
});
