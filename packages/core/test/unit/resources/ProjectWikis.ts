import { ProjectWikis } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: ProjectWikis;

beforeEach(() => {
  service = new ProjectWikis({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('ProjectWikis instantiation', () => {
  it('should incude projects as a prefixUrl', () => {
    expect(service.url.split('/').pop()).toBe('projects');
  });
});

describe('ProjectWikis.all', () => {
  it('should request GET /projects/:id/wikis', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/wikis', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectWikis.create', () => {
  it('should request POST /projects/:id/wikis', async () => {
    await service.create(1, 'content', 'title');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, '1/wikis', {
      body: {
        content: 'content',
        title: 'title',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectWikis.edit', () => {
  it('should request PUT /projects/:id/wikis/:slug', async () => {
    await service.edit(1, 'slug');

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, '1/wikis/slug', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectWikis.show', () => {
  it('should request GET /projects/:id/wikis/:slug', async () => {
    await service.show(1, 'slug');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, '1/wikis/slug', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectWikis.remove', () => {
  it('should request DEL /projects/:id/wikis/:slug', async () => {
    await service.remove(1, 'slug');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '1/wikis/slug', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
