import { BaseResource } from '@gitbeaker/requester-utils';
import { PipelineVariableSchema } from './Pipelines';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
} from '../infrastructure';

export class PipelineScheduleVariables<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, pipelineScheduleId: number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<PipelineVariableSchema[]>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables`,
      options,
    );
  }

  create(projectId: string | number, pipelineScheduleId: number, options?: BaseRequestOptions) {
    return RequestHelper.post<PipelineVariableSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables`,
      options,
    );
  }

  edit(
    projectId: string | number,
    pipelineScheduleId: number,
    keyId: string,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.put<PipelineVariableSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables/${keyId}`,
      options,
    );
  }

  show(
    projectId: string | number,
    pipelineScheduleId: number,
    keyId: string,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.get<PipelineVariableSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables/${keyId}`,
      options,
    );
  }

  remove(
    projectId: string | number,
    pipelineScheduleId: number,
    keyId: string,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.del<PipelineVariableSchema>()(
      this,
      endpoint`projects/${projectId}/pipeline_schedules/${pipelineScheduleId}/variables/${keyId}`,
      options,
    );
  }
}
