"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ResourceMembers extends _infrastructure.BaseService {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/members`);
  }

  add(resourceId, userId, accessLevel, options) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `${this.resourceType}/${rId}/members`, _objectSpread({
      user_id: uId,
      access_level: parseInt(accessLevel, 10)
    }, options));
  }

  edit(resourceId, userId, accessLevel, options) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `${this.resourceType}/${rId}/members/${uId}`, _objectSpread({
      access_level: parseInt(accessLevel, 10)
    }, options));
  }

  show(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/members/${uId}`);
  }

  remove(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `${this.resourceType}/${rId}/members/${uId}`);
  }

}

var _default = ResourceMembers;
exports.default = _default;