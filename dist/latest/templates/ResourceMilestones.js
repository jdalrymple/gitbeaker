"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class ResourceMilestones extends _infrastructure.BaseService {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
  }

  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/milestones`, options);
  }

  create(resourceId, title, options) {
    const rId = encodeURIComponent(resourceId);
    return _infrastructure.RequestHelper.post(this, `${this.resourceType}/${rId}/milestones`, options);
  }

  edit(resourceId, milestoneId, options) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `${this.resourceType}/${rId}/milestones/${mId}`, options);
  }

  issues(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/milestones/${mId}/issues`);
  }

  mergeRequests(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/milestones/${mId}/merge_requests`);
  }

  show(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/milestones/${mId}`);
  }

}

var _default = ResourceMilestones;
exports.default = _default;