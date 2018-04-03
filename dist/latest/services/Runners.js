"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

class Runners extends _infrastructure.BaseService {
  all(_ref = {}) {
    let {
      projectId
    } = _ref,
        options = _objectWithoutProperties(_ref, ["projectId"]);

    const url = projectId ? `projects/${encodeURIComponent(projectId)}/runners` : 'runners/all';
    return _infrastructure.RequestHelper.get(this, url, options);
  }

  allOwned(options) {
    return _infrastructure.RequestHelper.get(this, 'runners', options);
  }

  edit(runnerId, attributes) {
    const rId = encodeURIComponent(runnerId);
    return _infrastructure.RequestHelper.put(this, `runners/${rId}`, attributes);
  }

  enable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/runners`, {
      runnerId: rId
    });
  }

  disable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/runners/${rId}`);
  }

  jobs(runnerId) {
    const rId = encodeURIComponent(runnerId);
    return _infrastructure.RequestHelper.get(this, `runners/${rId}/jobs`);
  }

  remove(runnerId) {
    const rId = encodeURIComponent(runnerId);
    return _infrastructure.RequestHelper.delete(this, `runners/${rId}`);
  }

  show(runnerId) {
    const rId = encodeURIComponent(runnerId);
    return _infrastructure.RequestHelper.get(this, `runners/${rId}`);
  }

}

var _default = Runners;
exports.default = _default;