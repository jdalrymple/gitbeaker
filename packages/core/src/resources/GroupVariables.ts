import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariables } from '../templates';
import { VariableSchema } from '../templates/types';
import { PaginatedRequestOptions, BaseRequestOptions, CamelizedRecord } from '../infrastructure';

export interface GroupVariables<C extends boolean = false> extends ResourceVariables<C> {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, VariableSchema>[]>;

  create(
    groupId: string | number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, VariableSchema>>;

  edit(
    groupId: string | number,
    key: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, VariableSchema>>;

  show(
    groupId: string | number,
    key: string,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, VariableSchema>>;

  remove(groupId: string | number, key: string, options?: PaginatedRequestOptions): Promise<void>;
}

export class GroupVariables<C extends boolean = false> extends ResourceVariables<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
