"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Version extends _infrastructure.BaseService {
  show() {
    return _infrastructure.RequestHelper.get(this, 'version');
  }

}

var _default = Version;
exports.default = _default;