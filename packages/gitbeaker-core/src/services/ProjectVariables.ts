import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariableSchema } from '../models';
import { BaseRequestOptions, PaginatedRequestOptions, CamelizedRecord } from '../infrastructure';
import { ResourceVariables } from '../templates';

export interface ProjectVariables<C extends boolean = false> extends ResourceVariables<C> {
  all(
    projectId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, ResourceVariableSchema>[]>;

  create(
    projectId: string | number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, ResourceVariableSchema>>;

  edit(
    projectId: string | number,
    keyId: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, ResourceVariableSchema>>;

  show(
    projectId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, ResourceVariableSchema>>;

  remove(
    projectId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<void>;
}

export class ProjectVariables<C extends boolean = false> extends ResourceVariables<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
