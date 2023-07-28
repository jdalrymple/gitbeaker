import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export type ProtectedTagAccessLevel = 0 | 30 | 40 | 60;

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
  accessLevel: number;
}>;

export class ProtectedTags<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema[], C, E, P>> {
    return RequestHelper.get<ProtectedTagSchema[]>()(
      this,
      endpoint`projects/${projectId}/protected_tags`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: {
      createAccessLevel?: ProtectedTagAccessLevel;
      allowedToCreate?: ProtectedTagAccessLevelEntity;
    } & Sudo &
      ShowExpanded<E>,
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

  // Convenience method - create
  protect<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: {
      createAccessLevel?: ProtectedTagAccessLevel;
      allowedToCreate?: ProtectedTagAccessLevelEntity;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedTagSchema, C, E, void>> {
    return this.create(projectId, tagName, options);
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

  remove<E extends boolean = false>(
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

  // Convenience method - remove
  unprotect<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return this.remove(projectId, tagName, options);
  }
}
