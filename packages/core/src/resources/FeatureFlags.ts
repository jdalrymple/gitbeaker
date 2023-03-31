import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface FeatureFlagStrategyScope {
  id: number;
  environment_scope: string;
}
export interface FeatureFlagStrategy {
  id: number;
  name: string;
  parameters: {
    user_ids: string;
  };
  scopes?: FeatureFlagStrategyScope[];
}

export interface FeatureFlagSchema extends Record<string, unknown> {
  name: string;
  description: string;
  active: boolean;
  version: string;
  created_at: string;
  updated_at: string;
  scopes?: string[];
  strategies?: FeatureFlagStrategy[];
}

export class FeatureFlags<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: { scopes?: 'enabled' | 'disabled' } & PaginationRequestOptions<P> &
      BaseRequestOptions<E> = {} as any,
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
    options?: BaseRequestOptions<E>,
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
    options?: BaseRequestOptions<E>,
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
