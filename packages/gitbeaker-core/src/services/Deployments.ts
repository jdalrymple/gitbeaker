import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { CommitSchemaDefault, CommitSchemaCamelized } from './Commits';
import { PipelineSchemaDefault, PipelineSchemaCamelized } from './Pipelines';
import { UserSchemaDefault, UserSchemaCamelized } from './Users';
import { RunnerSchemaDefault, RunnerSchemaCamelized } from './Runners';

export type DeploymentStatus = 'created' | 'running' | 'success' | 'failed' | 'canceled';

// Ref: https://docs.gitlab.com/12.6/ee/api/deployments.html#list-project-deployments
export interface DeploymentSchemaDefault {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  user: UserSchemaDefault;
}

export interface DeploymentSchemaCamelized {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  user: UserSchemaCamelized;
}

export interface DeployableDefault {
  id: number;
  ref: string;
  name: string;
  runner?: RunnerSchemaDefault;
  stage?: string;
  started_at?: Date;
  status?: DeploymentStatus;
  tag: boolean;
  commit?: CommitSchemaDefault;
  coverage?: string;
  created_at?: Date;
  finished_at?: Date;
  user?: UserSchemaDefault;
  pipeline?: PipelineSchemaDefault;
}

export interface DeployableCamelized {
  id: number;
  ref: string;
  name: string;
  runner?: RunnerSchemaCamelized;
  stage?: string;
  startedAt?: Date;
  status?: DeploymentStatus;
  tag: boolean;
  commit?: CommitSchemaCamelized;
  coverage?: string;
  createdAt?: Date;
  finishedAt?: Date;
  user?: UserSchemaCamelized;
  pipeline?: PipelineSchemaCamelized;
}

export type Deployable = DeployableDefault | DeployableCamelized;

export class Deployments extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deployments`, options);
  }

  show(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/deployments/${dId}`, options);
  }

  mergeRequests(projectId: string | number, deploymentId: number, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/deployments/${dId}/merge_requests`, options);
  }
}
