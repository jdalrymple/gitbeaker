import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  BaseServiceOptions,
  Sudo,
  ResourceId,
  ResourceType,
  NoteId,
  DiscussionId,
} from '@typings';

class ResourceDiscussions extends BaseService {
  protected resource2Type: ResourceType;

  constructor(
    resourceType: ResourceType,
    resource2Type: ResourceType,
    options: BaseServiceOptions,
  ) {
    super({ url: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  addNote(
    resourceId: ResourceId,
    resource2Id: ResourceId,
    discussionId: DiscussionId,
    noteId: NoteId,
    content: string,
    options?: BaseRequestOptions,
  ) {
    if (!content) throw new Error('Missing required content argument');

    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussionId, noteId].map(
      encodeURIComponent,
    );

    return RequestHelper.put(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`,
      { body: content, ...options },
    );
  }

  all(resourceId: ResourceId, resource2Id: ResourceId, options?: PaginatedRequestOptions) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/${this.resource2Type}/${r2Id}/discussions`, options);
  }

  create(
    resourceId: ResourceId,
    resource2Id: ResourceId,
    content: string,
    options?: BaseRequestOptions,
  ) {
    if (!content) throw new Error('Missing required content argument');

    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/${this.resource2Type}/${r2Id}/discussions`, {
      body: content,
      ...options,
    });
  }

  editNote(
    resourceId: ResourceId,
    resource2Id: ResourceId,
    discussionId: DiscussionId,
    noteId: NoteId,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussionId, noteId].map(
      encodeURIComponent,
    );

    return RequestHelper.put(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`,
      { body: options },
    );
  }

  removeNote(
    resourceId: ResourceId,
    resource2Id: ResourceId,
    discussionId: DiscussionId,
    noteId: NoteId,
    options?: Sudo,
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussionId, noteId].map(
      encodeURIComponent,
    );

    return RequestHelper.del(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`,
      options,
    );
  }

  show(
    resourceId: ResourceId,
    resource2Id: ResourceId,
    discussionId: DiscussionId,
    options?: Sudo,
  ) {
    const [rId, r2Id, dId] = [resourceId, resource2Id, discussionId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}`,
      options,
    );
  }
}

export default ResourceDiscussions;
