import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo, Camelize } from '../infrastructure';
import { CommitSchema } from './Commits';
import { PipelineSchema } from './Pipelines';
import { UserSchema } from './Users';
import { RunnerSchema } from './Runners';

export type DeploymentStatus = 'created' | 'running' | 'success' | 'failed' | 'canceled';

export type DeploymentSchema<C extends boolean> = {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  user: UserSchema<C>;
};

export interface DeployableDefault<C extends boolean> {
  id: number;
  ref: string;
  name: string;
  runner?: RunnerSchema<C>;
  stage?: string;
  started_at?: Date;
  status?: DeploymentStatus;
  tag: boolean;
  commit?: CommitSchema<C>;
  coverage?: string;
  created_at?: Date;
  finished_at?: Date;
  user?: UserSchema<C>;
  pipeline?: PipelineSchema<C>;
}

export type Deployable<C extends boolean> = C extends true
  ? Camelize<DeployableDefault<C>>
  : DeployableDefault<C>;

export class Deployments<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C>(this, `projects/${pId}/deployments`, options);
  }

  show(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/deployments/${dId}`, options);
  }

  mergeRequests(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/deployments/${dId}/merge_requests`, options);
  }
}
