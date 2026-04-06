import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExperimentSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ExperimentSchema[]>()(this, 'experiments', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }
}
