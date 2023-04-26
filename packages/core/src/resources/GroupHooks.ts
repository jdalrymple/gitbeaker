import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceHooks } from '../templates';
import type {
  AddResourceHookOptions,
  EditResourceHookOptions,
  ExpandedHookSchema,
} from '../templates/ResourceHooks';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface GroupHookSchema extends ExpandedHookSchema {
  groupId: number;
  subgroup_events: boolean;
}

export interface GroupHooks<C extends boolean = false> {
  add<E extends boolean = false>(
    groupId: string | number,
    url: string,
    options?: AddResourceHookOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupHookSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupHookSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    hookId: number,
    url: string,
    options?: EditResourceHookOptions & Sudo & ShowExpanded<E>,
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
