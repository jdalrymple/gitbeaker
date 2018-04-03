"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

class MergeRequests extends _infrastructure.BaseService {
  accept(projectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/merge`, options);
  }

  approve(projectId, mergerequestId, {
    sha
  }) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`, {
      sha
    });
  }

  approvals(projectId, {
    mergerequestId
  } = {}) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/${mergeRequest}/approvals`);
  }

  all(_ref = {}) {
    let {
      projectId
    } = _ref,
        options = _objectWithoutProperties(_ref, ["projectId"]);

    const url = projectId ? `projects/${encodeURIComponent(projectId)}/merge_requests` : 'merge_requests';
    return _infrastructure.RequestHelper.get(this, url, options);
  }

  cancelOnPipelineSucess(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/cancel_merge_when_pipeline_succeeds`);
  }

  changes(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/changes`);
  }

  closesIssues(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/closes_issues`);
  }

  commits(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/commits`);
  }

  create(projectId, sourceBranch, targetBranch, title, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests`, _objectSpread({
      id: pId,
      sourceBranch,
      targetBranch,
      title
    }, options));
  }

  edit(projectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}`, options);
  }

  editApprovals(projectId, _ref2) {
    let {
      mergerequestId
    } = _ref2,
        options = _objectWithoutProperties(_ref2, ["mergerequestId"]);

    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}/` : '';
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/${mergeRequest}approvals`, options);
  }

  editApprovers(projectId, _ref3) {
    let {
      mergerequestId
    } = _ref3,
        options = _objectWithoutProperties(_ref3, ["mergerequestId"]);

    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}/` : '';
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/${mergeRequest}approvers`, options);
  }

  remove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}`);
  }

  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}`);
  }

  subscribe(projectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/subscribe`, options);
  }

  resetSpentTime(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_spent_time`);
  }

  resetTimeEstimate(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_time_estimate`);
  }

  spentTime(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/add_spent_time`, {
      duration
    });
  }

  timeEstimate(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/time_estimate`, {
      duration
    });
  }

  timeStats(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/time_stats`);
  }

  version(projectId, mergerequestId, versionId) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions/${vId}`);
  }

  versions(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions`);
  }

  unapprove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`);
  }

  unsubscribe(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}/unsubscribe`);
  }

}

var _default = MergeRequests;
exports.default = _default;