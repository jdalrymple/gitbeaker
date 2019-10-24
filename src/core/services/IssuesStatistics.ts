import { BaseService, RequestHelper, BaseRequestOptions } from '../infrastructure';
import { GroupId, ProjectId } from '.';

class IssuesStatistics extends BaseService {
  all({
    projectId,
    groupId,
    ...options
  }: ({ projectId?: ProjectId } | { groupId?: GroupId } | {}) & BaseRequestOptions = {}) {
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

export default IssuesStatistics;
