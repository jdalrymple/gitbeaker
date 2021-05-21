import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes, CustomAttributeSchema } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectCustomAttributes extends ResourceCustomAttributes {
  all(
    projectId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CustomAttributeSchema[]>;

  set(
    projectId: string | number,
    customAttributeId: number,
    value: string,
    options?: Sudo,
  ): Promise<CustomAttributeSchema>;

  remove(projectId: string | number, customAttributeId: number, options?: Sudo): Promise<void>;

  show(
    projectId: string | number,
    customAttributeId: number,
    options?: Sudo,
  ): Promise<CustomAttributeSchema>;
}

export class ProjectCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
