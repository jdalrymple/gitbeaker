import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { CustomAttributeSchema } from '../models';
import { PaginatedRequestOptions, CamelizedRecord, Sudo } from '../infrastructure';
import { ResourceCustomAttributes } from '../templates';

export interface UserCustomAttributes<C extends boolean = false>
  extends ResourceCustomAttributes<C> {
  all(
    userId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>[]>;

  set(
    userId: string | number,
    customAttributeId: number,
    value: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>>;

  remove(userId: string | number, customAttributeId: number, options?: Sudo): Promise<void>;

  show(
    userId: string | number,
    customAttributeId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>>;
}

export class UserCustomAttributes<C extends boolean = false> extends ResourceCustomAttributes<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('users', options);
  }
}
