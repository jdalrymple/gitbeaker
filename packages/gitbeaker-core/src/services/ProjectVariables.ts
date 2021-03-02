import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariables, ResourceVariableSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions } from '../infrastructure';

export interface ProjectVariables<C extends boolean = false> extends ResourceVariables<C> {
  all(
    projectId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema[]>;

  create(projectId: string | number, options?: BaseRequestOptions);

  edit(projectId: string | number, keyId: string, options?: BaseRequestOptions);

  show(
    projectId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema>;

  remove(projectId: string | number, keyId: string, options?: PaginatedRequestOptions);
}

export class ProjectVariables<C extends boolean = false> extends ResourceVariables<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
