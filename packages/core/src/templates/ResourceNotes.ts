import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { UserSchema } from '../resources/Users';

export interface NoteSchema extends Record<string, unknown> {
  id: number;
  body: string;
  author: Omit<UserSchema, 'created_at'>;
  created_at: string;
  updated_at: string;
}

export class ResourceNotes<C extends boolean = false> extends BaseResource<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    resource2Id: string | number,
    options?: {
      sort?: 'asc' | 'desc';
      orderBy?: 'created_at' | 'updated_at';
    } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NoteSchema[], C, E, P>> {
    return RequestHelper.get<NoteSchema[]>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes`,
      options,
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    body: string,
    options?: { internal?: boolean; createdAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NoteSchema, C, E, void>> {
    return RequestHelper.post<NoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes`,
      {
        body,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    noteId: number,
    options?: { body?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NoteSchema, C, E, void>> {
    return RequestHelper.put<NoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes/${noteId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    noteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes/${noteId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    noteId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<NoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/notes/${noteId}`,
      options,
    );
  }
}
