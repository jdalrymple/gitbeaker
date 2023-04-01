import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitSchema } from './Commits';
import type { PipelineSchema } from './Pipelines';
import type { UserSchema } from './Users';
import type { RunnerSchema } from './Runners';
import type { EnvironmentSchema } from './Environments';
import type { MergeRequestSchema } from './MergeRequests';

export type DeploymentStatus = 'created' | 'running' | 'success' | 'failed' | 'canceled';

export interface DeployableSchema extends Record<string, unknown> {
  id: number;
  ref: string;
  name: string;
  runner?: RunnerSchema;
  stage?: string;
  started_at?: string;
  status?: DeploymentStatus;
  tag: boolean;
  commit?: CommitSchema;
  coverage?: string;
  created_at?: string;
  finished_at?: string;
  user?: UserSchema;
  pipeline?: PipelineSchema;
}

export interface DeploymentStatusSchema extends Record<string, unknown> {
  user: UserSchema;
  status: 'approved' | 'rejected';
}

export interface DeploymentSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  created_at: string;
  updated_at: string;
  status: DeploymentStatus;
  user: UserSchema;
  deployable: DeployableSchema;
  environment: EnvironmentSchema;
}

export interface AllDeploymentsOptions {
  orderBy?: 'id' | 'iid' | 'created_at' | 'updated_at' | 'ref';
  sort?: 'asc' | 'desc';
  updatedAfter?: string;
  updatedBefore?: string;
  environment?: string;
  status?: 'created' | 'running' | 'success' | 'failed' | 'canceled' | 'blocked';
}

export class Deployments<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: AllDeploymentsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DeploymentSchema[], C, E, P>> {
    return RequestHelper.get<DeploymentSchema[]>()(
      this,
      endpoint`projects/${projectId}/deployments`,
      options,
    );
  }

  allMergeRequests<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    deploymentId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>> {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}/merge_requests`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    environment: string,
    sha: string,
    ref: string,
    tag: string,
    options?: { status?: DeploymentStatus } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DeploymentSchema, C, E, void>> {
    return RequestHelper.post<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments`,
      {
        environment,
        sha,
        ref,
        tag,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    deploymentId: number,
    status: DeploymentStatus,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DeploymentSchema, C, E, void>> {
    return RequestHelper.put<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}`,
      {
        ...options,
        status,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    deploymentId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.del<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}`,
      options,
    );
  }

  setApproval<E extends boolean = false>(
    projectId: string | number,
    deploymentId: number,
    options?: { status?: 'approved' | 'rejected' } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DeploymentStatusSchema, C, E, void>> {
    return RequestHelper.post<DeploymentStatusSchema>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}/approval`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    deploymentId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DeploymentSchema, C, E, void>> {
    return RequestHelper.get<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}`,
      options,
    );
  }
}
