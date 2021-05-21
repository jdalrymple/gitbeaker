import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { PipelineSchema, PipelineExtendedSchema, PipelineVariableSchema } from '../models';

// TODO: Add missing function

export class Pipelines<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<PipelineSchema[]>()(this, `projects/${pId}/pipelines`, options);
  }

  create(projectId: string | number, ref: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<PipelineSchema>()(this, `projects/${pId}/pipeline`, {
      ref,
      ...options,
    });
  }

  delete(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del()(this, `projects/${pId}/pipelines/${pipelineId}`, options);
  }

  show(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<PipelineSchema>()(
      this,
      `projects/${pId}/pipelines/${pipelineId}`,
      options,
    );
  }

  retry(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<PipelineExtendedSchema>()(
      this,
      `projects/${pId}/pipelines/${pipelineId}/retry`,
      options,
    );
  }

  cancel(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<PipelineExtendedSchema>()(
      this,
      `projects/${pId}/pipelines/${pipelineId}/cancel`,
      options,
    );
  }

  allVariables(projectId: string | number, pipelineId: number, options?: PaginatedRequestOptions) {
    const [pId, pipeId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get<PipelineVariableSchema[]>()(
      this,
      `projects/${pId}/pipelines/${pipeId}/variables`,
      options,
    );
  }
}
