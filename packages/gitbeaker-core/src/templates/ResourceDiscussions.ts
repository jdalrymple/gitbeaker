import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class ResourceDiscussions<C extends boolean = false> extends BaseService<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  addNote(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussionId, noteId].map(
      encodeURIComponent,
    );

    return RequestHelper.post()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes`,
      { body: content, noteId: nId, ...options },
    );
  }

  all(
    resourceId: string | number,
    resource2Id: string | number,
    options?: PaginatedRequestOptions,
  ) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get()(this, `${rId}/${this.resource2Type}/${r2Id}/discussions`, options);
  }

  create(
    resourceId: string | number,
    resource2Id: string | number,
    content: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post()(this, `${rId}/${this.resource2Type}/${r2Id}/discussions`, {
      body: content,
      ...options,
    });
  }

  editNote(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussionId, noteId].map(
      encodeURIComponent,
    );

    return RequestHelper.put()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`,
      {
        body: content,
        ...options,
      },
    );
  }

  removeNote(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    options?: Sudo,
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussionId, noteId].map(
      encodeURIComponent,
    );

    return RequestHelper.del()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`,
      options,
    );
  }

  show(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    options?: Sudo,
  ) {
    const [rId, r2Id, dId] = [resourceId, resource2Id, discussionId].map(encodeURIComponent);

    return RequestHelper.get()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}`,
      options,
    );
  }
}
