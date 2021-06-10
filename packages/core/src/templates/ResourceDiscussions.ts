import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { UserSchema } from '../resources/Users';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface DiscussionNotePosition {
  base_sha: string;
  start_sha: string;
  head_sha: string;
  old_path: string;
  new_path: string;
  position_type: string;
  old_line: number;
  new_line: number;
}

export interface DiscussionNote {
  id: number;
  type?: string;
  body: string;
  attachment?: string;
  author: Omit<UserSchema, 'created_at'>;
  created_at: string;
  updated_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  noteable_iid?: number;
  resolvable: boolean;
  position?: DiscussionNotePosition;
}

export interface DiscussionSchema extends Record<string, unknown> {
  id: string;
  individual_note: boolean;
  notes?: DiscussionNote[];
}

export class ResourceDiscussions<C extends boolean = false> extends BaseResource<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  addNote(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussionId, noteId].map(
      encodeURIComponent,
    );

    return RequestHelper.post()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes`,
      { query: { body }, noteId: nId, ...options },
    );
  }

  all(
    resourceId: string | number,
    resource2Id: string | number,
    options?: PaginatedRequestOptions,
  ) {
    const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

    return RequestHelper.get<DiscussionSchema[]>()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions`,
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

    return RequestHelper.post<DiscussionSchema>()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions`,
      {
        query: { body },
        ...options,
      },
    );
  }

  editNote(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    { body, ...options }: BaseRequestOptions & { body?: string } = {},
  ) {
    const [rId, r2Id, dId, nId] = [resourceId, resource2Id, discussionId, noteId].map(
      encodeURIComponent,
    );

    return RequestHelper.put<DiscussionSchema>()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}/notes/${nId}`,
      {
        query: { body },
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

    return RequestHelper.get<DiscussionSchema>()(
      this,
      `${rId}/${this.resource2Type}/${r2Id}/discussions/${dId}`,
      options,
    );
  }
}
