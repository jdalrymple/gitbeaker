"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class GroupVariables extends _templates.ResourceVariables {
  constructor(options) {
    super('groups', options);
  }

}

var _default = GroupVariables;
exports.default = _default;