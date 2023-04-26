import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
    scopes?: Omit<FeatureFlagStrategyScopeSchema, 'id'>[];
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
    scopes?: (FeatureFlagStrategyScopeSchema & { _destroy?: boolean })[];
  };
};

export class FeatureFlags<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { scope?: 'enabled' | 'disabled' } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<FeatureFlagSchema[], C, E, P>> {
    return RequestHelper.get<FeatureFlagSchema[]>()(
      this,
      endpoint`projects/${projectId}/feature_flags`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    flagName: string,
    version: string,
    options?: CreateFeatureFlagOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<FeatureFlagSchema, C, E, void>> {
    return RequestHelper.post<FeatureFlagSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags`,
      {
        name: flagName,
        version,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    featureFlagName: string,
    options?: EditFeatureFlagOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<FeatureFlagSchema, C, E, void>> {
    return RequestHelper.put<FeatureFlagSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags/${featureFlagName}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    flagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/feature_flags/${flagName}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    flagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<FeatureFlagSchema, C, E, void>> {
    return RequestHelper.get<FeatureFlagSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags/${flagName}`,
      options,
    );
  }
}
