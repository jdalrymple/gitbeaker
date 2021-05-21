import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema, MergeRequestSchema, TimeStatsSchema, IssueSchema } from '../models';

import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

type ProjectOrGroup = { projectId?: string | number; groupId?: string | number };

export class Issues<C extends boolean = false> extends BaseService<C> {
  addSpentTime(projectId: string | number, issueIid: number, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/add_spent_time`,
      {
        duration,
        ...options,
      },
    );
  }

  addTimeEstimate(projectId: string | number, issueIid: number, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/time_estimate`,
      {
        duration,
        ...options,
      },
    );
  }

  all({ projectId, groupId, ...options }: ProjectOrGroup & PaginatedRequestOptions = {}) {
    let url: string;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/issues`;
    } else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/issues`;
    } else {
      url = 'issues';
    }

    return RequestHelper.get<Omit<IssueSchema, 'epic'>[]>()(this, url, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<IssueSchema>()(this, `projects/${pId}/issues`, options);
  }

  closedBy(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      `projects/${pId}/issues/${iId}/closed_by`,
      options,
    );
  }

  edit(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.put<IssueSchema>()(this, `projects/${pId}/issues/${iId}`, options);
  }

  // TODO move
  link(
    projectId: string | number,
    issueIId: number,
    targetProjectId: string | number,
    targetIssueIId: number,
    options?: BaseRequestOptions,
  ) {
    const [pId, iIId] = [projectId, issueIId].map(encodeURIComponent);
    const [targetPId, targetIId] = [targetProjectId, targetIssueIId].map(encodeURIComponent);

    return RequestHelper.post()(this, `projects/${pId}/issues/${iIId}/links`, {
      targetProjectId: targetPId,
      targetIssueIid: targetIId,
      ...options,
    });
  }

  // TODO move
  links(projectId: string | number, issueIid: number) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get()(this, `projects/${pId}/issues/${iId}/links`);
  }

  participants(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<Omit<UserSchema, 'created_at'>>()(
      this,
      `projects/${pId}/issues/${iId}/participants`,
      options,
    );
  }

  relatedMergeRequests(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestSchema>()(
      this,
      `projects/${pId}/issues/${iId}/related_merge_requests`,
      options,
    );
  }

  // TODO move
  removeLink(
    projectId: string | number,
    issueIid: number,
    issueLinkId: string | number,
    options?: BaseRequestOptions,
  ) {
    const [pId, iId, iLinkId] = [projectId, issueIid, issueLinkId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/issues/${iId}/links/${iLinkId}`, {
      ...options,
    });
  }

  remove(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/issues/${iId}`, options);
  }

  resetSpentTime(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/reset_time_estimate`,
      options,
    );
  }

  show(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<IssueSchema>()(this, `projects/${pId}/issues/${iId}`, options);
  }

  subscribe(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<IssueSchema>()(
      this,
      `projects/${pId}/issues/${iId}/subscribe`,
      options,
    );
  }

  timeStats(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/time_stats`,
      options,
    );
  }

  unsubscribe(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<IssueSchema>()(
      this,
      `projects/${pId}/issues/${iId}/unsubscribe`,
      options,
    );
  }
}
