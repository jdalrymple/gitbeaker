import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ResourceNotes extends BaseService {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
    this.resource2Type = resource2Type;
  }

  all(resourceId, resource2Id, options) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  create(resourceId, resource2Id, options) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  edit(resourceId, resource2Id, noteId: NoteId, options) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  remove(resourceId, resource2Id, noteId: NoteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }

  show(resourceId, resource2Id, noteId: NoteId) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`);
  }
}

export default ResourceNotes;
