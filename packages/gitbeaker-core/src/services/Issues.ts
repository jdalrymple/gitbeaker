import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

type ProjectOrGroup = { projectId?: string | number } | { groupId?: string | number };

export class Issues<C extends boolean = false> extends BaseService<C> {
  addSpentTime(projectId: string | number, issueIid: number, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/issues/${iId}/add_spent_time`, {
      duration,
      ...options,
    });
  }

  addTimeEstimate(projectId: string | number, issueIid: number, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/issues/${iId}/time_estimate`, {
      duration,
      ...options,
    });
  }

  all({ projectId, groupId, ...options }: ProjectOrGroup & PaginatedRequestOptions = {}) {
    let url;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/issues`;
    } else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/issues`;
    } else {
      url = 'issues';
    }

    return RequestHelper.get<C>(this, url, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/issues`, options);
  }

  closedBy(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/issues/${iId}/closed_by`, options);
  }

  edit(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.put<C>(this, `projects/${pId}/issues/${iId}`, options);
  }

  link(
    projectId: string | number,
    issueIid: number,
    targetProjectId: string | number,
    targetIssueIid: number,
    options?: BaseRequestOptions,
  ) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);
    const [targetpId, targetIid] = [targetProjectId, targetIssueIid].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/issues/${iId}/links`, {
      targetProjectId: targetpId,
      targetIssueIid: targetIid,
      ...options,
    });
  }

  links(projectId: string | number, issueIid: number) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/issues/${iId}/links`);
  }

  participants(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/issues/${iId}/participants`, options);
  }

  relatedMergeRequests(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<C>(
      this,
      `projects/${pId}/issues/${iId}/related_merge_requests`,
      options,
    );
  }

  removeLink(
    projectId: string | number,
    issueIid: number,
    issueLinkId: string | number,
    options?: BaseRequestOptions,
  ) {
    const [pId, iId, iLinkId] = [projectId, issueIid, issueLinkId].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `projects/${pId}/issues/${iId}/links/${iLinkId}`, {
      ...options,
    });
  }

  remove(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `projects/${pId}/issues/${iId}`, options);
  }

  resetSpentTime(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/issues/${iId}/reset_spent_time`, options);
  }

  resetTimeEstimate(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<C>(
      this,
      `projects/${pId}/issues/${iId}/reset_time_estimate`,
      options,
    );
  }

  show(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/issues/${iId}`, options);
  }

  subscribe(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/issues/${iId}/subscribe`, options);
  }

  timeStats(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/issues/${iId}/time_stats`, options);
  }

  unsubscribe(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `projects/${pId}/issues/${iId}/unsubscribe`, options);
  }
}
