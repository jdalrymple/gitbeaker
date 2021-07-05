import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariables } from '../templates';
import { VariableSchema } from '../templates/types';
import { BaseRequestOptions, PaginatedRequestOptions, CamelizedRecord } from '../infrastructure';

export interface ProjectVariables<C extends boolean = false> extends ResourceVariables<C> {
  all(
    projectId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, VariableSchema>[]>;

  create(
    projectId: string | number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, VariableSchema>>;

  edit(
    projectId: string | number,
    keyId: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, VariableSchema>>;

  show(
    projectId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, VariableSchema>>;

  remove(
    projectId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<void>;
}

export class ProjectVariables<C extends boolean = false> extends ResourceVariables<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
