import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface FeatureFlagStrategyScopeSchema {
  id: number;
  environment_scope: string;
}

export interface FeatureFlagStrategySchema {
  id: number;
  name: string;
  parameters: Record<string, unknown>;
  scopes?: FeatureFlagStrategyScopeSchema[];
}

export interface FeatureFlagSchema extends Record<string, unknown> {
  name: string;
  description: string;
  active: boolean;
  version: string;
  created_at: string;
  updated_at: string;
  scopes?: string[];
  strategies?: FeatureFlagStrategySchema[];
}

export type CreateFeatureFlagOptions = {
  description?: string;
  active?: boolean;
  strategies?: {
    name: string;
    parameters?: Record<string, string>;
    scopes?: MappedOmit<FeatureFlagStrategyScopeSchema, 'id'>[];
  };
};

export type EditFeatureFlagOptions = {
  description?: string;
  active?: boolean;
  strategies?: {
    id: string;
    name?: string;
    _destroy?: boolean;
    parameters?: Record<string, string>;
    scopes?: ({ _destroy?: boolean } & FeatureFlagStrategyScopeSchema)[];
  };
};

export class FeatureFlags<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { scope?: 'enabled' | 'disabled' } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<FeatureFlagSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<FeatureFlagSchema[]>()(
      this,
      endpoint`projects/${projectId}/feature_flags`,
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
    flagName: string,
    version: string,
    options?: CreateFeatureFlagOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FeatureFlagSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<FeatureFlagSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name: flagName,
          version,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    featureFlagName: string,
    options?: EditFeatureFlagOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FeatureFlagSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<FeatureFlagSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags/${featureFlagName}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    flagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/feature_flags/${flagName}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    flagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<FeatureFlagSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<FeatureFlagSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags/${flagName}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
