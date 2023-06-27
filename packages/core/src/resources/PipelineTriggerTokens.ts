import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ExpandedPipelineSchema } from './Pipelines';
import type { UserSchema } from './Users';

export interface PipelineTriggerTokenSchema extends Record<string, unknown> {
  id: number;
  description: string;
  created_at: string;
  last_used: string | null;
  token: string;
  updated_at: string;
  owner: MappedOmit<UserSchema, 'created_at'> | null;
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
    triggerId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
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
    options?: { variables?: Record<string, string> } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedPipelineSchema, C, E, void>> {
    return RequestHelper.post<ExpandedPipelineSchema>()(
      this,
      endpoint`projects/${projectId}/trigger/pipeline`,
      {
        isForm: true,
        searchParams: {
          token,
          ref,
        },
        ...options,
      },
    );
  }
}
