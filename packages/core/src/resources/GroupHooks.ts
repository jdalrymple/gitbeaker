import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceHooks } from '../templates';
import type { ExpandedHookSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface GroupHookSchema extends ExpandedHookSchema {
  groupId: number;
}

export interface GroupHooks<C extends boolean = false> {
  add<E extends boolean = false>(
    groupId: string | number,
    url: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupHookSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupHookSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    hookId: number,
    url: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupHookSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupHookSchema, C, E, void>>;
}

export class GroupHooks<C extends boolean = false> extends ResourceHooks<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
