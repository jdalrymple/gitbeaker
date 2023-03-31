import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
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
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExperimentSchema[], C, E, P>> {
    return RequestHelper.get<ExperimentSchema[]>()(this, 'experiments', options);
  }
}
