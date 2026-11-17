import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SecureFiles } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: SecureFiles;

beforeEach(() => {
  service = new SecureFiles({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('SecureFiles.all', () => {
  it('should request GET /projects/:id/secure_files', async () => {
    await service.all(1, { maxPages: 2, perPage: 5, sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/secure_files', {
      sudo: 'u',
      showExpanded: true,
      maxPages: 2,
      searchParams: { perPage: 5 },
    });
  });
});

describe('SecureFiles.create', () => {
  it('should request POST /projects/:id/secure_files with form data', async () => {
    await service.create(
      1,
      'name',
      { content: new Blob(['x']), filename: 'f.txt' },
      {
        sudo: 'u',
        showExpanded: true,
      },
    );

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/secure_files', {
      sudo: 'u',
      showExpanded: true,
      body: expect.any(FormData),
    });

    const { body } = vi.mocked(RequestHelper.post()).mock.lastCall![2] as { body: FormData };

    expect(body.get('name')).toBe('name');
    expect((body.get('file') as File).name).toBe('f.txt');
  });
});

describe('SecureFiles.download', () => {
  it('should request GET /projects/:id/secure_files/:fileId/download', async () => {
    await service.download(1, 2, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/secure_files/2/download',
      { sudo: 'u', showExpanded: true },
    );
  });
});

describe('SecureFiles.remove', () => {
  it('should request DELETE /projects/:id/secure_files/:fileId', async () => {
    await service.remove(1, 2, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/secure_files/2', {
      sudo: 'u',
      showExpanded: true,
    });
  });
});

describe('SecureFiles.show', () => {
  it('should request GET /projects/:id/secure_files/:fileId', async () => {
    await service.show('a/b', '2', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/a%2Fb/secure_files/2', {
      sudo: 'u',
      showExpanded: true,
    });
  });
});
