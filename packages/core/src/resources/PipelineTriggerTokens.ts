import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ExpandedPipelineSchema } from './Pipelines';
import type { SimpleUserSchema } from './Users';

import { RequestHelper, createFormData, endpoint, reformatObjectOptions } from '../infrastructure';

export interface PipelineTriggerTokenSchema extends Record<string, unknown> {
  id: number;
  description: string;
  created_at: string;
  last_used: string | null;
  token: string;
  updated_at: string;
  owner: MappedOmit<SimpleUserSchema, 'created_at'> | null;
}

export class PipelineTriggerTokens<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineTriggerTokenSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<PipelineTriggerTokenSchema[]>()(
      this,
      endpoint`projects/${projectId}/triggers`,
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
    description: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineTriggerTokenSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PipelineTriggerTokenSchema>()(
      this,
      endpoint`projects/${projectId}/triggers`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          description,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    triggerId: number,
    options?: { description?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineTriggerTokenSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<PipelineTriggerTokenSchema>()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    triggerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/triggers/${triggerId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    triggerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineTriggerTokenSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PipelineTriggerTokenSchema>()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  trigger<E extends boolean = false>(
    projectId: string | number,
    ref: string,
    token: string,
    options?: { variables?: Record<string, string> } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedPipelineSchema, C, E, void>> {
    const { variables, sudo, showExpanded } = options || {};

    return RequestHelper.post<ExpandedPipelineSchema>()(
      this,
      endpoint`projects/${projectId}/trigger/pipeline`,
      {
        sudo,
        showExpanded,
        searchParams: {
          token,
          ref,
        },
        body: variables ? createFormData(reformatObjectOptions(variables, 'variables')) : undefined,
      },
    );
  }
}
