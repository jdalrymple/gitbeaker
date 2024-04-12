import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
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
import type { UserSchema } from './Users';

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
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<UserSchema[], C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'notes',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<NoteSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'blobs',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<BlobSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'commits',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<SearchCommitSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'wiki_blobs',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<BlobSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'snippet_titles',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<SimpleSnippetSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'milestones',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MilestoneSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'merge_requests',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'issues',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: 'projects',
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    scope: SearchScopes,
    search: string,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      AllSearchOptions &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): any {
    const { projectId, groupId, ...opts } = options || {};
    let url: string;

    if (projectId) url = endpoint`projects/${projectId}/`;
    else if (groupId) url = endpoint`groups/${groupId}/`;
    else url = '';

    return RequestHelper.get()(this, `${url}search`, {
      scope,
      search,
      ...opts,
    });
  }
}
