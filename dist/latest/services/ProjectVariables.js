"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class ProjectVariables extends _templates.ResourceVariables {
  constructor(options) {
    super('projects', options);
  }

}

var _default = ProjectVariables;
exports.default = _default;