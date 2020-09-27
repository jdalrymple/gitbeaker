import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { JobScope } from './Jobs';

export interface PipelineSchemaDefault {
  id: number;
  sha: string;
  ref: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  web_url: string;
}

export interface PipelineSchemaCamelized {
  id: number;
  sha: string;
  ref: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  webUrl: string;
}

// As of GitLab v12.6.2
export type PipelineSchema = PipelineSchemaDefault | PipelineSchemaCamelized;

export class Pipelines extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines`, options);
  }

  create(projectId: string | number, ref: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline`, { ref, ...options });
  }

  delete(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/pipelines/${pipelineId}`, options);
  }

  show(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}`, options);
  }

  retry(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/retry`, options);
  }

  cancel(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/cancel`, options);
  }

  showJobs(projectId: string | number, pipelineId: number, options?: { scope: JobScope } & Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`, options);
  }

  allVariables(projectId: string | number, pipelineId: number, options?: PaginatedRequestOptions) {
    const [pId, pipeId] = [projectId, pipelineId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipeId}/variables`, options);
  }
}
