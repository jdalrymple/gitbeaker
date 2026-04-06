import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestSearchParams,
  PaginationRequestSearchParams,
  RequestHelper,
  endpoint,
} from '../infrastructure';
import type {
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleUserSchema } from './Users';
import type { PipelineSchema } from './Pipelines';
import type { CondensedMergeRequestSchema } from './MergeRequests';

export interface MergeTrainSchema extends Record<string, unknown> {
  id: number;
  merge_request: CondensedMergeRequestSchema;
  user: MappedOmit<SimpleUserSchema, 'created_at'>;
  pipeline: PipelineSchema;
  created_at: string;
  updated_at: string;
  target_branch: string;
  status: string;
  merged_at: string;
  duration: number;
}

export class MergeTrains<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: {
      targetBranch?: string;
      scope?: 'active' | 'complete';
      sort?: 'asc' | 'desc';
    } & BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MergeTrainSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MergeTrainSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_trains`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
      },
    );
  }

  showStatus<E extends boolean = false>(
    projectId: string | number,
    mergeRequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeTrainSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeTrainSchema>()(
      this,
      endpoint`projects/${projectId}/merge_trains/merge_requests/${mergeRequestIId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  addMergeRequest<E extends boolean = false>(
    projectId: string | number,
    mergeRequestIId: number,
    options?: { whenPipelineSucceeds?: boolean; sha?: string; squash?: boolean } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeTrainSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MergeTrainSchema>()(
      this,
      endpoint`projects/${projectId}/merge_trains/merge_requests/${mergeRequestIId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }
}
