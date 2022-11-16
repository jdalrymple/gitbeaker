import { decamelizeKeys } from 'xcase';
import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { UserSchema } from '../resources/Users';
import {
  BaseRequestOptions,
  endpoint,
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
  resolved?: boolean;
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
    return RequestHelper.post()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes`,
      { query: { body }, noteId, ...options },
    );
  }

  all(
    resourceId: string | number,
    resource2Id: string | number,
    options?: PaginatedRequestOptions,
  ) {
    return RequestHelper.get<DiscussionSchema[]>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions`,
      options,
    );
  }

  create(
    resourceId: string | number,
    resource2Id: string | number,
    body: string,
    { position, ...options }: { position?: DiscussionNotePosition } & BaseRequestOptions = {},
  ) {
    const opts = { ...options };

    if (position) {
      const p = decamelizeKeys(position);

      opts.isForm = true;
      opts.body = body;

      Object.entries(p).forEach(([k, v]) => {
        opts[`position[${k}]`] = v;
      });
    } else {
      opts.query = { body };
    }

    return RequestHelper.post<DiscussionSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions`,
      opts,
    );
  }

  editNote(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    { body, ...options }: BaseRequestOptions & { body?: string } = {},
  ) {
    return RequestHelper.put<DiscussionSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes/${noteId}`,
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
    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes/${noteId}`,
      options,
    );
  }

  show(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    options?: Sudo,
  ) {
    return RequestHelper.get<DiscussionSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}`,
      options,
    );
  }
}
