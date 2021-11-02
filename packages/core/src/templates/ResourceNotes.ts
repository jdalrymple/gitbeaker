import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { UserSchema } from '../resources/Users';
import {
  RequestHelper,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  endpoint,
} from '../infrastructure';

export interface NoteSchema extends Record<string, unknown> {
  id: number;
  body: string;
  author: UserSchema;
  created_at: string;
  updated_at: string;
  confidential: boolean;
}

export class ResourceNotes<C extends boolean = false> extends BaseResource<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all(
    resourceId: string | number,
    resource2Id: string | number,
    options?: PaginatedRequestOptions,
  ) {
    return RequestHelper.get<NoteSchema[]>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes`,
      options,
    );
  }

  create(
    resourceId: string | number,
    resource2Id: string | number,
    body: string,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<NoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes`,
      {
        body,
        ...options,
      },
    );
  }

  edit(
    resourceId: string | number,
    resource2Id: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.put<NoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes/${noteId}`,
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
  ) {
    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes/${noteId}`,
      options,
    );
  }

  show(resourceId: string | number, resource2Id: string | number, noteId: number, options?: Sudo) {
    return RequestHelper.get<NoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes/${noteId}`,
      options,
    );
  }
}
