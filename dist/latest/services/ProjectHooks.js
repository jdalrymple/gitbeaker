"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ProjectHooks extends _infrastructure.BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/hooks`, options);
  }

  show(projectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/hooks/${hId}`);
  }

  add(projectId, url, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/hooks`, _objectSpread({
      url
    }, options));
  }

  edit(projectId, hookId, url, options) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/hooks/${hId}`, _objectSpread({
      url
    }, options));
  }

  remove(projectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/hooks/${hId}`);
  }

}

var _default = ProjectHooks;
exports.default = _default;