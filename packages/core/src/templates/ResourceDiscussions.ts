import { decamelizeKeys } from 'xcase';
import QS from 'qs';
import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  Camelize,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { UserSchema } from '../resources/Users';

export interface DiscussionNotePositionBaseSchema extends Record<string, unknown> {
  base_sha: string;
  start_sha: string;
  head_sha: string;
  position_type: 'text' | 'image';
  old_path?: string;
  new_path?: string;
}

export type DiscussionNotePositionTextSchema = DiscussionNotePositionBaseSchema & {
  position_type: 'text';
  new_line?: string;
  old_line?: string;
};

export type DiscussionNotePositionImageSchema = DiscussionNotePositionBaseSchema & {
  position_type: 'image';
  width?: string;
  height?: string;
  x?: number;
  y?: number;
};

export type DiscussionNotePositionSchema =
  | DiscussionNotePositionTextSchema
  | DiscussionNotePositionImageSchema;

export interface DiscussionNoteSchema extends Record<string, unknown> {
  id: number;
  type?: string;
  body: string;
  attachment?: string;
  author: MappedOmit<UserSchema, 'created_at'>;
  created_at: string;
  updated_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  noteable_iid?: number;
  resolvable?: boolean;
}

export interface DiscussionSchema extends Record<string, unknown> {
  id: string;
  individual_note: boolean;
  notes?: DiscussionNoteSchema[];
}

export type DiscussionNotePositionOptions = Camelize<DiscussionNotePositionSchema>;

export class ResourceDiscussions<C extends boolean = false> extends BaseResource<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  addNote<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    body: string,
    options?: { createdAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>> {
    return RequestHelper.post<DiscussionNoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes`,
      { searchParams: { body }, noteId, ...options },
    );
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    resource2Id: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema[], C, E, P>> {
    return RequestHelper.get<DiscussionSchema[]>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions`,
      options,
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    body: string,
    {
      position,
      ...options
    }: { position?: DiscussionNotePositionOptions; commitId?: string; createdAt?: string } & Sudo &
      ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>> {
    const opts: Record<string, unknown> = { ...options };

    if (position) {
      const p: Record<string, unknown> = decamelizeKeys(position);
      const pos = QS.stringify({ position: p }, { encode: false })
        .split('&')
        .reduce((acc, cur) => {
          const [key, val] = cur.split('=');

          acc[key] = val;

          return acc;
        }, {});

      Object.assign(opts, pos);

      opts.isForm = true;
      opts.body = body;

      // Object.assign(opts, pos);
    } else {
      opts.searchParams = { body };
    }

    return RequestHelper.post<DiscussionSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions`,
      opts,
    );
  }

  editNote<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    { body, ...options }: Sudo & ShowExpanded<E> & { body?: string; resolved?: boolean } = {},
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>> {
    return RequestHelper.put<DiscussionNoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes/${noteId}`,
      {
        searchParams: { body },
        ...options,
      },
    );
  }

  removeNote<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes/${noteId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>> {
    return RequestHelper.get<DiscussionSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}`,
      options,
    );
  }
}
