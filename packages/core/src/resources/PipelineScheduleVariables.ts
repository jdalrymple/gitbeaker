import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface PipelineVariableSchema extends Record<string, unknown> {
  key: string;
  variable_type?: string;
  value: string;
}

export class PipelineScheduleVariables<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    pipelineScheduleId: number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<PipelineVariableSchema[], C, E, P>> {
    return RequestHelper.get<PipelineVariableSchema[]>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    key: string,
    value: string,
    options?: { variableType?: 'env_var' | 'file' } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineVariableSchema, C, E, void>> {
    return RequestHelper.post<PipelineVariableSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables`,
      {
        ...options,
        key,
        value,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    key: string,
    value: string,
    options?: { variableType?: 'env_var' | 'file' } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineVariableSchema, C, E, void>> {
    return RequestHelper.put<PipelineVariableSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables/${key}`,
      {
        ...options,
        value,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    key: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables/${key}`,
      options,
    );
  }
}
