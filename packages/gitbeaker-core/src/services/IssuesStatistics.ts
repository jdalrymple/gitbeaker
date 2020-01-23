import { BaseService, RequestHelper, BaseRequestOptions } from '../infrastructure';

type ProjectOrGroup = { projectId: string | number } | { groupId: string | number } | {};

export class IssuesStatistics extends BaseService {
  all({ projectId, groupId, ...options }: ProjectOrGroup & BaseRequestOptions = {}) {
    let url;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/issues_statistics`;
    } else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/issues_statistics`;
    } else {
      url = 'issues_statistics';
    }

    return RequestHelper.get(this, url, options);
  }
}
