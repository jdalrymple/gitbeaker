import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Pages } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Pages;

beforeEach(() => {
  service = new Pages({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Pages.show', () => {
  it('should request GET /projects/:id/pages', async () => {
    await service.show(1, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/pages', {
      sudo: 'u',
      showExpanded: true,
    });
  });
});

describe('Pages.edit', () => {
  it('should request PATCH /projects/:id/pages', async () => {
    await service.edit(1, { pagesHttpsOnly: true, sudo: 'u', showExpanded: true });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'projects/1/pages', {
      sudo: 'u',
      showExpanded: true,
      body: { pagesHttpsOnly: true },
    });
  });

  it('should work without options', async () => {
    await service.edit(1);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'projects/1/pages', {
      sudo: undefined,
      showExpanded: undefined,
      body: {},
    });
  });
});

describe('Pages.remove', () => {
  it('should request DELETE /projects/:id/pages', async () => {
    await service.remove('a/b', { sudo: 'u', showExpanded: true });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/a%2Fb/pages', {
      sudo: 'u',
      showExpanded: true,
    });
  });
});
