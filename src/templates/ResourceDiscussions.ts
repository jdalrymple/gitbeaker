import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ResourceDiscussions extends BaseService {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
    this.resource2Type = resource2Type;
  }

  addNote(resourceId: string, resource2Id: string, discussiodId: string, noteId: NoteId, options) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussiodId, noteId]
      .map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`, options);
  }

  all(resourceId, resource2Id, options) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/discussions`, options);
  }

  create(resourceId, resource2Id, options) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/${this.resource2Type}/${r2Id}/discussions`, options);
  }

  editNote(resourceId, resource2Id, discussiodId, noteId: NoteId, body) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussiodId, noteId]
      .map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`, { body });
  }

  removeNote(resourceId, resource2Id, discussiodId, noteId: NoteId) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussiodId, noteId]
      .map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`);
  }

  show(resourceId, resource2Id, discussiodId) {
    const [rId, r2Id, dId] = [resourceId, resource2Id, discussiodId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}`);
  }
}

export default ResourceDiscussions;
