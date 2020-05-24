import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectCustomAttributes extends ResourceCustomAttributes {
  all(projectId: string | number, options?: PaginatedRequestOptions);

  set(projectId: string | number, customAttributeId: number, value: string, options?: Sudo);

  remove(projectId: string | number, customAttributeId: number, options?: Sudo);

  show(projectId: string | number, customAttributeId: number, options?: Sudo);
}

export class ProjectCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
