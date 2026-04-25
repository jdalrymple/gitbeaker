import { Tags } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Tags;

beforeEach(() => {
  service = new Tags({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('Tags.all', () => {
  it('should request GET /projects/:id/repository/tags', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/tags', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Tags.create', () => {
  it('should request POST /projects/:id/repository/tags', async () => {
    await service.create(1, 'test', 'main', { message: 'test' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/tags', {
      body: {
        message: 'test',
        ref: 'main',
        tagName: 'test',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Tags.show', () => {
  it('should request GET /projects/:id/repository/tags/:tag_id', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      'projects/1/repository/tags/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Tags.remove', () => {
  it('should request DEL /projects/:id/repository/tags/:tag_id', async () => {
    await service.remove(1, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/repository/tags/name', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
