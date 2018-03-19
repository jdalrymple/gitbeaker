"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Jobs extends _BaseModel.default {
  all(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/jobs`, options);
  }

}

var _default = Jobs;
exports.default = _default;