import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';
import { SimpleUserSchema } from './Users';

export type AllEventOptions = {
  action?:
    | 'created'
    | 'updated'
    | 'closed'
    | 'reopened'
    | 'pushed'
    | 'commented'
    | 'merged'
    | 'joined'
    | 'left'
    | 'destroyed'
    | 'expired'
    | 'opened';
  targetType?: 'epic' | 'issue' | 'milestone' | 'merge_request' | 'note' | 'project' | 'snippet' | 'user';
  before?: string;
  after?: string;
  scope?: string;
  sort?: 'asc' | 'desc';
};

export interface EventPushDataSchema extends Record<string, unknown> {
  commit_count: number;
  action: string;
  ref_type: string;
  commit_from?: string | null;
  commit_to?: string | null;
  ref?: string | null;
  commit_title?: string | null;
  ref_count?: number;
}

export interface EventNoteSchema extends Record<string, unknown> {
  id: number;
  body: string;
  attachment?: string | null;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
  created_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  noteable_iid?: number;
}

export interface EventSchema extends Record<string, unknown> {
  id: number;
  title?: string | null;
  project_id: number;
  action_name: string;
  target_id?: number | null;
  target_iid?: number | null;
  target_type?: string | null;
  author_id: number;
  target_title?: string | null;
  created_at: string;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
  author_username: string;
  imported?: boolean;
  imported_from?: string;
  push_data?: EventPushDataSchema;
  note?: EventNoteSchema;
  data?: any;
}

export class Events<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllEventOptions &
      BaseRequestSearchParams &
      OneOrNoneOf<{ projectId?: string | number; userId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<EventSchema[], C, E, P>> {
    const { projectId, userId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, userId }, { minExpected: 0 });

    const url = getPrefixedUrl('events', { projects: projectId, users: userId });

    return RequestHelper.get<EventSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }
}
