import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type DiscussiodId = string | number;
class ResourceDiscussions extends BaseService {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
    this.resource2Type = resource2Type;
  }

  addNote(
    resourceId: string,
    resource2Id: string,
    discussiodId: string,
    noteId: NoteId,
    options: RequestOptions,
  ) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussiodId, noteId]
      .map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`, options);
  }

  all(resourceId: ResourceId, resource2Id: Resource2Id, options: RequestOptions) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/discussions`, options);
  }

  create(resourceId: ResourceId, resource2Id: Resource2Id, options: RequestOptions) {
    if (!options.body) throw new Error('Missing required property: body');

    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/${this.resource2Type}/${r2Id}/discussions`, options);
  }

  editNote(
    resourceId: ResourceId,
    resource2Id: Resource2Id,
    discussiodId: DiscussiodId,
    noteId: NoteId,
    options: RequestOptions,
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussiodId, noteId]
      .map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`, { body: options });
  }

  removeNote(
    resourceId: ResourceId,
    resource2Id: Resource2Id,
    discussiodId: DiscussiodId,
    noteId: NoteId,
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussiodId, noteId]
      .map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`);
  }

  show(resourceId: ResourceId, resource2Id: Resource2Id, discussiodId: DiscussiodId) {
    const [rId, r2Id, dId] = [resourceId, resource2Id, discussiodId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}`);
  }
}

export default ResourceDiscussions;
