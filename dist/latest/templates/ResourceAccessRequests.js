"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ACCESS_LEVELS = void 0;

var _infrastructure = require("../infrastructure");

const ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50
};
exports.ACCESS_LEVELS = ACCESS_LEVELS;

class ResourceAccessRequests extends _infrastructure.BaseService {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
    this.ACCESS_LEVELS = ACCESS_LEVELS;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/access_requests`);
  }

  request(resourceId) {
    const rId = encodeURIComponent(resourceId);
    return _infrastructure.RequestHelper.post(this, `${this.resourceType}/${rId}/access_requests`);
  }

  approve(resourceId, userId, {
    accessLevel = 30
  }) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `${this.resourceType}/${rId}/access_requests/${uId}/approve`, {
      accessLevel
    });
  }

  deny(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `${this.resourceType}/${rId}/access_requests/${uId}/approve`);
  }

}

var _default = ResourceAccessRequests;
exports.default = _default;