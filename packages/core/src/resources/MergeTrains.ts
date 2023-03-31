import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { UserSchema } from './Users';
import type { PipelineSchema } from './Pipelines';
import type { CondensedMergeRequestSchema } from './MergeRequests';

export interface MergeTrainSchema extends Record<string, unknown> {
  id: number;
  merge_request: CondensedMergeRequestSchema;
  user: Omit<UserSchema, 'created_at'>;
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
    } & PaginationRequestOptions<P> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<MergeTrainSchema[], C, E, P>> {
    return RequestHelper.get<MergeTrainSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_trains`,
      options,
    );
  }

  showStatus<E extends boolean = false>(
    projectId: string | number,
    mergeRequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeTrainSchema, C, E, void>> {
    return RequestHelper.get<MergeTrainSchema>()(
      this,
      endpoint`projects/${projectId}/merge_trains/merge_requests/${mergeRequestIId}`,
      options,
    );
  }
}
