import { ResourceVariables, ResourceVariableSchema } from '../templates';
import { BaseServiceOptions, PaginatedRequestOptions, BaseRequestOptions } from '../infrastructure';

export interface ProjectVariables extends ResourceVariables {
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

export class ProjectVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
