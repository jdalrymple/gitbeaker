import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo, endpoint } from '../infrastructure';
import { CommitSchema } from './Commits';
import { PipelineSchema } from './Pipelines';
import { UserSchema } from './Users';
import { RunnerSchema } from './Runners';
import { EnvironmentSchema } from './Environments';
import { MergeRequestSchema } from './MergeRequests';

export type DeploymentStatus = 'created' | 'running' | 'success' | 'failed' | 'canceled';

export interface DeployableSchema {
  id: number;
  ref: string;
  name: string;
  runner?: RunnerSchema;
  stage?: string;
  started_at?: Date;
  status?: DeploymentStatus;
  tag: boolean;
  commit?: CommitSchema;
  coverage?: string;
  created_at?: Date;
  finished_at?: Date;
  user?: UserSchema;
  pipeline?: PipelineSchema;
}

export type DeploymentSchema = {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  user: UserSchema;
  created_at: string;
  updated_at: string;
  status: DeploymentStatus;
  deployable: DeployableSchema;
  environment: EnvironmentSchema;
};

export interface AllDeploymentsOptions {
  order_by?: 'id' | 'iid' | 'created_at' | 'updated_at' | 'ref';
  sort?: 'asc' | 'desc';
  updated_after?: string;
  updated_before?: string;
  environment?: string;
  status?: 'created' | 'running' | 'success' | 'failed' | 'canceled' | 'blocked';
}

export class Deployments<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions & AllDeploymentsOptions) {
    return RequestHelper.get<DeploymentSchema[]>()(
      this,
      endpoint`projects/${projectId}/deployments`,
      options,
    );
  }

  create(
    projectId: string | number,
    environment: string,
    sha: string,
    ref: string,
    tag: string,
    status: DeploymentStatus,
    options?: Sudo,
  ) {
    return RequestHelper.post<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments`,
      {
        environment,
        sha,
        ref,
        tag,
        status,
        ...options,
      },
    );
  }

  edit(projectId: string | number, deploymentId: number, status: DeploymentStatus, options?: Sudo) {
    return RequestHelper.put<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}`,
      {
        status,
        ...options,
      },
    );
  }

  show(projectId: string | number, deploymentId: number, options?: Sudo) {
    return RequestHelper.get<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}`,
      options,
    );
  }

  mergeRequests(projectId: string | number, deploymentId: number, options?: Sudo) {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}/merge_requests`,
      options,
    );
  }
}
