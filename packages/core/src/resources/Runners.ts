import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CondensedGroupSchema } from './Groups';
import type { JobSchema } from './Jobs';
import type { SimpleProjectSchema } from './Projects';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';

export interface RunnerToken extends Record<string, unknown> {
  id: number;
  token: string;
  token_expires_at: string;
}

export interface RunnerSchema extends Record<string, unknown> {
  id: number;
  paused: boolean;
  description: string;
  ip_address: string;
  is_shared: boolean;
  runner_type: 'instance_type' | 'group_type' | 'project_type';
  name: string;
  online: boolean;
  status: 'online' | 'offline';
}

export interface ExpandedRunnerSchema extends RunnerSchema {
  architecture: string | null;
  description: string;
  contacted_at: string;
  platform: string | null;
  projects: Pick<
    SimpleProjectSchema,
    'id' | 'name' | 'name_with_namespace' | 'path' | 'path_with_namespace'
  >[];
  groups: CondensedGroupSchema[];
  revision: string | null;
  tag_list: string[] | null;
  version: string | null;
  access_level: string;
  maximum_timeout: number | null;
  run_untagged: boolean;
  locked: boolean;
}

export type AllRunnersOptions = {
  type?: 'instance_type' | 'group_type' | 'project_type';
  status?: 'online' | 'offline' | 'stale' | 'never_contacted' | 'active' | 'paused';
  paused?: boolean;
  tagList?: string[];
};

export type EditRunnerOptions = {
  description?: string;
  active?: boolean;
  paused?: boolean;
  tagList?: string[];
  runUntagged?: boolean;
  locked?: boolean;
  accessLevel?: 'not_protected' | 'ref_protected';
  maximumTimeout?: number;
};

export type CreateRunnerOptions = {
  info?: Record<string, string>;
  description?: string;
  active?: boolean;
  paused?: boolean;
  tagList?: string[];
  runUntagged?: boolean;
  locked?: boolean;
  accessLevel?: 'not_protected' | 'ref_protected';
  maximumTimeout?: number;
  maintainerNote?: string;
  maintenanceNote?: string;
};

export class Runners<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllRunnersOptions &
      BaseRequestSearchParams &
      OneOrNoneOf<{
        projectId: string | number;
        owned: boolean;
        groupId: string | number;
      }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RunnerSchema[], C, E, P>> {
    const { projectId, groupId, owned, sudo, showExpanded, maxPages, ...searchParams } =
      options || {};

    ensureRequiredParams({ projectId, groupId, owned }, { minExpected: 0 });

    const url =
      !owned && !projectId && !groupId
        ? 'runners/all'
        : getPrefixedUrl('runners', { projects: projectId, groups: groupId });

    return RequestHelper.get<RunnerSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  allJobs<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    runnerId: number,
    options?: {
      status?: string;
      orderBy?: string;
      sort?: string;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<JobSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<JobSchema[]>()(this, `runners/${runnerId}/jobs`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  // https://docs.gitlab.com/15.9/ee/api/runners.html#register-a-new-runner
  create<E extends boolean = false>(
    token: string,
    options?: CreateRunnerOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerToken, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RunnerToken>()(this, `runners`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        token,
      },
    });
  }

  edit<E extends boolean = false>(
    runnerId: number,
    options?: EditRunnerOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedRunnerSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedRunnerSchema>()(this, `runners/${runnerId}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  enable<E extends boolean = false>(
    projectId: string | number,
    runnerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<RunnerSchema>()(this, endpoint`projects/${projectId}/runners`, {
      sudo,
      showExpanded,
      body: {
        runnerId,
      },
    });
  }

  disable<E extends boolean = false>(
    projectId: string | number,
    runnerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/runners/${runnerId}`, {
      sudo,
      showExpanded,
    });
  }

  // Create - Convenience method
  register<E extends boolean = false>(
    token: string,
    options?: CreateRunnerOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerToken, C, E, void>> {
    return this.create<E>(token, options);
  }

  remove<E extends boolean = false>({
    runnerId,
    token,
    ...options
  }: OneOf<{ runnerId: number; token: string }> & ShowExpanded<E> & Sudo): Promise<
    GitlabAPIResponse<void, C, E, void>
  > {
    const { sudo, showExpanded, ...searchParams } = options;

    ensureRequiredParams({ runnerId, token });

    const url = getPrefixedUrl('', { runners: runnerId || true });
    const sp = runnerId
      ? searchParams
      : {
          ...searchParams,
          token,
        };

    return RequestHelper.del()(this, url, {
      sudo,
      showExpanded,
      searchParams: sp,
    });
  }

  resetRegistrationToken<E extends boolean = false>(
    {
      runnerId,
      token,
      ...options
    }: OneOrNoneOf<{ runnerId: string; token: string }> & ShowExpanded<E> & Sudo = {} as any,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options;

    ensureRequiredParams({ runnerId, token });

    const url = getPrefixedUrl('reset_registration_token', { runners: runnerId || true });

    return RequestHelper.post<void>()(this, url, {
      sudo,
      showExpanded,
      body: {
        ...body,
        token,
      },
    });
  }

  show<E extends boolean = false>(
    runnerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedRunnerSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExpandedRunnerSchema>()(this, `runners/${runnerId}`, {
      sudo,
      showExpanded,
    });
  }

  verify<E extends boolean = false>(
    options?: {
      systemId?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(this, `runners/verify`, {
      sudo,
      showExpanded,
      body,
    });
  }
}
