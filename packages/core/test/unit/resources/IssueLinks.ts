import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { IssueLinks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: IssueLinks;

beforeEach(() => {
  service = new IssueLinks({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('IssueLinks.all', () => {
  it('should request GET projects/:id/issues/:id/links', async () => {
    await service.all(8, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/8/issues/3/links', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('IssueLinks.show', () => {
  it('should request GET projects/:id/issues/:id/links/:id', async () => {
    await service.show(8, 3, 5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/8/issues/3/links/5', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('IssueLinks.create', () => {
  it('should request POST projects/:id/issues/:id/links', async () => {
    await service.create(8, 3, 9, 4);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/8/issues/3/links', {
      body: { targetProjectId: 9, targetIssueIid: 4 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should include linkType when provided', async () => {
    await service.create(8, 3, 9, 4, { linkType: 'blocks' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/8/issues/3/links', {
      body: { linkType: 'blocks', targetProjectId: 9, targetIssueIid: 4 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('IssueLinks.remove', () => {
  it('should request DEL projects/:id/issues/:id/links/:id', async () => {
    await service.remove(8, 3, 5);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/8/issues/3/links/5', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should pass linkType in body when provided', async () => {
    await service.remove(8, 3, 5, { linkType: 'relates_to' });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/8/issues/3/links/5', {
      body: { linkType: 'relates_to' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
