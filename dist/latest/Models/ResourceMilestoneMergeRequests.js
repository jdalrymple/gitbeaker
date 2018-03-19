"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceMilestoneMergeRequests extends _BaseModel.default {
  constructor(resourceType, ...args) {
    super(...args);
    this.resourceType = resourceType;
  }

  all(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(_Utils.parse);
    return this.get(`${this.resourceType}/${rId}/milestones/${mId}/merge_requests`);
  }

}

var _default = ResourceMilestoneMergeRequests;
exports.default = _default;