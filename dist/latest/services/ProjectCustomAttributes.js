"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class ProjectCustomAttributes extends _templates.ResourceCustomAttributes {
  constructor(options) {
    super('projects', options);
  }

}

var _default = ProjectCustomAttributes;
exports.default = _default;