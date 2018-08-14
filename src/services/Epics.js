import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Epics extends BaseService {
  @api('<groupId>', { method: 'GET' })
  all(groupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/epics`);
  }

  @api('<groupId>', '<title>', { options: true, method: 'POST' })
  create(groupId, title, options) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/epics`, { title, ...options });
  }

  @api('<groupId>', '<epicId>', { options: true, method: 'PUT' })
  edit(groupId, epicId, options) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/epics/${eId}`, options);
  }

  @api('<groupId>', '<epicId>', { method: 'DELETE' })
  remove(groupId, epicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}`);
  }

  @api('<groupId>', '<epicId>', { method: 'GET' })
  show(groupId, epicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/epics/${eId}`);
  }
}

export default Epics;
