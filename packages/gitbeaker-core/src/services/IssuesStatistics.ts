import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions } from '../infrastructure';

type ProjectOrGroup = { projectId?: string | number; groupId?: string | number };

export class IssuesStatistics<C extends boolean = false> extends BaseService<C> {
  all({ projectId, groupId, ...options }: ProjectOrGroup & BaseRequestOptions = {}) {
    let url;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/issues_statistics`;
    } else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/issues_statistics`;
    } else {
      url = 'issues_statistics';
    }

    return RequestHelper.get()(this, url, options);
  }
}
