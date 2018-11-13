import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  ResourceId,
  ResourceType,
  NoteId,
} from '@src/types';

class ResourceNotes extends BaseService {
  protected resource2Type: string;

  constructor(
    resourceType: ResourceType,
    resource2Type: ResourceType,
    options: BaseServiceOptions,
  ) {
    super({ url: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all(resourceId: ResourceId, resource2Id: ResourceId, options?: PaginatedRequestOptions) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, options);
  }

  create(
    resourceId: ResourceId,
    resource2Id: ResourceId,
    body: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, {
      body,
      ...options,
    });
  }

  edit(
    resourceId: ResourceId,
    resource2Id: ResourceId,
    noteId: NoteId,
    body: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, {
      body,
      ...options,
    });
  }

  remove(resourceId: ResourceId, resource2Id: ResourceId, noteId: NoteId, options?: Sudo) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  show(resourceId: ResourceId, resource2Id: ResourceId, noteId: NoteId, options?: Sudo) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }
}

export default ResourceNotes;
