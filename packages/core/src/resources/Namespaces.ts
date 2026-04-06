import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestSearchParams,
  PaginationRequestSearchParams,
  RequestHelper,
  endpoint,
} from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
  members_count_with_descendants: number;
  billable_members_count: number;
  plan: string;
  trial_ends_on?: string;
  trial: boolean;
}

export interface NamespaceExistsSchema extends Record<string, unknown> {
  exists: boolean;
  suggests: string[];
}

export class Namespaces<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      search?: string;
      ownedOnly?: string;
      topLevelOnly?: boolean;
    } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E> &
      BaseRequestSearchParams,
  ): Promise<GitlabAPIResponse<NamespaceSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<NamespaceSchema[]>()(this, 'namespaces', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  exists<E extends boolean = false>(
    namespace: string,
    options?: { parentId?: string } & Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NamespaceSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<NamespaceSchema>()(this, endpoint`namespaces/${namespaceId}`, {
      sudo,
      showExpanded,
    });
  }
}
