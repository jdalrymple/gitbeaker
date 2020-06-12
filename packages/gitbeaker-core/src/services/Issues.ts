import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

type ProjectOrGroup = { projectId: string | number } | { groupId: string | number } | {};

export class Issues extends BaseService {
  addSpentTime(projectId: string | number, issueId: number, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/add_spent_time`, {
      duration,
      ...options,
    });
  }

  addTimeEstimate(projectId: string | number, issueId: number, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/time_estimate`, {
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

    return RequestHelper.get(this, url, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/issues`, options);
  }

  edit(projectId: string | number, issueId: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/issues/${iId}`, options);
  }
  
  links(projectId: string | number, issueIId: number) {
    const [pId, iId] = [projectId, issueIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}/links`);
  }

  link(
    projectId: string | number,
    issueIId: number,
    targetProjectId: string | number,
    targetIssueId: number,
    options?: BaseRequestOptions,
  ) {
    const [pId, iId] = [projectId, issueIId].map(encodeURIComponent);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/links`, {
      targetProjectId: targetpId,
      targetIssueId: targetIId,
      ...options,
    });
  }
  
  removeLink(
    projectId: string | number,
    issueIId: number,
    issueLinkId: string | number,
    options?: BaseRequestOptions,
  ) {
    const [pId, iId, iLinkId] = [projectId, issueIId, issueLinkId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/issues/${iId}/links/${iLinkId}`, {
      ...options,
    });
  }

  participants(projectId: string | number, issueId: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}/participants`, options);
  }

  remove(projectId: string | number, issueId: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/issues/${iId}`, options);
  }

  resetSpentTime(projectId: string | number, issueId: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/reset_spent_time`, options);
  }

  resetTimeEstimate(projectId: string | number, issueId: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/reset_time_estimate`, options);
  }

  show(projectId: string | number, issueId: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}`, options);
  }

  subscribe(projectId: string | number, issueId: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/subscribe`, options);
  }

  timeStats(projectId: string | number, issueId: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}/time_stats`, options);
  }

  unsubscribe(projectId: string | number, issueId: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/issues/${iId}/unsubscribe`, options);
  }
}
