import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, reformatObjectOptions } from '../infrastructure';
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

export interface DiscussionNotePositionTextLineSchema {
  line_code?: string;
  type?: 'new' | 'old';
  old_line?: number;
  new_line?: number;
}

export interface DiscussionNotePositionLineRangeSchema {
  start?: DiscussionNotePositionTextLineSchema;
  end?: DiscussionNotePositionTextLineSchema;
}

export type DiscussionNotePositionTextSchema = DiscussionNotePositionBaseSchema & {
  position_type: 'text';
  new_line?: string;
  old_line?: string;
  line_range?: DiscussionNotePositionLineRangeSchema;
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
  type: 'DiffNote' | 'DiscussionNote' | null;
  body: string;
  attachment: string | null;
  author: MappedOmit<UserSchema, 'created_at'>;
  created_at: string;
  updated_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: 'Issue' | 'Snippet' | 'Epic' | 'Commit' | 'MergeRequest';
  noteable_iid: number | null;
  resolvable: boolean;
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
      { ...options, body, noteId },
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
    const opts: Record<string, unknown> = { ...options, body };

    if (position) {
      Object.assign(opts, reformatObjectOptions(position, 'position', true));

      opts.isForm = true;
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
    options: Sudo & ShowExpanded<E> & { body?: string; resolved?: boolean },
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>> {
    return RequestHelper.put<DiscussionNoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes/${noteId}`,
      options,
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
