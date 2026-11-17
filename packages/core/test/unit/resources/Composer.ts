import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Composer } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Composer;

beforeEach(() => {
  service = new Composer({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Composer.create', () => {
  it('should request POST /projects/:id/packages/composer', async () => {
    await service.create(1, { tag: 'v1', showExpanded: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/packages/composer', {
      showExpanded: true,
      body: { tag: 'v1' },
    });
  });

  it('should work with branch and without options', async () => {
    await service.create('a/b', { branch: 'main' });
    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/a%2Fb/packages/composer', {
      showExpanded: undefined,
      body: { branch: 'main' },
    });

    await service.create(1);
    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/packages/composer', {
      showExpanded: undefined,
      body: {},
    });
  });
});

describe('Composer.download', () => {
  it('should request GET /projects/:id/packages/composer/archives/:name with sha', async () => {
    await service.download(1, 'vendor/pkg', 'abc123', { showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/composer/archives/vendor%2Fpkg',
      { showExpanded: true, searchParams: { sha: 'abc123' } },
    );
  });
});

describe('Composer.showMetadata', () => {
  it('should request the p2 path when no sha is given', async () => {
    await service.showMetadata(1, 'vendor/pkg');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/-/packages/composer/p2/vendor%2Fpkg',
      { showExpanded: undefined, searchParams: {} },
    );
  });

  it('should request the sha path when sha is given', async () => {
    await service.showMetadata(1, 'pkg', { sha: 'abc', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/-/packages/composer/pkg$abc',
      { showExpanded: true, searchParams: { sha: 'abc' } },
    );
  });
});

describe('Composer.showPackages', () => {
  it('should request GET /groups/:id/-/packages/composer/p/:sha', async () => {
    await service.showPackages(1, 'abc', { showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/-/packages/composer/p/abc',
      { showExpanded: true },
    );
  });
});

describe('Composer.showBaseRepository', () => {
  it('should request GET /groups/:id/-/packages/composer/packages', async () => {
    await service.showBaseRepository(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://gitlab.com/api/v4/' }),
      'groups/1/-/packages/composer/packages',
      { showExpanded: undefined, searchParams: {} },
    );
  });

  it('should set the Composer/2 user agent for composerVersion 2', async () => {
    await service.showBaseRepository(1, { composerVersion: '2', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({ 'User-Agent': 'Composer/2' }),
      }),
      'groups/1/-/packages/composer/packages',
      { showExpanded: true, searchParams: { composerVersion: '2' } },
    );
  });

  it('should not leak the Composer/2 user agent onto the original service', async () => {
    await service.showBaseRepository(1, { composerVersion: '2' });

    expect((service as any).headers).not.toHaveProperty('User-Agent', 'Composer/2');
  });
});
