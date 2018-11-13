import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo, GroupId, EpicId } from '@src/types';

class Epics extends BaseService {
  all(groupId: GroupId, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/epics`, options);
  }

  create(groupId: GroupId, title: string, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/epics`, { title, ...options });
  }

  edit(groupId: GroupId, epicId: EpicId, options?: BaseRequestOptions) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/epics/${eId}`, options);
  }

  remove(groupId: GroupId, epicId: EpicId, options?: Sudo) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}`, options);
  }

  show(groupId: GroupId, epicId: EpicId, options?: Sudo) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/epics/${eId}`, options);
  }
}

export default Epics;
