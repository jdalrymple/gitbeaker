"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class GroupMilestones extends _templates.ResourceMilestones {
  constructor(options) {
    super('groups', options);
  }

}

var _default = GroupMilestones;
exports.default = _default;