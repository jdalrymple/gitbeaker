"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class ResourceNotes extends _infrastructure.BaseService {
  constructor(resourceType, resource2Type, ...args) {
    super(...args);
    this.resourceType = resourceType;
    this.resource2Type = resource2Type;
  }

  all(resourceId, resource2Id, options) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  create(resourceId, resource2Id, options) {
    if (!options.body) throw new Error('Missing required property: body');
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  edit(resourceId, resource2Id, noteId, options) {
    if (!options.body) throw new Error('Missing required property: body');
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  remove(resourceId, resource2Id, noteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }

  show(resourceId, resource2Id, noteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }

}

var _default = ResourceNotes;
exports.default = _default;