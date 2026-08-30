import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CondensedMergeRequestSchema } from './MergeRequests';
import type { PipelineSchema } from './Pipelines';
import type { SimpleUserSchema } from './Users';

import {
  BaseRequestSearchParams,
  RequestHelper,
  endpoint,
  getPrefixedUrl,
} from '../infrastructure';

export interface MergeTrainSchema extends Record<string, unknown> {
  id: number;
  merge_request: CondensedMergeRequestSchema;
  user: MappedOmit<SimpleUserSchema, 'created_at'>;
  pipeline: PipelineSchema | null;
  created_at: string;
  updated_at: string;
  target_branch: string;
  status: 'idle' | 'stale' | 'fresh' | 'merging' | 'merged' | 'skip_merged';
  merged_at: string | null;
  duration: number | null;
}

export class MergeTrains<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: {
      targetBranch?: string;
      scope?: 'active' | 'complete';
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MergeTrainSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, targetBranch, ...searchParams } = options || {};

    const url = getPrefixedUrl('', {
      projects: projectId,
      merge_trains: targetBranch || true,
    });

    return RequestHelper.get<MergeTrainSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  showStatus<E extends boolean = false>(
    projectId: string | number,
    mergeRequestIId: number,
    options?: ShowExpanded<E> & Sudo,
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
    options?: {
      autoMerge?: boolean;
      whenPipelineSucceeds?: boolean;
      sha?: string;
      squash?: boolean;
    } & ShowExpanded<E> &
      Sudo,
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
