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

export interface ProtectedTagAccessLevel {
  access_level: 0 | 30 | 40 | 60;
  access_level_description: string;
}

export interface ProtectedTagSchema extends Record<string, unknown> {
  name: string;
  create_access_levels?: ProtectedTagAccessLevel[];
}

export class ProtectedTags<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema[], C, E, P>> {
    return RequestHelper.get<ProtectedTagSchema[]>()(
      this,
      endpoint`projects/${projectId}/protected_tags`,
      options,
    );
  }

  protect<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: { createAccessLevel?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema, C, E, void>> {
    const { sudo, showExpanded, ...opts } = options || {};

    return RequestHelper.post<ProtectedTagSchema>()(
      this,
      endpoint`projects/${projectId}/protected_tags`,
      {
        searchParams: {
          name: tagName,
          ...opts,
        },
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema, C, E, void>> {
    return RequestHelper.get<ProtectedTagSchema>()(
      this,
      endpoint`projects/${projectId}/protected_tags/${tagName}`,
      options,
    );
  }

  unprotect<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/protected_tags/${tagName}`,
      options,
    );
  }
}
