"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceNotes extends _BaseModel.default {
  constructor(resourceType, resource2Type, ...args) {
    super(...args);
    this.resourceType = resourceType;
    this.resource2Type = resource2Type;
  }

  all(resourceId, resource2Id, options = {}) {
    const [rId, r2Id] = [resourceId, resource2Id].map(_Utils.parse);
    return this.get(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  create(resourceId, resource2Id, options = {}) {
    if (!options.body) throw new Error('Missing required property: body');
    const [rId, r2Id] = [resourceId, resource2Id].map(_Utils.parse);
    return this.post(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  edit(resourceId, resource2Id, noteId, options = {}) {
    if (!options.body) throw new Error('Missing required property: body');
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(_Utils.parse);
    return this.put(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  remove(resourceId, resource2Id, noteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(_Utils.parse);
    return this.delete(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }

  show(resourceId, resource2Id, noteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(_Utils.parse);
    return this.get(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }

}

var _default = ResourceNotes;
exports.default = _default;