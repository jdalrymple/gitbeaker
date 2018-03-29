import { BaseService, RequestHelper } from '../infrastructure';

class Epics extends BaseService {
  all(groupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/epics`);
  }

  create(groupId, title, options) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/epics`, { title, ...options });
  }

  edit(groupId, epicId, options) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/epics/${eId}`, options);
  }

  remove(groupId, epicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}`);
  }

  show(groupId, epicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/epics/${eId}`);
  }
}

export default Epics;
