"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class ResourceVariables extends _infrastructure.BaseService {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/s`);
  }

  create(resourceId, options) {
    const rId = encodeURIComponent(resourceId);
    return _infrastructure.RequestHelper.post(this, `${this.resourceType}/${rId}/s`, options);
  }

  edit(resourceId, keyId, options) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `${this.resourceType}/${rId}/s/${kId}`, options);
  }

  show(resourceId, keyId) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/s/${kId}`);
  }

  remove(resourceId, keyId) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `${this.resourceType}/${rId}/s/${kId}`);
  }

}

var _default = ResourceVariables;
exports.default = _default;