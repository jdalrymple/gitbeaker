"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceMembers extends _BaseModel.default {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = (0, _Utils.parse)(resourceId);
    return this.get(`${this.resourceType}/${rId}/members`);
  }

  add(resourceId, userId, accessLevel) {
    const [rId, uId] = [resourceId, userId].map(_Utils.parse);
    return this.post(`${this.resourceType}/${rId}/members`, {
      user_id: uId,
      access_level: parseInt(accessLevel, 10)
    });
  }

  edit(resourceId, userId, accessLevel) {
    const [rId, uId] = [resourceId, userId].map(_Utils.parse);
    return this.put(`${this.resourceType}/${rId}/members/${uId}`, {
      access_level: parseInt(accessLevel, 10)
    });
  }

  show(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(_Utils.parse);
    return this.get(`${this.resourceType}/${rId}/members/${uId}`);
  }

  remove(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(_Utils.parse);
    return this.delete(`${this.resourceType}/${rId}/members/${uId}`);
  }

}

var _default = ResourceMembers;
exports.default = _default;