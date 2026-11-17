import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupActivityAnalytics } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupActivityAnalytics;

beforeEach(() => {
  service = new GroupActivityAnalytics({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupActivityAnalytics.showIssuesCount', () => {
  it('should request GET analytics/group_activity/issues_count', async () => {
    await service.showIssuesCount('grp');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'analytics/group_activity/issues_count',
      {
        searchParams: { groupPath: 'grp' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('GroupActivityAnalytics.showMergeRequestsCount', () => {
  it('should request GET analytics/group_activity/merge_requests_count', async () => {
    await service.showMergeRequestsCount('grp');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'analytics/group_activity/merge_requests_count',
      {
        searchParams: { groupPath: 'grp' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('GroupActivityAnalytics.showNewMembersCount', () => {
  it('should request GET analytics/group_activity/new_members_count', async () => {
    await service.showNewMembersCount('grp');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'analytics/group_activity/new_members_count',
      {
        searchParams: { groupPath: 'grp' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
