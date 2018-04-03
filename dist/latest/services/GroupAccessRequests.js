"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templates = require("../templates");

class GroupAccessRequests extends _templates.ResourceAccessRequests {
  constructor(options) {
    super('groups', options);
  }

}

var _default = GroupAccessRequests;
exports.default = _default;