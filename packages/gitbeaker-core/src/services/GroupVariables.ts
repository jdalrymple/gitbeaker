import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariables, ResourceVariableSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions } from '../infrastructure';

export interface GroupVariables<C extends boolean = false> extends ResourceVariables<C> {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema[]>;

  create(groupId: string | number, options?: BaseRequestOptions);

  edit(groupId: string | number, keyId: string, options?: BaseRequestOptions);

  show(
    groupId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema>;

  remove(groupId: string | number, keyId: string, options?: PaginatedRequestOptions);
}

export class GroupVariables<C extends boolean = false> extends ResourceVariables<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('groups', options);
  }
}
