import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';

export interface GroupAnalyticsIssuesCountSchema extends Record<string, unknown> {
  issues_count: number;
}

export interface GroupAnalyticsMRsCountSchema extends Record<string, unknown> {
  merge_requests_count: number;
}

export interface GroupAnalyticsNewMembersCountSchema extends Record<string, unknown> {
  new_members_count: number;
}

export class GroupActivityAnalytics<C extends boolean = false> extends BaseResource<C> {
  showIssuesCount<E extends boolean = false>(
    groupPath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupAnalyticsIssuesCountSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupAnalyticsIssuesCountSchema>()(
      this,
      'analytics/group_activity/issues_count',
      {
        sudo,
        showExpanded,
        searchParams: {
          groupPath,
        },
      },
    );
  }

  showMergeRequestsCount<E extends boolean = false>(
    groupPath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupAnalyticsMRsCountSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupAnalyticsMRsCountSchema>()(
      this,
      'analytics/group_activity/merge_requests_count',
      {
        sudo,
        showExpanded,
        searchParams: {
          groupPath,
        },
      },
    );
  }

  showNewMembersCount<E extends boolean = false>(
    groupPath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupAnalyticsNewMembersCountSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupAnalyticsNewMembersCountSchema>()(
      this,
      'analytics/group_activity/new_members_count',
      {
        sudo,
        showExpanded,
        searchParams: {
          groupPath,
        },
      },
    );
  }
}
