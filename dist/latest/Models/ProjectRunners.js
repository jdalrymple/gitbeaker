"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectRunners extends _BaseModel.default {
  all(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/runners`, options);
  }

  enable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(_Utils.parse);
    return this.post(`projects/${pId}/runners`, {
      runner_id: rId
    });
  }

  disable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(_Utils.parse);
    return this.delete(`projects/${pId}/runners/${rId}`);
  }

}

var _default = ProjectRunners;
exports.default = _default;