import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { CommitSchema } from './Commits';
import { PipelineSchema } from './Pipelines';
import { UserSchema } from './Users';
import { RunnerSchema } from './Runners';
import { EnvironmentSchema } from './Environments';
import { MergeRequestsSchema } from './MergeRequests';

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

export class Deployments<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions<'keyset' | 'offset'>) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<DeploymentSchema[]>()(this, `projects/${pId}/deployments`, options);
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
    const [pId] = [projectId].map(encodeURIComponent);

    return RequestHelper.post<DeploymentSchema>()(this, `projects/${pId}/deployments`, {
      environment,
      sha,
      ref,
      tag,
      status,
      ...options,
    });
  }

  edit(projectId: string | number, deploymentId: number, status: DeploymentStatus, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.put<DeploymentSchema>()(this, `projects/${pId}/deployments/${dId}`, {
      status,
      ...options,
    });
  }

  show(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.get<DeploymentSchema>()(
      this,
      `projects/${pId}/deployments/${dId}`,
      options,
    );
  }

  mergeRequests(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestsSchema[]>()(
      this,
      `projects/${pId}/deployments/${dId}/merge_requests`,
      options,
    );
  }
}
