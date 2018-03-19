"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _GroupProjects = _interopRequireDefault(require("./GroupProjects"));

var _ResourceAccessRequests = _interopRequireDefault(require("./ResourceAccessRequests"));

var _ResourceCustomAttributes = _interopRequireDefault(require("./ResourceCustomAttributes"));

var _ResourceMembers = _interopRequireDefault(require("./ResourceMembers"));

var _ResourceMilestones = _interopRequireDefault(require("./ResourceMilestones"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Groups extends _BaseModel.default {
  constructor(...args) {
    super(...args);
    this.projects = new _GroupProjects.default(...args);
    this.accessRequests = new _ResourceAccessRequests.default('groups', ...args);
    this.customAttributes = new _ResourceCustomAttributes.default('groups', ...args);
    this.members = new _ResourceMembers.default('groups', ...args);
    this.milestones = new _ResourceMilestones.default('groups', ...args);
  }

  all(options = {}) {
    return this.get('groups', options);
  }

  allSubgroups(groupId, options = {}) {
    const gId = (0, _Utils.parse)(groupId);
    return this.get(`groups/${gId}/subgroups`, options);
  }

  show(groupId) {
    const gId = (0, _Utils.parse)(groupId);
    return this.get(`groups/${gId}`);
  }

  create(options = {}) {
    return this.post('groups', options);
  }

  remove(groupId) {
    const gId = (0, _Utils.parse)(groupId);
    return this.delete(`groups/${gId}`);
  }

  search(nameOrPath) {
    return this.get('groups', {
      search: nameOrPath
    });
  }

}

var _default = Groups;
exports.default = _default;