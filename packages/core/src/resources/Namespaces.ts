import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
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
  parent_id?: number;
  avatar_url: string;
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
    options?: { search?: string; ownedOnly?: string } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NamespaceSchema[], C, E, P>> {
    return RequestHelper.get<NamespaceSchema[]>()(this, 'namespaces', options);
  }

  exists<E extends boolean = false>(
    namespace: string,
    options?: { parentId?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NamespaceExistsSchema, C, E, void>> {
    return RequestHelper.get<NamespaceExistsSchema>()(
      this,
      endpoint`namespaces/${namespace}/exists`,
      options,
    );
  }

  show<E extends boolean = false>(
    namespaceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<NamespaceSchema, C, E, void>> {
    return RequestHelper.get<NamespaceSchema>()(this, endpoint`namespaces/${namespaceId}`, options);
  }
}
