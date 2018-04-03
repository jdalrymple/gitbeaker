"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

class Issues extends _infrastructure.BaseService {
  all(_ref) {
    let {
      projectId
    } = _ref,
        options = _objectWithoutProperties(_ref, ["projectId"]);

    const url = projectId ? `projects/${encodeURIComponent(projectId)}/issues` : 'issues';
    return _infrastructure.RequestHelper.get(this, url, options);
  }

  create(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/issues`, options);
  }

  edit(projectId, issueId, options) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/issues/${iId}`, options);
  }

  link(projectId, issueIId, targetProjectId, targetIssueId, options = {}) {
    const [pId, iId] = [projectId, issueIId].map(encodeURIComponent);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/issues/${iId}/links`, _objectSpread({
      targetProjectId: targetpId,
      targetIssueId: targetIId
    }, options));
  }

  remove(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/issues/${iId}`);
  }

  show(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/issues/${iId}`);
  }

  subscribe(projectId, issueId, options) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/issues/${iId}/subscribe`, options);
  }

  unsubscribe(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/issues/${iId}/unsubscribe`);
  }

}

var _default = Issues;
exports.default = _default;