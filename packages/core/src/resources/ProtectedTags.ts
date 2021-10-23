import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface ProtectedTagAccessLevel {
  access_level: 0 | 30 | 40 | 60;
  access_level_description: string;
}

export interface ProtectedTagSchema extends Record<string, unknown> {
  name: string;
  create_access_levels?: ProtectedTagAccessLevel[];
}

export class ProtectedTags<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<ProtectedTagSchema[]>()(
      this,
      endpoint`projects/${projectId}/protected_tags`,
      options,
    );
  }

  protect(projectId: string | number, tagName: string, options?: BaseRequestOptions) {
    return RequestHelper.post<ProtectedTagSchema>()(
      this,
      endpoint`projects/${projectId}/protected_tags`,
      {
        name: tagName,
        ...options,
      },
    );
  }

  show(projectId: string | number, tagName: string, options?: Sudo) {
    return RequestHelper.get<ProtectedTagSchema>()(
      this,
      endpoint`projects/${projectId}/protected_tags/${tagName}`,
      options,
    );
  }

  unprotect(projectId: string | number, tagName: string, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/protected_tags/${tagName}`,
      options,
    );
  }
}
