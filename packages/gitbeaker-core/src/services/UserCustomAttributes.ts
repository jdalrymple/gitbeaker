import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes, CustomAttributeSchema } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface UserCustomAttributes extends ResourceCustomAttributes {
  all(userId: string | number, options?: PaginatedRequestOptions): Promise<CustomAttributeSchema[]>;

  set(
    userId: string | number,
    customAttributeId: number,
    value: string,
    options?: Sudo,
  ): Promise<CustomAttributeSchema>;

  remove(userId: string | number, customAttributeId: number, options?: Sudo): Promise<void>;

  show(
    userId: string | number,
    customAttributeId: number,
    options?: Sudo,
  ): Promise<CustomAttributeSchema>;
}

export class UserCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('users', options);
  }
}
