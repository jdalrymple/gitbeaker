import type {
  BaseRequestSearchParams,
  Camelize,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  RawPathSegment,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleUserSchema } from '../resources/Users';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, createFormData, endpoint, reformatObjectOptions } from '../infrastructure';

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

export type DiscussionNotePositionTextSchema = {
  position_type: 'text';
  new_line?: string;
  old_line?: string;
  line_range?: DiscussionNotePositionLineRangeSchema;
} & DiscussionNotePositionBaseSchema;

export type DiscussionNotePositionImageSchema = {
  position_type: 'image';
  width?: string;
  height?: string;
  x?: number;
  y?: number;
} & DiscussionNotePositionBaseSchema;

export type DiscussionNotePositionSchema =
  | DiscussionNotePositionTextSchema
  | DiscussionNotePositionImageSchema;

export interface DiscussionNoteSchema extends Record<string, unknown> {
  id: number;
  type: 'DiffNote' | 'DiscussionNote' | null;
  body: string;
  attachment: string | null;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
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
  protected resource2Type: string | RawPathSegment;

  constructor(
    resourceType: string,
    resource2Type: string | RawPathSegment,
    options: BaseResourceOptions<C>,
  ) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  addNote<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    body: string,
    options?: { createdAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>> {
    const { sudo, showExpanded, ...bodyOptions } = options || {};

    return RequestHelper.post<DiscussionNoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes`,
      { sudo, showExpanded, body: { ...bodyOptions, body } },
    );
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    resource2Id: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<DiscussionSchema[]>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
      },
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    body: string,
    {
      position,
      ...options
    }: {
      position?: DiscussionNotePositionOptions;
      commitId?: string;
      createdAt?: string;
    } & ShowExpanded<E> &
      Sudo = {},
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>> {
    const { sudo, showExpanded, ...bodyOptions } = options;

    return RequestHelper.post<DiscussionSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions`,
      {
        sudo,
        showExpanded,
        body: position
          ? createFormData({
              ...bodyOptions,
              body,
              ...reformatObjectOptions(position, 'position', true),
            })
          : {
              ...bodyOptions,
              body,
            },
      },
    );
  }

  editNote<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    options: { body?: string; resolved?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options;

    return RequestHelper.put<DiscussionNoteSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes/${noteId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  removeNote<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    noteId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}/notes/${noteId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    discussionId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<DiscussionSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/discussions/${discussionId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
