import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type GroupId = string | number;
export type EpicId = string | number;
class Epics extends BaseService {
  all(groupId: GroupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/epics`);
  }

  create(groupId: GroupId, title: string, options: RequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/epics`, { title, ...options });
  }

  edit(groupId: GroupId, epicId: EpicId, options: RequestOptions) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/epics/${eId}`, options);
  }

  remove(groupId: GroupId, epicId: EpicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}`);
  }

  show(groupId: GroupId, epicId: EpicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/epics/${eId}`);
  }
}

export default Epics;
