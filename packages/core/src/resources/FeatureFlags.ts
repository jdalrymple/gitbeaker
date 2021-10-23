import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
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
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<FeatureFlagSchema[]>()(this, `projects/${pId}/feature_flags`, options);
  }

  create(
    projectId: string | number,
    flagName: string,
    version: string,
    options?: BaseRequestOptions,
  ) {
    const [pId, fName, ver] = [projectId, flagName, version].map(encodeURIComponent);

    return RequestHelper.post<FeatureFlagSchema>()(this, `projects/${pId}/feature_flags`, {
      version: ver,
      name: fName,
      ...options,
    });
  }

  edit(projectId: string | number, flagName: string, options?: BaseRequestOptions) {
    const [pId, fName] = [projectId, flagName].map(encodeURIComponent);

    return RequestHelper.put<FeatureFlagSchema>()(
      this,
      `projects/${pId}/feature_flags/${fName}`,
      options,
    );
  }

  remove(projectId: string | number, flagName: string, options?: Sudo) {
    const [pId, fName] = [projectId, flagName].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/feature_flags/${fName}`, options);
  }

  show(projectId: string | number, flagName: string, options?: Sudo) {
    const [pId, fName] = [projectId, flagName].map(encodeURIComponent);

    return RequestHelper.get<FeatureFlagSchema>()(
      this,
      `projects/${pId}/feature_flags/${fName}`,
      options,
    );
  }
}
