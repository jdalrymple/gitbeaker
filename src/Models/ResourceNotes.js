const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ResourceNotes extends BaseModel {
  constructor(resourceType, resource2Type, ...args){
    super(...args);

    this.resourceType = resourceType;
    this.resource2Type = resource2Type;
  }

  all(resourceId, resource2Id, options = {}) {
    const [rId, r2Id] = [resourceId, issueIId].map(Utils.parse);

    return this.get(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  create(resourceId, issueIId, options = {}) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id] = [resourceId, issueIId].map(Utils.parse);

    return this.post(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  edit(resourceId, issueIId, noteId, options = {}) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id, nId] = [resourceId, issueIId, noteId].map(Utils.parse);

    return this.put(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  remove(resourceId, issueIId, noteId) {
    const [rId, r2Id, nId] = [resourceId, issueIId, noteId].map(Utils.parse);

    return this.delete(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }

  show(resourceId, issueIId, noteId) {
    const [rId, r2Id, nId] = [resourceId, issueIId, noteId].map(Utils.parse);

    return this.get(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }
}

module.exports = ResourceNotes;
