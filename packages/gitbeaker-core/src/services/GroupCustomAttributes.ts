import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupCustomAttributes extends ResourceCustomAttributes {
  all(groupId: string | number, options?: PaginatedRequestOptions);

  set(groupId: string | number, customAttributeId: number, value: string, options?: Sudo);

  remove(groupId: string | number, customAttributeId: number, options?: Sudo);

  show(groupId: string | number, customAttributeId: number, options?: Sudo);
}

export class GroupCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}
