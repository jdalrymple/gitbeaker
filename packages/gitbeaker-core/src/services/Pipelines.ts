import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
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

export interface PipelineSchema extends Record<string, unknown> {
  id: number;
  status: PipelineStatus;
  ref: string;
  sha: string;
  web_url: string;
  created_at: string;
  updated_at: string;
  user: Pick<UserSchema, 'name' | 'avatar_url'>;
}

export interface PipelineExpandedSchema extends PipelineSchema {
  project_id: number;
  before_sha: string;
  tag: boolean;
  yaml_errors?: string;
  user: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
  started_at?: string;
  finished_at: string;
  committed_at?: string;
  duration?: string;
  coverage?: string;
}

export interface PipelineVariableSchema extends Record<string, unknown> {
  key: string;
  variable_type?: string;
  value: string;
}

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

    return RequestHelper.post<PipelineExpandedSchema>()(
      this,
      `projects/${pId}/pipelines/${pipelineId}/retry`,
      options,
    );
  }

  cancel(projectId: string | number, pipelineId: number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<PipelineExpandedSchema>()(
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
