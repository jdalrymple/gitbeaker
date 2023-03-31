import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MergeRequestContextCommitSchema[], C, E, P>> {
    return RequestHelper.get<MergeRequestContextCommitSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/context_commits`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    commits: string[],
    { mergerequestIId, ...options }: { mergerequestIId?: number } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const prefix = endpoint`projects/${projectId}/merge_requests`;
    const url = mergerequestIId ? `${prefix}/${mergerequestIId}/context_commits` : prefix;

    return RequestHelper.post<void>()(this, url, {
      commits,
      ...options,
    });
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/context_commits`,
      options,
    );
  }
}
