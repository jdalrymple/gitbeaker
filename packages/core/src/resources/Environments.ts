import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { DeployableSchema, DeploymentSchema } from './Deployments';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import { SimpleProjectSchema } from './Projects';

export type EnvironmentTier = 'production' | 'staging' | 'testing' | 'development' | 'other';

export interface EnvironmentSchema extends Record<string, unknown> {
  id: number;
  name: string;
  slug: string;
  external_url: string;
  state: string;
  tier: EnvironmentTier;
  created_at: string;
  updated_at: string;
  enable_advanced_logs_querying: boolean;
  logs_api_path: string;
  flux_resource_path?: string;
  kubernetes_namespace?: string;
  last_deployment: DeploymentSchema;
  deployable: DeployableSchema;
  project?: SimpleProjectSchema;
  auto_stop_at: string | null;
  description: string | null;
  auto_stop_setting: string;
}

export type CondensedEnvironmentSchema = MappedOmit<
  EnvironmentSchema,
  'last_deployment' | 'deployable'
>;

export type ReviewAppSchema = MappedOmit<CondensedEnvironmentSchema, 'state'>;

export class Environments<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: {
      states?: 'available' | 'stopping' | 'stopped';
    } & BaseRequestSearchParams &
      OneOrNoneOf<{ name: string; search: string }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CondensedEnvironmentSchema[]>()(
      this,
      endpoint`projects/${projectId}/environments`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: { externalUrl?: string; tier?: EnvironmentTier } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CondensedEnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    environmentId: number,
    options?: { externalUrl?: string; tier?: EnvironmentTier } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<CondensedEnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    environmentId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  removeReviewApps<E extends boolean = false>(
    projectId: string | number,
    options?: { before?: string; limit?: number; dryRun?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<
    GitlabAPIResponse<
      { scheduled_entries: ReviewAppSchema[]; unprocessable_entries: ReviewAppSchema[] },
      C,
      E,
      void
    >
  > {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.del<{
      scheduled_entries: ReviewAppSchema[];
      unprocessable_entries: ReviewAppSchema[];
    }>()(this, endpoint`projects/${projectId}/environments/review_apps`, {
      sudo,
      showExpanded,
      body,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    environmentId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<EnvironmentSchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.get<EnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  stop<E extends boolean = false>(
    projectId: string | number,
    environmentId: number,
    options?: { force?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CondensedEnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}/stop`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  stopStale<E extends boolean = false>(
    projectId: string | number,
    before: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/environments/stop_stale`,
      {
        sudo,
        showExpanded,
        searchParams: { before },
      },
    );
  }
}
