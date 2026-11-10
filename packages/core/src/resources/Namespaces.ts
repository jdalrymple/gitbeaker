import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { BaseRequestSearchParams, RequestHelper, endpoint } from '../infrastructure';

export interface CondensedNamespaceSchema extends Record<string, unknown> {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  parent_id?: number | null;
  avatar_url: string | null;
  web_url: string;
}

export interface NamespaceSchema extends CondensedNamespaceSchema {
  members_count_with_descendants?: number;
  billable_members_count?: number;
  max_seats_used?: number;
  max_seats_used_changed_at?: string;
  seats_in_use?: number;
  plan?: string;
  end_date?: string | null;
  trial_ends_on?: string | null;
  trial?: boolean;
  root_repository_size?: number;
  projects_count?: number;
}

export interface NamespaceExistsSchema extends Record<string, unknown> {
  exists: boolean;
  suggests: string[];
}

export class Namespaces<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      search?: string;
      ownedOnly?: boolean;
      topLevelOnly?: boolean;
      fullPathSearch?: boolean;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<NamespaceSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<NamespaceSchema[]>()(this, 'namespaces', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  exists<E extends boolean = false>(
    namespace: string,
    options?: { parentId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<NamespaceExistsSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<NamespaceExistsSchema>()(
      this,
      endpoint`namespaces/${namespace}/exists`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  show<E extends boolean = false>(
    namespaceId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<NamespaceSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<NamespaceSchema>()(this, endpoint`namespaces/${namespaceId}`, {
      sudo,
      showExpanded,
    });
  }
}
