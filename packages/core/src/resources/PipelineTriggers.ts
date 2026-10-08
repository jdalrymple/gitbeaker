import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { PipelineSchema } from './Pipelines';

import { RequestHelper, endpoint } from '../infrastructure';

export interface PipelineTriggerSchema extends Record<string, unknown> {
  id: number;
  description: string;
  created_at: string;
  last_used: string | null;
  token: string;
  updated_at: string;
  owner: Record<string, unknown> | null;
}

export interface TriggerPipelineOptions {
  variables?: Record<string, string>;
  inputs?: Record<string, string | number | boolean>;
}

export class PipelineTriggers<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineTriggerSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PipelineTriggerSchema[]>()(
      this,
      endpoint`projects/${projectId}/triggers`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    triggerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineTriggerSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PipelineTriggerSchema>()(
      this,
      endpoint`projects/${projectId}/triggers/${triggerId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    description: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineTriggerSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<PipelineTriggerSchema>()(
      this,
      endpoint`projects/${projectId}/triggers`,
      {
        sudo,
        showExpanded,
        body: {
          description,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    triggerId: number,
    options?: { description?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineTriggerSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<PipelineTriggerSchema>()(
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

  trigger<E extends boolean = false>(
    projectId: string | number,
    ref: string,
    token: string,
    options?: ShowExpanded<E> & Sudo & TriggerPipelineOptions,
  ): Promise<GitlabAPIResponse<PipelineSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PipelineSchema>()(
      this,
      endpoint`projects/${projectId}/trigger/pipeline`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ref,
          token,
        },
        body,
      },
    );
  }
}
