import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariables, ResourceVariableSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, CamelizedRecord } from '../infrastructure';

export interface GroupVariables<C extends boolean = false> extends ResourceVariables<C> {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, ResourceVariableSchema>[]>;

  create(
    groupId: string | number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, ResourceVariableSchema>>;

  edit(
    groupId: string | number,
    key: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, ResourceVariableSchema>>;

  show(
    groupId: string | number,
    key: string,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, ResourceVariableSchema>>;

  remove(groupId: string | number, key: string, options?: PaginatedRequestOptions): Promise<void>;
}

export class GroupVariables<C extends boolean = false> extends ResourceVariables<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('groups', options);
  }
}
