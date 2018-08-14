import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Groups extends BaseService {
  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, 'groups', options);
  }

  @api({ options: true, method: 'POST' })
  create(options) {
    return RequestHelper.post(this, 'groups', options);
  }

  @api('<groupId>', { method: 'DELETE' })
  remove(groupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.delete(this, `groups/${gId}`);
  }

  @api('<nameOrPath>', { method: 'GET' })
  search(nameOrPath) {
    return RequestHelper.get(this, 'groups', {
      search: nameOrPath,
    });
  }

  @api('<groupId>', { method: 'GET' })
  show(groupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}`);
  }

  @api('<groupId>', { options: true, method: 'GET' })
  subgroups(groupId, options) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/subgroups`, options);
  }
}

export default Groups;
