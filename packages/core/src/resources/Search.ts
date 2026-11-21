import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { MilestoneSchema } from '../templates/ResourceMilestones';
import type { NoteSchema } from '../templates/ResourceNotes';
import type { CommitSchema } from './Commits';
import type { CondensedGroupSchema } from './Groups';
import type { IssueSchema } from './Issues';
import type { MergeRequestSchema } from './MergeRequests';
import type { ProjectSchema } from './Projects';
import type { SimpleSnippetSchema } from './Snippets';
import type { SimpleUserSchema } from './Users';

import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export interface BlobSchema extends Record<string, unknown> {
  id: number;
  basename: string;
  data: string;
  path: string;
  filename: string;
  ref: string;
  startline: number;
  project_id: number;
}

export interface SearchCommitSchema extends CommitSchema {
  projectId: string | number;
}

export type SearchScopes =
  | 'projects'
  | 'groups'
  | 'issues'
  | 'work_items'
  | 'merge_requests'
  | 'milestones'
  | 'snippet_titles'
  | 'wiki_blobs'
  | 'commits'
  | 'blobs'
  | 'notes'
  | 'users';

export type SearchWorkItemType =
  | 'issue'
  | 'task'
  | 'epic'
  | 'incident'
  | 'test_case'
  | 'requirement'
  | 'objective'
  | 'key_result'
  | 'ticket';

export type SharedSearchOptions = {
  searchType?: 'basic' | 'advanced' | 'zoekt';
  state?: 'all' | 'opened' | 'closed' | 'merged';
  confidential?: boolean;
  type?: SearchWorkItemType[];
  fields?: 'title'[];
  numContextLines?: number;
  regex?: boolean;
  orderBy?: 'created_at' | 'title';
  sort?: 'asc' | 'desc';
  authorUsername?: string;
  labelName?: string[];
  sourceBranch?: string;
  targetBranch?: string;
  not?: { authorUsername?: string; sourceBranch?: string; targetBranch?: string };
};

export type InstanceSearchOptions = {
  projectId?: never;
  groupId?: never;
  includeArchived?: boolean;
  excludeForks?: boolean;
  ref?: never;
} & SharedSearchOptions;

export type GroupSearchOptions = {
  projectId?: never;
  groupId: string | number;
  includeArchived?: boolean;
  excludeForks?: boolean;
  ref?: never;
} & SharedSearchOptions;

export type ProjectSearchOptions = {
  projectId: string | number;
  groupId?: never;
  includeArchived?: never;
  excludeForks?: never;
  // Only applies to the blobs, commits and wiki_blobs scopes
  ref?: string;
} & SharedSearchOptions;

export type AllSearchOptions = InstanceSearchOptions | GroupSearchOptions | ProjectSearchOptions;

export class Search<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'users',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'notes',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<NoteSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'blobs',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<BlobSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'commits',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SearchCommitSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'wiki_blobs',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<BlobSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'snippet_titles',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleSnippetSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'milestones',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MilestoneSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'merge_requests',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'issues',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'work_items',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'groups',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CondensedGroupSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'projects',
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: SearchScopes,
    search: string,
    options?: AllSearchOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): any {
    const { projectId, groupId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('search', {
      projects: projectId,
      groups: groupId,
    });

    return RequestHelper.get()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: {
        ...searchParams,
        scope,
        search,
      },
    });
  }
}
