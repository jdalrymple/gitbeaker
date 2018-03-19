"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GroupProjects extends _BaseModel.default {
  all(groupId, options = {}) {
    const gId = (0, _Utils.parse)(groupId);
    return this.get(`groups/${gId}/projects`, options);
  }

  add(groupId, projectId) {
    const [gId, pId] = [groupId, projectId].map(_Utils.parse);
    return this.post(`groups/${gId}/projects/${pId}`);
  }

}

var _default = GroupProjects;
exports.default = _default;