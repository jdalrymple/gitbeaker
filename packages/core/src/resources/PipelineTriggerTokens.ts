import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ExpandedPipelineSchema } from './Pipelines';

export interface PipelineTriggerTokenSchema extends Record<string, unknown> {
  id: number;
  description: string;
  created_at: string;
  last_used?: null;
  token: string;
  updated_at: string;
  owner?: null;
}

export class PipelineTriggerTokens<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<PipelineTriggerTokenSchema[], C, E, P>> {
    return RequestHelper.get<PipelineTriggerTokenSchema[]>()(
      this,
      endpoint`projects/${projectId}/triggers`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    description: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineTriggerTokenSchema, C, E, void>> {
    return RequestHelper.post<PipelineTriggerTokenSchema>()(
      this,
      endpoint`projects/${projectId}/triggers`,
      {
        description,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    triggerId: number,
    options?: { description?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineTriggerTokenSchema, C, E, void>> {
    return RequestHelper.put<PipelineTriggerTokenSchema>()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    pipelineId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/pipelines/${pipelineId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    triggerId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineTriggerTokenSchema, C, E, void>> {
    return RequestHelper.get<PipelineTriggerTokenSchema>()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
      options,
    );
  }

  trigger<E extends boolean = false>(
    projectId: string | number,
    ref: string,
    token: string,
    options?: { variables?: Record<string, unknown> } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedPipelineSchema, C, E, void>> {
    return RequestHelper.post<ExpandedPipelineSchema>()(
      this,
      endpoint`projects/${projectId}/pipelines`,
      {
        searchParams: {
          token,
          ref,
        },
        options,
      },
    );
  }
}
