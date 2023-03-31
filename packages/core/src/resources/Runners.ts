import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  Either,
  EitherOrNone3,
  EitherOrNone4,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { JobSchema } from './Jobs';
import type { SimpleProjectSchema } from './Projects';

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
  architecture?: string;
  description: string;
  contacted_at: string;
  platform?: string;
  projects?: Pick<
    SimpleProjectSchema,
    'id' | 'name' | 'name_with_namespace' | 'path' | 'path_with_namespace'
  >;
  revision?: string;
  tag_list?: string[];
  version?: string;
  access_level: string;
  maximum_timeout?: number;
}

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
      BaseRequestOptions<E> &
      PaginationRequestOptions<P> = {} as EitherOrNone3<
      { projectId?: string | number },
      { owned?: boolean },
      { groupId?: string | number }
    > &
      BaseRequestOptions<E> &
      PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<RunnerSchema[], C, E, P>> {
    let url: string;

    if (projectId) url = endpoint`projects/${projectId}/runners`;
    else if (groupId) url = endpoint`groups/${groupId}/runners`;
    else if (owned) url = 'runners';
    else url = 'runners/all';

    return RequestHelper.get<RunnerSchema[]>()(this, url, options);
  }

  // Convenience method
  create<E extends boolean = false>(
    token: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<RunnerToken, C, E, void>> {
    return RequestHelper.post<RunnerToken>()(this, `runners`, {
      token,
      ...options,
    });
  }

  edit<E extends boolean = false>(
    runnerId: number,
    options?: BaseRequestOptions<E>,
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

  allJobs<E extends boolean = false>(
    runnerId: number,
    options?: Sudo & ShowExpanded<E> & { status?: string; orderBy?: string; sort?: string },
  ): Promise<GitlabAPIResponse<JobSchema[], C, E, void>> {
    return RequestHelper.get<JobSchema[]>()(this, `runners/${runnerId}/jobs`, options);
  }

  // Convenience method
  register<E extends boolean = false>(
    token: string,
    options?: BaseRequestOptions<E>,
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

  resetRegistrationToken<E extends boolean = false>({
    projectId,
    groupId,
    runnerId,
    token,
    ...options
  }: EitherOrNone4<
    { projectId: string | number },
    { groupId: string | number },
    { runnerId: string },
    { token: string }
  > &
    Sudo &
    ShowExpanded<E> = {}): Promise<GitlabAPIResponse<void, C, E, void>> {
    let url: string;

    if (projectId) url = endpoint`projects/${projectId}/runners/reset_registration_token`;
    else if (groupId) url = endpoint`groups/${groupId}/runners/reset_registration_token`;
    else if (runnerId) url = `runners/${runnerId}/reset_registration_token`;
    else if (token) url = 'runners/reset_registration_token';
    else url = 'runners/reset_registration_token';

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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, `runners/verify`, options);
  }
}
