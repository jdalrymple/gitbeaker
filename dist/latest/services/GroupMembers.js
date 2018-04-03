"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class GroupMembers extends _templates.ResourceMembers {
  constructor(options) {
    super('groups', options);
  }

}

var _default = GroupMembers;
exports.default = _default;