import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { AccessLevel } from '../constants';
import { RequestHelper, endpoint } from '../infrastructure';

export type ProtectedTagAccessLevel =
  | AccessLevel.NO_ACCESS
  | AccessLevel.DEVELOPER
  | AccessLevel.MAINTAINER
  | AccessLevel.ADMIN;

export interface ProtectedTagAccessLevelSummarySchema {
  id: number;
  access_level: ProtectedTagAccessLevel;
  access_level_description: string;
}

export interface ProtectedTagSchema extends Record<string, unknown> {
  name: string;
  create_access_levels?: ProtectedTagAccessLevelSummarySchema[];
}

export type ProtectedTagAccessLevelEntity = OneOf<{
  userId: number;
  groupId: number;
  accessLevel: ProtectedTagAccessLevel;
}>;

export class ProtectedTags<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProtectedTagSchema[]>()(
      this,
      endpoint`projects/${projectId}/protected_tags`,
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
    tagName: string,
    options?: {
      createAccessLevel?: ProtectedTagAccessLevel;
      allowedToCreate?: ProtectedTagAccessLevelEntity[];
    } & BaseRequestSearchParams &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProtectedTagSchema>()(
      this,
      endpoint`projects/${projectId}/protected_tags`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name: tagName,
        },
      },
    );
  }

  // Convenience method - create
  protect<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: {
      createAccessLevel?: ProtectedTagAccessLevel;
      allowedToCreate?: ProtectedTagAccessLevelEntity[];
    } & BaseRequestSearchParams &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema, C, E, void>> {
    return this.create(projectId, tagName, options);
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ProtectedTagSchema>()(
      this,
      endpoint`projects/${projectId}/protected_tags/${tagName}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/protected_tags/${tagName}`, {
      sudo,
      showExpanded,
    });
  }

  // Convenience method - remove
  unprotect<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return this.remove(projectId, tagName, options);
  }
}
