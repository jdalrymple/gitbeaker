import { BaseService, RequestHelper } from '../infrastructure';

export class Groups extends BaseService {
  all(options = {}) {
    return RequestHelper.get(this, 'groups', options);
  }

  create(options = {}) {
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

  subgroups(groupId, options = {}) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/subgroups`, options);
  }

  // Variables
  createVariable(groupId, options) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/variables`, options);
  }

  editVariable(groupId, keyId, options) {
    const [gId, kId] = [groupId, keyId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/variables/${kId}`, options);
  }

  variables(groupId) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/variables`);
  }

  showVariable(groupId, keyId) {
    const [gId, kId] = [groupId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/variables/${kId}`);
  }

  removeVariable(groupId, keyId) {
    const [gId, kId] = [groupId, keyId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/variables/${kId}`);
  }
}

export default Groups;
