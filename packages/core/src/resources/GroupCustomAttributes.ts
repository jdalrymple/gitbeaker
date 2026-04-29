import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CustomAttributeSchema } from '../templates/ResourceCustomAttributes';

import { ResourceCustomAttributes } from '../templates';

export interface GroupCustomAttributes<C extends boolean = false>
  extends ResourceCustomAttributes<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema[], C, E, P>>;

  set<E extends boolean = false>(
    groupId: string | number,
    customAttributeId: string,
    value: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    customAttributeId: string,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    customAttributeId: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema, C, E, void>>;
}

export class GroupCustomAttributes<C extends boolean = false> extends ResourceCustomAttributes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
