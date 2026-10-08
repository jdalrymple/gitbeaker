import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface RunnerControllerSchema extends Record<string, unknown> {
  id: number;
  description: string;
  state: 'disabled' | 'enabled' | 'dry_run';
  created_at: string;
  updated_at: string;
  connected?: boolean;
}

export interface RunnerControllerScopesSchema extends Record<string, unknown> {
  instance_level_scopings: {
    created_at: string;
    updated_at: string;
  }[];
  runner_level_scopings: {
    runner_id: number;
    created_at: string;
    updated_at: string;
  }[];
}

export class RunnerControllers<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<RunnerControllerSchema[]>()(this, 'runner_controllers', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    options?: {
      description?: string;
      state?: 'disabled' | 'enabled' | 'dry_run';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RunnerControllerSchema>()(this, 'runner_controllers', {
      sudo,
      showExpanded,
      body,
    });
  }

  edit<E extends boolean = false>(
    runnerControllerId: number,
    options?: {
      description?: string;
      state?: 'disabled' | 'enabled' | 'dry_run';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<RunnerControllerSchema>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  show<E extends boolean = false>(
    runnerControllerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<RunnerControllerSchema>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    runnerControllerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`runner_controllers/${runnerControllerId}`, {
      sudo,
      showExpanded,
    });
  }

  allScopes<E extends boolean = false>(
    runnerControllerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerScopesSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<RunnerControllerScopesSchema>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/scopes`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  addInstanceScope<E extends boolean = false>(
    runnerControllerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/scopes/instance`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  removeInstanceScope<E extends boolean = false>(
    runnerControllerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/scopes/instance`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  addRunnerScope<E extends boolean = false>(
    runnerControllerId: number,
    runnerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/scopes/runners/${runnerId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  removeRunnerScope<E extends boolean = false>(
    runnerControllerId: number,
    runnerId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/scopes/runners/${runnerId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
