import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type {
  AddResourceHookOptions,
  EditResourceHookOptions,
  ExpandedHookSchema,
} from '../templates/ResourceHooks';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceHooks } from '../templates';

export interface GroupHookSchema extends ExpandedHookSchema {
  groupId: number;
  subgroup_events: boolean;
}

export interface GroupHooks<C extends boolean = false> {
  add<E extends boolean = false>(
    groupId: string | number,
    url: string,
    options?: AddResourceHookOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupHookSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupHookSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    hookId: number,
    url: string,
    options?: EditResourceHookOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupHookSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    hookId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    hookId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupHookSchema, C, E, void>>;
}

export class GroupHooks<C extends boolean = false> extends ResourceHooks<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
