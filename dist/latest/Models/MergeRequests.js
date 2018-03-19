"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MergeRequests extends _BaseModel.default {
  all(options = {}) {
    return this.get('merge_requests', options);
  }

}

var _default = MergeRequests;
exports.default = _default;