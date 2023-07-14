import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  Either,
  EitherOrNone,
  EitherOrNone3,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { JobSchema } from './Jobs';
import type { SimpleProjectSchema } from './Projects';
import type { CondensedGroupSchema } from './Groups';

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
    {
      projectId,
      groupId,
      owned,
      ...options
    }: EitherOrNone3<
      { projectId?: string | number },
      { owned?: boolean },
      { groupId?: string | number }
    > &
      AllRunnersOptions &
      BaseRequestOptions<E> &
      PaginationRequestOptions<P> = {} as any,
  ): Promise<GitlabAPIResponse<RunnerSchema[], C, E, P>> {
    let url: string;

    if (projectId) url = endpoint`projects/${projectId}/runners`;
    else if (groupId) url = endpoint`groups/${groupId}/runners`;
    else if (owned) url = 'runners';
    else url = 'runners/all';

    return RequestHelper.get<RunnerSchema[]>()(this, url, options);
  }

  allJobs<E extends boolean = false>(
    runnerId: number,
    options?: Sudo & ShowExpanded<E> & { status?: string; orderBy?: string; sort?: string },
  ): Promise<GitlabAPIResponse<JobSchema[], C, E, void>> {
    return RequestHelper.get<JobSchema[]>()(this, `runners/${runnerId}/jobs`, options);
  }

  // https://docs.gitlab.com/15.9/ee/api/runners.html#register-a-new-runner
  create<E extends boolean = false>(
    token: string,
    options?: CreateRunnerOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RunnerToken, C, E, void>> {
    return RequestHelper.post<RunnerToken>()(this, `runners`, {
      token,
      ...options,
    });
  }

  edit<E extends boolean = false>(
    runnerId: number,
    options?: EditRunnerOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedRunnerSchema, C, E, void>> {
    return RequestHelper.put<ExpandedRunnerSchema>()(this, `runners/${runnerId}`, options);
  }

  enable<E extends boolean = false>(
    projectId: string | number,
    runnerId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RunnerSchema, C, E, void>> {
    return RequestHelper.post<RunnerSchema>()(this, endpoint`projects/${projectId}/runners`, {
      runnerId,
      ...options,
    });
  }

  disable<E extends boolean = false>(
    projectId: string | number,
    runnerId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/runners/${runnerId}`, options);
  }

  // Create - Convenience method
  register<E extends boolean = false>(
    token: string,
    options?: CreateRunnerOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RunnerToken, C, E, void>> {
    return this.create<E>(token, options);
  }

  remove<E extends boolean = false>({
    runnerId,
    token,
    ...options
  }: Either<{ runnerId: number }, { token: string }> & Sudo & ShowExpanded<E>): Promise<
    GitlabAPIResponse<void, C, E, void>
  > {
    let url: string;

    if (runnerId) url = `runners/${runnerId}`;
    else if (token) {
      url = 'runners';
    } else
      throw new Error(
        'Missing required argument. Please supply a runnerId or a token in the options parameter',
      );

    return RequestHelper.del()(this, url, {
      token,
      ...options,
    });
  }

  resetRegistrationToken<E extends boolean = false>(
    {
      runnerId,
      token,
      ...options
    }: EitherOrNone<{ runnerId: string }, { token: string }> & Sudo & ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    let url: string;

    if (runnerId) url = endpoint`runners/${runnerId}/reset_registration_token`;
    else if (token) url = 'runners/reset_registration_token';
    else {
      throw new Error('Missing either runnerId or token parameters');
    }

    return RequestHelper.post<void>()(this, url, {
      token,
      ...options,
    });
  }

  show<E extends boolean = false>(
    runnerId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedRunnerSchema, C, E, void>> {
    return RequestHelper.get<ExpandedRunnerSchema>()(this, `runners/${runnerId}`, options);
  }

  verify<E extends boolean = false>(
    options?: { systemId?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, `runners/verify`, options);
  }
}
