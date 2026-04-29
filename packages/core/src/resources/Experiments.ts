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

import { RequestHelper } from '../infrastructure';

export interface ExperimentGateSchema {
  key: string;
  value: boolean | number;
}

export interface ExperimentSchema extends Record<string, unknown> {
  key: string;
  definition: {
    name: string;
    introduced_by_url: string;
    rollout_issue_url: string;
    milestone: string;
    type: string;
    group: string;
    default_enabled: boolean;
  };
  current_status: {
    state: string;
    gates?: ExperimentGateSchema[];
  };
}

export class Experiments<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExperimentSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ExperimentSchema[]>()(this, 'experiments', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }
}
