"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class UserCustomAttributes extends _templates.ResourceCustomAttributes {
  constructor(options) {
    super('users', options);
  }

}

var _default = UserCustomAttributes;
exports.default = _default;