"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RepositoryFiles extends _infrastructure.BaseService {
  create(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/repository/files/${path}`, _objectSpread({
      branch
    }, options));
  }

  edit(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/repository/files/${path}`, _objectSpread({
      branch
    }, options));
  }

  remove(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/repository/files/${path}`, _objectSpread({
      branch
    }, options));
  }

  show(projectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/files/${path}`, {
      ref
    });
  }

  showRaw(projectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/files/${path}/raw`, {
      ref
    });
  }

}

var _default = RepositoryFiles;
exports.default = _default;