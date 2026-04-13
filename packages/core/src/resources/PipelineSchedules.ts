import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleUserSchema } from './Users';
import type { PipelineSchema } from './Pipelines';
import type { PipelineVariableSchema } from './PipelineScheduleVariables';

export interface CondensedPipelineScheduleSchema extends Record<string, unknown> {
  id: number;
  description: string;
  ref: string;
  cron: string;
  cron_timezone: string;
  next_run_at: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  owner: MappedOmit<SimpleUserSchema, 'created_at'>;
}

export interface PipelineScheduleSchema extends CondensedPipelineScheduleSchema {
  last_pipeline: Pick<PipelineSchema, 'id' | 'sha' | 'ref' | 'status'>;
}

export interface ExpandedPipelineScheduleSchema extends PipelineScheduleSchema {
  last_pipeline: Pick<PipelineSchema, 'id' | 'sha' | 'ref' | 'status'>;
  variables: PipelineVariableSchema[];
}

export class PipelineSchedules<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { scope?: 'active' | 'inactive' } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedPipelineScheduleSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CondensedPipelineScheduleSchema[]>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams
      },
    );
  }

  allTriggeredPipelines<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PipelineSchema[]>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/pipelines`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    description: string,
    ref: string,
    cron: string,
    options?: { cronTimezone?: string; active?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineScheduleSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PipelineScheduleSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          description,
          ref,
          cron,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    options?: {
      description?: string;
      ref?: string;
      cron?: string;
      cronTimezone?: string;
      active?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineScheduleSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<PipelineScheduleSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineScheduleSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<PipelineScheduleSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  run<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/play`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedPipelineScheduleSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExpandedPipelineScheduleSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  takeOwnership<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineScheduleSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<PipelineScheduleSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/take_ownership`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
