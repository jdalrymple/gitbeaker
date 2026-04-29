import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, OneOrNoneOf, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export interface StatisticsSchema extends Record<string, unknown> {
  statistics: {
    counts: {
      all: number;
      closed: number;
      opened: number;
    };
  };
}

export type AllIssueStatisticsOptions = {
  labels?: string;
  milestone?: string;
  scope?: 'created_by_me' | 'assigned_to_me' | 'all';
  epicId?: number;
  myReactionEmoji?: string;
  iids?: number[];
  search?: string;
  in?: string;
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;
  confidential?: boolean;
};

export class IssuesStatistics<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    options?: AllIssueStatisticsOptions &
      OneOrNoneOf<{ assigneeId: number; assigneeUsername: string }> &
      OneOrNoneOf<{ authorId: number; authorUsername: string }> &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<StatisticsSchema, C, E, void>> {
    const { sudo, showExpanded, projectId, groupId, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('issues_statistics', { projects: projectId, groups: groupId });

    return RequestHelper.get<StatisticsSchema>()(this, url, {
      sudo,
      showExpanded,
      searchParams: searchParams as AllIssueStatisticsOptions,
    });
  }
}
