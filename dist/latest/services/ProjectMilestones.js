"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class ProjectMilestones extends _templates.ResourceMilestones {
  constructor(options) {
    super('projects', options);
  }

}

var _default = ProjectMilestones;
exports.default = _default;