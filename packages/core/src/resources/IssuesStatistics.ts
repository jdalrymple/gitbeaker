import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, getPrefixedUrl } from '../infrastructure';
import type { GitlabAPIResponse, OneOrNoneOf, ShowExpanded, Sudo } from '../infrastructure';

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
    {
      projectId,
      groupId,
      ...options
    }: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      OneOrNoneOf<{ authorId: number; authorUsername: string }> &
      OneOrNoneOf<{ assigneeId: number; assigneeUsername: string }> &
      AllIssueStatisticsOptions &
      Sudo &
      ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<StatisticsSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options;
    const url = getPrefixedUrl('issues_statistics', { projects: projectId, groups: groupId });

    return RequestHelper.get<StatisticsSchema>()(this, url, {
      sudo,
      showExpanded,
      searchParams: searchParams as AllIssueStatisticsOptions,
    });
  }
}
