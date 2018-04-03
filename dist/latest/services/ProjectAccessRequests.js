"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class ProjectAccessRequests extends _templates.ResourceAccessRequests {
  constructor(options) {
    super('projects', options);
  }

}

var _default = ProjectAccessRequests;
exports.default = _default;