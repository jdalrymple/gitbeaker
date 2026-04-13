import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

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
    options?: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProtectedTagSchema[]>()(
      this,
      endpoint`projects/${projectId}/protected_tags`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams
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
      Sudo &
      ShowExpanded<E>,
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
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema, C, E, void>> {
    return this.create(projectId, tagName, options);
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return this.remove(projectId, tagName, options);
  }
}
