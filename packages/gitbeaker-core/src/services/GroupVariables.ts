import { ResourceVariables, ResourceVariableSchema } from '../templates';
import { BaseServiceOptions, PaginatedRequestOptions, BaseRequestOptions } from '../infrastructure';

export interface GroupVariables extends ResourceVariables {
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

export class GroupVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
