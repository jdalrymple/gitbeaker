"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class GroupCustomAttributes extends _templates.ResourceCustomAttributes {
  constructor(options) {
    super('groups', options);
  }

}

var _default = GroupCustomAttributes;
exports.default = _default;