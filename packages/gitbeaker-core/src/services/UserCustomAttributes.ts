import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  ResourceCustomAttributes,
  CustomAttributeSchema,
} from '../templates/ResourceCustomAttributes';
import { PaginatedRequestOptions, CamelizedRecord, Sudo } from '../infrastructure';

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
  constructor(options: BaseServiceOptions<C> = {}) {
    super('users', options);
  }
}
