"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class GroupProjects extends _infrastructure.BaseService {
  all(groupId, options) {
    const gId = encodeURIComponent(groupId);
    return _infrastructure.RequestHelper.get(this, `groups/${gId}/projects`, options);
  }

  add(groupId, projectId) {
    const [gId, pId] = [groupId, projectId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `groups/${gId}/projects/${pId}`);
  }

}

var _default = GroupProjects;
exports.default = _default;