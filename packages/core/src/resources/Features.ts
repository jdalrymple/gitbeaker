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

export interface FeatureGateSchema extends Record<string, unknown> {
  key: string;
  value: boolean | number;
}

export interface FeatureDefinitionSchema extends Record<string, unknown> {
  name: string;
  introduced_by_url: string;
  rollout_issue_url: string;
  milestone?: string;
  log_state_changes?: boolean | null;
  type: string;
  group: string;
  default_enabled: boolean;
}

export interface FeatureSchema extends Record<string, unknown> {
  name: string;
  state: string;
  gates: FeatureGateSchema[];
  definition: FeatureDefinitionSchema | null;
}

export class Features<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FeatureSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<FeatureSchema[]>()(this, 'features', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  allDefinitions<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FeatureDefinitionSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<FeatureDefinitionSchema[]>()(this, 'features/definitions', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    name: string,
    value: boolean | number | string,
    options?: {
      key?: 'percentage_of_actors' | 'percentage_of_time';
      featureGroup?: string;
      user?: string;
      group?: string;
      namespace?: string;
      project?: string;
      repository?: string;
      runner?: string;
      force?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<FeatureSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<FeatureSchema>()(this, endpoint`features/${name}`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        value,
      },
    });
  }

  remove<E extends boolean = false>(
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`features/${name}`, {
      sudo,
      showExpanded,
    });
  }
}
