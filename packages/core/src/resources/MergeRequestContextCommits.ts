import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface MergeRequestContextCommitSchema extends Record<string, unknown> {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids?: null;
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
}

export class MergeRequestContextCommits<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestContextCommitSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MergeRequestContextCommitSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/context_commits`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    commits: string[],
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/context_commits`,
      {
        sudo,
        showExpanded,
        body: { ...body, commits },
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/context_commits`,
      { sudo, showExpanded },
    );
  }
}
