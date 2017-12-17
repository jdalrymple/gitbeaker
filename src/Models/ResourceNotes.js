import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ResourceNotes extends BaseModel {
  constructor(resourceType, resource2Type, ...args) {
    super(...args);

    this.resourceType = resourceType;
    this.resource2Type = resource2Type;
  }

  all(resourceId, resource2Id, options = {}) {
    const [rId, r2Id] = [resourceId, resource2Id].map(parse);

    return this.get(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  create(resourceId, resource2Id, options = {}) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id] = [resourceId, resource2Id].map(parse);

    return this.post(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  edit(resourceId, resource2Id, noteId, options = {}) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(parse);

    return this.put(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  remove(resourceId, resource2Id, noteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(parse);

    return this.delete(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }

  show(resourceId, resource2Id, noteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(parse);

    return this.get(`${this.resourceType}/${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }
}

export default ResourceNotes;
