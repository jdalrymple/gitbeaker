"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class ResourceCustomAttributes extends _infrastructure.BaseService {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/custom_attributes`);
  }

  set(resourceId, customAttributeId, value) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `${this.resourceType}/${rId}/custom_attributes/${cId}`, {
      value
    });
  }

  remove(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `${this.resourceType}/${rId}/custom_attributes/${cId}`);
  }

  show(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/custom_attributes/${cId}`);
  }

}

var _default = ResourceCustomAttributes;
exports.default = _default;