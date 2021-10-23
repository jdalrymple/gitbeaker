import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
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
  all(
    projectId: string | number,
    options: { scopes?: 'enabled' | 'disabled' } & PaginatedRequestOptions = {},
  ) {
    return RequestHelper.get<FeatureFlagSchema[]>()(
      this,
      endpoint`projects/${projectId}/feature_flags`,
      options,
    );
  }

  create(
    projectId: string | number,
    flagName: string,
    version: string,
    options?: BaseRequestOptions,
  ) {
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

  edit(projectId: string | number, flagName: string, options?: BaseRequestOptions) {
    return RequestHelper.put<FeatureFlagSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags/${flagName}`,
      options,
    );
  }

  remove(projectId: string | number, flagName: string, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/feature_flags/${flagName}`,
      options,
    );
  }

  show(projectId: string | number, flagName: string, options?: Sudo) {
    return RequestHelper.get<FeatureFlagSchema>()(
      this,
      endpoint`projects/${projectId}/feature_flags/${flagName}`,
      options,
    );
  }
}
