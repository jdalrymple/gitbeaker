import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ReleaseLinks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ReleaseLinks;

beforeEach(() => {
  service = new ReleaseLinks({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ReleaseLinks.all', () => {
  it('should request GET /projects/:id/releases/:id/assets/links', async () => {
    await service.all(1, 'tag');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ReleaseLinks.create', () => {
  it('should request POST /projects/:id/releases/:id/assets/links', async () => {
    await service.create(1, 'tag', 'name', 'url');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links',
      { body: { name: 'name', url: 'url' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ReleaseLinks.edit', () => {
  it('should request PUT /projects/:id/releases/:id/assets/links/:id', async () => {
    await service.edit(1, 'tag', 2, { name: 'new name' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links/2',
      { body: { name: 'new name' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ReleaseLinks.remove', () => {
  it('should request DELETE /projects/:id/releases/:id/assets/links/:id', async () => {
    await service.remove(1, 'tag', 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ReleaseLinks.show', () => {
  it('should request GET /projects/:id/releases/:id/assets/links/:id', async () => {
    await service.show(1, 'tag', 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/releases/tag/assets/links/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
