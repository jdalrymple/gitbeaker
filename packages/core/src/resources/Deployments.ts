import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitSchema } from './Commits';
import type { EnvironmentSchema } from './Environments';
import type { AllMergeRequestsOptions, MergeRequestSchema } from './MergeRequests';
import type { PipelineSchema } from './Pipelines';
import type { RunnerSchema } from './Runners';
import type { SimpleUserSchema } from './Users';

import { RequestHelper, endpoint } from '../infrastructure';

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
  user?: SimpleUserSchema;
  pipeline?: PipelineSchema;
}

export interface DeploymentApprovalStatusSchema extends Record<string, unknown> {
  user: SimpleUserSchema;
  status: 'approved' | 'rejected';
  created_at: string;
  comment: string;
}

export interface DeploymentSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  ref: string;
  sha: string;
  created_at: string;
  updated_at: string;
  status: DeploymentStatus;
  user: SimpleUserSchema;
  deployable: DeployableSchema;
  environment: EnvironmentSchema;
  pending_approval_count?: number;
  approvals?: DeploymentApprovalStatusSchema[];
}

export type AllDeploymentsOptions = {
  orderBy?: 'id' | 'iid' | 'created_at' | 'updated_at' | 'ref';
  sort?: 'asc' | 'desc';
  updatedAfter?: string;
  updatedBefore?: string;
  environment?: string;
  status?: 'created' | 'running' | 'success' | 'failed' | 'canceled' | 'blocked';
};

export class Deployments<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: AllDeploymentsOptions & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DeploymentSchema[], C, E, P>> {
    const { showExpanded, sudo, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<DeploymentSchema[]>()(
      this,
      endpoint`projects/${projectId}/deployments`,
      {
        showExpanded,
        sudo,
        maxPages,
        searchParams,
      },
    );
  }

  allMergeRequests<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    deploymentId: number,
    options?: AllMergeRequestsOptions & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>> {
    const { showExpanded, sudo, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}/merge_requests`,
      {
        showExpanded,
        sudo,
        maxPages,
        searchParams,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    environment: string,
    sha: string,
    ref: string,
    tag: boolean,
    options?: { status?: 'running' | 'success' | 'failed' | 'canceled' } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DeploymentSchema, C, E, void>> {
    const { showExpanded, sudo, ...searchParams } = options || {};

    return RequestHelper.post<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments`,
      {
        showExpanded,
        sudo,
        searchParams: {
          ...searchParams,
          environment,
          sha,
          ref,
          tag,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    deploymentId: number,
    status: 'running' | 'success' | 'failed' | 'canceled',
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DeploymentSchema, C, E, void>> {
    const { showExpanded, sudo, ...body } = options || {};

    return RequestHelper.put<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}`,
      {
        showExpanded,
        sudo,
        body: {
          ...body,
          status,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    deploymentId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.del<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  setApproval<E extends boolean = false>(
    projectId: string | number,
    deploymentId: number,
    status: 'approved' | 'rejected',
    options?: { comment?: string; representedAs?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DeploymentApprovalStatusSchema, C, E, void>> {
    const { showExpanded, sudo, ...body } = options || {};

    return RequestHelper.post<DeploymentApprovalStatusSchema>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}/approval`,
      {
        showExpanded,
        sudo,
        body: {
          ...body,
          status,
        },
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    deploymentId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DeploymentSchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.get<DeploymentSchema>()(
      this,
      endpoint`projects/${projectId}/deployments/${deploymentId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }
}
