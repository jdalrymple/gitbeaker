import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ProjectSchema } from './Projects';
import type { IssueSchema } from './Issues';
import type { MergeRequestSchema } from './MergeRequests';
import type { MilestoneSchema } from '../templates/ResourceMilestones';
import type { SimpleSnippetSchema } from './Snippets';
import type { CommitSchema } from './Commits';
import type { NoteSchema } from '../templates/ResourceNotes';
import type { SimpleUserSchema } from './Users';

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
  | 'issues'
  | 'merge_requests'
  | 'milestones'
  | 'snippet_titles'
  | 'wiki_blobs'
  | 'commits'
  | 'blobs'
  | 'notes'
  | 'users';

export type AllSearchOptions = {
  orderBy?: 'created_at';
  state?: 'issues' | 'merge_requests';
  confidential?: boolean;
};

export class Search<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'users',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'notes',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NoteSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'blobs',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BlobSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'commits',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SearchCommitSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'wiki_blobs',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BlobSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'snippet_titles',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleSnippetSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'milestones',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'merge_requests',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'issues',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'projects',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: SearchScopes,
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E>,
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
