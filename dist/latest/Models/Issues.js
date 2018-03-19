"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Issues extends _BaseModel.default {
  all(options = {}) {
    return this.get('issues', options);
  }

}

var _default = Issues;
exports.default = _default;