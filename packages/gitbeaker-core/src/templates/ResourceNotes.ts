import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { UserSchema } from '../services/Users';
import {
  RequestHelper,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
} from '../infrastructure';

export interface NoteSchema extends Record<string, unknown> {
  id: number;
  body: string;
  attachment?: string;
  author: UserSchema;
  created_at: string;
  updated_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  noteable_iid: number;
  resolvable: boolean;
  confidential: boolean;
}

export class ResourceNotes<C extends boolean = false> extends BaseService<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all(
    resourceId: string | number,
    resource2Id: string | number,
    options?: PaginatedRequestOptions,
  ) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get<NoteSchema[]>()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/notes`,
      options,
    );
  }

  create(
    resourceId: string | number,
    resource2Id: string | number,
    body: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.post<NoteSchema>()(this, `${rId}/${this.resource2Type}/${r2Id}/notes`, {
      body,
      ...options,
    });
  }

  edit(
    resourceId: string | number,
    resource2Id: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.put<NoteSchema>()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`,
      {
        body,
        ...options,
      },
    );
  }

  remove(
    resourceId: string | number,
    resource2Id: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<void> {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`, options);
  }

  show(resourceId: string | number, resource2Id: string | number, noteId: number, options?: Sudo) {
    const [rId, r2Id, nId] = [resourceId, resource2Id, noteId].map(encodeURIComponent);

    return RequestHelper.get<NoteSchema>()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/notes/${nId}`,
      options,
    );
  }
}
