import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes } from '../templates';
import { CustomAttributeSchema } from '../templates/types';
import { PaginatedRequestOptions, Sudo, CamelizedRecord } from '../infrastructure';

export interface GroupCustomAttributes<C extends boolean = false>
  extends ResourceCustomAttributes<C> {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>[]>;

  set(
    groupId: string | number,
    customAttributeId: string,
    value: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>>;

  remove(groupId: string | number, customAttributeId: string, options?: Sudo): Promise<void>;

  show(
    groupId: string | number,
    customAttributeId: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>>;
}

export class GroupCustomAttributes<C extends boolean = false> extends ResourceCustomAttributes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
