import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectCustomAttributes<C extends boolean = false>
  extends ResourceCustomAttributes() {
  all(projectId: string | number, options?: PaginatedRequestOptions);

  set(projectId: string | number, customAttributeId: number, value: string, options?: Sudo);

  remove(projectId: string | number, customAttributeId: number, options?: Sudo);

  show(projectId: string | number, customAttributeId: number, options?: Sudo);
}

export class ProjectCustomAttributes<C extends boolean> extends ResourceCustomAttributes() {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
