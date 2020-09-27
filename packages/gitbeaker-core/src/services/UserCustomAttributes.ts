import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface UserCustomAttributes extends ResourceCustomAttributes {
  all(userId: string | number, options?: PaginatedRequestOptions);

  set(userId: string | number, customAttributeId: number, value: string, options?: Sudo);

  remove(userId: string | number, customAttributeId: number, options?: Sudo);

  show(userId: string | number, customAttributeId: number, options?: Sudo);
}

export class UserCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions = {}) {
    super('users', options);
  }
}
