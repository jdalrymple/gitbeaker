import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariables, ResourceVariableSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions } from '../infrastructure';

export interface ProjectVariables extends ResourceVariables {
  all(
    projectId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema[]>;

  create(projectId: string | number, options?: BaseRequestOptions): Promise<ResourceVariableSchema>;

  edit(
    projectId: string | number,
    keyId: string,
    options?: BaseRequestOptions,
  ): Promise<ResourceVariableSchema>;

  show(
    projectId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema>;

  remove(
    projectId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<void>;
}

export class ProjectVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
