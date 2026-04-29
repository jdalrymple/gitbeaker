import { EpicLinks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: EpicLinks;

beforeEach(() => {
  service = new EpicLinks({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('EpicLinks.all', () => {
  it('should request GET /groups/:id/epics/:id/links', async () => {
    await service.all(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/epics/2/links', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('EpicLinks.assign', () => {
  it('should request POST /groups/:id/epics/:id/links/:id', async () => {
    await service.assign(1, 2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/epics/2/links/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('EpicLinks.create', () => {
  it('should request POST /groups/:id/epics/:id/links', async () => {
    await service.create(1, 2, 'Testing epic links', { confidential: false });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/epics/2/links', {
      body: {
        confidential: false,
      },
      searchParams: {
        title: 'Testing epic links',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('EpicLinks.reorder', () => {
  it('should request PUT /groups/:id/epics/:id/links/:id', async () => {
    await service.reorder(1, 2, 3, { moveBeforeId: 3, moveAfterId: 1 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/1/epics/2/links/3', {
      body: {
        moveBeforeId: 3,
        moveAfterId: 1,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('EpicLinks.unassign', () => {
  it('should request DEL /groups/:id/epics/:id/links/:id', async () => {
    await service.unassign(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/epics/2/links/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
