"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class ProjectMembers extends _templates.ResourceMembers {
  constructor(options) {
    super('projects', options);
  }

}

var _default = ProjectMembers;
exports.default = _default;