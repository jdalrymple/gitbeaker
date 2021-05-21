import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariables, ResourceVariableSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions } from '../infrastructure';

export interface GroupVariables extends ResourceVariables {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema[]>;

  create(groupId: string | number, options?: BaseRequestOptions): Promise<ResourceVariableSchema>;

  edit(
    groupId: string | number,
    key: string,
    options?: BaseRequestOptions,
  ): Promise<ResourceVariableSchema>;

  show(
    groupId: string | number,
    key: string,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema>;

  remove(groupId: string | number, key: string, options?: PaginatedRequestOptions): Promise<void>;
}

export class GroupVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
