"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ResourceMilestoneIssues = _interopRequireDefault(require("./ResourceMilestoneIssues"));

var _ResourceMilestoneMergeRequests = _interopRequireDefault(require("./ResourceMilestoneMergeRequests"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceMilestones extends _BaseModel.default {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
    this.issues = new _ResourceMilestoneIssues.default(resourceType, ...args);
    this.mergeRequests = new _ResourceMilestoneMergeRequests.default(resourceType, ...args);
  }

  all(resourceId, options = {}) {
    const rId = (0, _Utils.parse)(resourceId);
    return this.get(`${this.resourceType}/${rId}/milestones`, options);
  }

  create(resourceId, title, options) {
    const rId = (0, _Utils.parse)(resourceId);
    return this.post(`${this.resourceType}/${rId}/milestones`, options);
  }

  edit(resourceId, milestoneId, options) {
    const [rId, mId] = [resourceId, milestoneId].map(_Utils.parse);
    return this.put(`${this.resourceType}/${rId}/milestones/${mId}`, options);
  }

  show(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(_Utils.parse);
    return this.get(`${this.resourceType}/${rId}/milestones/${mId}`);
  }

}

var _default = ResourceMilestones;
exports.default = _default;