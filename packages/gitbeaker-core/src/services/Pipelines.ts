import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  Camelize,
} from '../infrastructure';

export type PipelineStatus =
  | 'created'
  | 'waiting_for_resource'
  | 'preparing'
  | 'pending'
  | 'running'
  | 'failed'
  | 'success'
  | 'canceled'
  | 'skipped'
  | 'manual'
  | 'scheduled';

export interface PipelineSchemaDefault {
  id: number;
  sha: string;
  ref: string;
  status: PipelineStatus;
  created_at: Date;
  updated_at: Date;
  web_url: string;
}

export type PipelineSchema<C> = C extends true
  ? Camelize<PipelineSchemaDefault>
  : PipelineSchemaDefault;

export class Pipelines<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C>(this, `projects/${pId}/pipelines`, options);
  }

  create(projectId: string | number, ref: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/pipeline`, { ref, ...options });
  }

  delete(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del<C>(this, `projects/${pId}/pipelines/${pipelineId}`, options);
  }

  show(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C>(this, `projects/${pId}/pipelines/${pipelineId}`, options);
  }

  retry(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/pipelines/${pipelineId}/retry`, options);
  }

  cancel(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/pipelines/${pipelineId}/cancel`, options);
  }

  allVariables(projectId: string | number, pipelineId: number, options?: PaginatedRequestOptions) {
    const [pId, pipeId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/pipelines/${pipeId}/variables`, options);
  }
}
