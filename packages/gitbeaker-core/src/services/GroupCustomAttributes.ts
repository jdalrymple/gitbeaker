import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupCustomAttributes<C extends boolean> extends ResourceCustomAttributes<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions);

  set(groupId: string | number, customAttributeId: number, value: string, options?: Sudo);

  remove(groupId: string | number, customAttributeId: number, options?: Sudo);

  show(groupId: string | number, customAttributeId: number, options?: Sudo);
}

export class GroupCustomAttributes<C extends boolean> extends ResourceCustomAttributes<C> {
  constructor(options: BaseServiceOptions<C>) {
    super('groups', options);
  }
}
