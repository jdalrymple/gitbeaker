"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Labels extends _infrastructure.BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/labels`, options);
  }

  create(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/labels`, options);
  }

  edit(projectId, labelName, options = {}) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/labels`, _objectSpread({
      name: labelName
    }, options));
  }

  remove(projectId, labelName) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/labels`, {
      name: labelName
    });
  }

  subscribe(projectId, labelId, options = {}) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(projectId, labelId) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/issues/${lId}/unsubscribe`);
  }

}

var _default = Labels;
exports.default = _default;