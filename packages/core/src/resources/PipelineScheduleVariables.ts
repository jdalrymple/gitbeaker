import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface PipelineVariableSchema extends Record<string, unknown> {
  key: string;
  variable_type?: string;
  value: string;
}

export class PipelineScheduleVariables<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    pipelineScheduleId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineVariableSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<PipelineVariableSchema[]>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables`,
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
    pipelineScheduleId: number,
    key: string,
    value: string,
    options?: { variableType?: 'env_var' | 'file' } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineVariableSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PipelineVariableSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          key,
          value,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    key: string,
    value: string,
    options?: { variableType?: 'env_var' | 'file' } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineVariableSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<PipelineVariableSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables/${key}`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          value,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    pipelineScheduleId: number,
    key: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables/${key}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
