import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { EitherOrNone, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface StatisticsSchema extends Record<string, unknown> {
  statistics: {
    counts: {
      all: number;
      closed: number;
      opened: number;
    };
  };
}

export interface AllIssueStatisticsOptions
  extends Either<{ authorId: number }, { authorUsername: string }>,
    Either<{ assigneeId: number }, { assigneeUsername: string }> {
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
}

export class IssuesStatistics<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    {
      projectId,
      groupId,
      ...options
    }: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      AllIssueStatisticsOptions &
      Sudo &
      ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<StatisticsSchema, C, E, void>> {
    let url: string;

    if (projectId) url = endpoint`projects/${projectId}/issues_statistics`;
    else if (groupId) url = endpoint`groups/${groupId}/issues_statistics`;
    else url = 'issues_statistics';

    return RequestHelper.get<StatisticsSchema>()(this, url, options);
  }
}
