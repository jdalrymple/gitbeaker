import { BaseService, PaginatedRequestOptions, RequestHelper } from '../infrastructure';
import { GroupProjectId } from './index';

class GroupLabels extends BaseService {
  all(groupId: GroupProjectId, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/labels`, options);
  }
}

export default GroupLabels;
