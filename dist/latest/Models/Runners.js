"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Runners extends _BaseModel.default {
  all(options = {}) {
    return this.get('runners/all', options);
  }

  allOwned(options = {}) {
    return this.get('runners', options);
  }

  edit(runnerId, attributes) {
    const rId = (0, _Utils.parse)(runnerId);
    return this.put(`runners/${rId}`, attributes);
  }

  remove(runnerId) {
    const rId = (0, _Utils.parse)(runnerId);
    return this.delete(`runners/${rId}`);
  }

  show(runnerId) {
    const rId = (0, _Utils.parse)(runnerId);
    return this.get(`runners/${rId}`);
  }

  showJobs(runnerId) {
    const rId = (0, _Utils.parse)(runnerId);
    return this.get(`runners/${rId}/jobs`);
  }

}

var _default = Runners;
exports.default = _default;