"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceCustomAttributes extends _BaseModel.default {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = (0, _Utils.parse)(resourceId);
    return this.get(`${this.resourceType}/${rId}/custom_attributes`);
  }

  set(resourceId, customAttributeId, value) {
    const [rId, cId] = [resourceId, customAttributeId].map(_Utils.parse);
    return this.put(`${this.resourceType}/${rId}/custom_attributes/${cId}`, {
      value
    });
  }

  remove(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(_Utils.parse);
    return this.delete(`${this.resourceType}/${rId}/custom_attributes/${cId}`);
  }

  show(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(_Utils.parse);
    return this.get(`${this.resourceType}/${rId}/custom_attributes/${cId}`);
  }

}

var _default = ResourceCustomAttributes;
exports.default = _default;