import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions, endpoint } from '../infrastructure';

export interface StatisticsSchema extends Record<string, unknown> {
  statistics: {
    counts: {
      all: number;
      closed: number;
      opened: number;
    };
  };
}

export class IssuesStatistics<C extends boolean = false> extends BaseResource<C> {
  all({
    projectId,
    groupId,
    ...options
  }: { projectId?: string | number; groupId?: string | number } & BaseRequestOptions = {}) {
    let url: string;

    if (projectId) {
      url = endpoint`projects/${projectId}/issues_statistics`;
    } else if (groupId) {
      url = endpoint`groups/${groupId}/issues_statistics`;
    } else {
      url = 'issues_statistics';
    }

    return RequestHelper.get<StatisticsSchema>()(this, url, options);
  }
}
