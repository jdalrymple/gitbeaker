import { BaseService, RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

import { CommitSchema } from './Commits';
import { PipelineSchema } from './Pipelines';
import { UserSchema } from './Users';
import { RunnerSchema } from './Runners';

export type DeploymentStatus = 'created' | 'running' | 'success' | 'failed' | 'canceled';

// Ref: https://docs.gitlab.com/12.6/ee/api/deployments.html#list-project-deployments
export interface DeploymentSchema {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  user: UserSchema;
}

export interface Deployable {
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

export class Deployments extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deployments`, options);
  }

  show(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deployments/${dId}`, options);
  }
}
