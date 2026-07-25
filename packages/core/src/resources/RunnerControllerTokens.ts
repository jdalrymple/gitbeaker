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

export interface RunnerControllerTokenSchema extends Record<string, unknown> {
  id: number;
  runner_controller_id: number;
  description: string;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
  token?: string;
}

export class RunnerControllerTokens<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    runnerControllerId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerTokenSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<RunnerControllerTokenSchema[]>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/tokens`,
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
    runnerControllerId: number,
    description: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerTokenSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<RunnerControllerTokenSchema>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/tokens`,
      {
        sudo,
        showExpanded,
        body: {
          description,
        },
      },
    );
  }

  show<E extends boolean = false>(
    runnerControllerId: number,
    tokenId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerTokenSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<RunnerControllerTokenSchema>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/tokens/${tokenId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    runnerControllerId: number,
    tokenId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/tokens/${tokenId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  rotate<E extends boolean = false>(
    runnerControllerId: number,
    tokenId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RunnerControllerTokenSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<RunnerControllerTokenSchema>()(
      this,
      endpoint`runner_controllers/${runnerControllerId}/tokens/${tokenId}/rotate`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
