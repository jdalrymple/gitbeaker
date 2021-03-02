import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';
import { ResourceLabels } from '../templates';

export interface GroupLabels<C extends boolean = false> extends ResourceLabels<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions<'keyset' | 'offset'>);

  create(groupId: string | number, labelName: string, color: string, options?: BaseRequestOptions);

  edit(groupId: string | number, labelName: string, options?: BaseRequestOptions);

  remove(groupId: string | number, labelName: string, options?: Sudo);

  subscribe(groupId: string | number, labelId: number, options?: Sudo);

  unsubscribe(groupId: string | number, labelId: number, options?: Sudo);
}

export class GroupLabels<C extends boolean = false> extends ResourceLabels<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('groups', options);
  }
}
