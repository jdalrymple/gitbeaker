import { BaseService, RequestHelper } from '../infrastructure';

class Groups extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'groups', options);
  }

  create(options) {
    return RequestHelper.post(this, 'groups', options);
  }

  remove(groupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.delete(this, `groups/${gId}`);
  }

  search(nameOrPath) {
    return RequestHelper.get(this, 'groups', {
      search: nameOrPath,
    });
  }

  show(groupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}`);
  }

  subgroups(groupId, options) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/subgroups`, options);
  }
}

export default Groups;
