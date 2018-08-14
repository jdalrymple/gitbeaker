import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

class ResourceNotes extends BaseService {
  constructor(resourceType, resource2Type, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
    this.resource2Type = resource2Type;
  }

  @api('<resourceId>', '<resource2Id>', { options: true, method: 'GET' })
  all(resourceId, resource2Id, options) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  @api('<resourceId>', '<resource2Id>', { options: true, method: 'POST' })
  create(resourceId, resource2Id, options) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  @api('<resourceId>', '<resource2Id>', '<noteId>', { method: 'PUT' })
  edit(resourceId, resource2Id, noteId, options) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  @api('<resourceId>', '<resource2Id>', '<noteId>', { method: 'DELETE' })
  remove(resourceId, resource2Id, noteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }

  @api('<resourceId>', '<resource2Id>', '<noteId>', { method: 'GET' })
  show(resourceId, resource2Id, noteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }
}

export default ResourceNotes;
