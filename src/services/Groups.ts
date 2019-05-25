import { BaseService, RequestHelper } from '../infrastructure';

class Groups extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'groups', options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'groups', options);
  }

  remove(groupId: GroupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.delete(this, `groups/${gId}`);
  }

  edit(groupId: GroupId, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.put(this, `groups/${gId}`, options);
  }

  remove(groupId: GroupId, options?: Sudo) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.del(this, `groups/${gId}`, options);
  }


  search(nameOrPath: string, options?: Sudo) {
    return RequestHelper.get(this, 'groups', {
      search: nameOrPath,
      ...options,
    });
  }

  show(groupId: GroupId, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}`, options);
  }

  subgroups(groupId: GroupId, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/subgroups`, options);
  }
}

export default Groups;
