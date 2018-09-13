import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type GroupId = string | number;

class Groups extends BaseService {
  all(options: RequestOptions) {
    return RequestHelper.get(this, 'groups', options);
  }

  create(options: RequestOptions) {
    return RequestHelper.post(this, 'groups', options);
  }

  remove(groupId: GroupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.delete(this, `groups/${gId}`);
  }

  search(nameOrPath: string) {
    return RequestHelper.get(this, 'groups', {
      search: nameOrPath,
    });
  }

  show(groupId: GroupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}`);
  }

  subgroups(groupId: GroupId, options: RequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/subgroups`, options);
  }
}

export default Groups;
