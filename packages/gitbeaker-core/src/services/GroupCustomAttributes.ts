import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes, CustomAttributeSchema } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupCustomAttributes extends ResourceCustomAttributes {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CustomAttributeSchema[]>;

  set(
    groupId: string | number,
    customAttributeId: number,
    value: string,
    options?: Sudo,
  ): Promise<CustomAttributeSchema>;

  remove(groupId: string | number, customAttributeId: number, options?: Sudo): Promise<void>;

  show(
    groupId: string | number,
    customAttributeId: number,
    options?: Sudo,
  ): Promise<CustomAttributeSchema>;
}

export class GroupCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
