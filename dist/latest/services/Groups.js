"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Groups extends _infrastructure.BaseService {
  all(options) {
    return _infrastructure.RequestHelper.get(this, 'groups', options);
  }

  create(options) {
    return _infrastructure.RequestHelper.post(this, 'groups', options);
  }

  remove(groupId) {
    const gId = encodeURIComponent(groupId);
    return _infrastructure.RequestHelper.delete(this, `groups/${gId}`);
  }

  search(nameOrPath) {
    return _infrastructure.RequestHelper.get(this, 'groups', {
      search: nameOrPath
    });
  }

  show(groupId) {
    const gId = encodeURIComponent(groupId);
    return _infrastructure.RequestHelper.get(this, `groups/${gId}`);
  }

  subgroups(groupId, options) {
    const gId = encodeURIComponent(groupId);
    return _infrastructure.RequestHelper.get(this, `groups/${gId}/subgroups`, options);
  }

}

var _default = Groups;
exports.default = _default;