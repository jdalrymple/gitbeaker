import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes, CustomAttributeSchema } from '../templates';
import { PaginatedRequestOptions, CamelizedRecord, Sudo } from '../infrastructure';

export interface ProjectCustomAttributes<C extends boolean = false>
  extends ResourceCustomAttributes<C> {
  all(
    projectId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>[]>;

  set(
    projectId: string | number,
    customAttributeId: number,
    value: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>>;

  remove(projectId: string | number, customAttributeId: number, options?: Sudo): Promise<void>;

  show(
    projectId: string | number,
    customAttributeId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, CustomAttributeSchema>>;
}

export class ProjectCustomAttributes<C extends boolean> extends ResourceCustomAttributes<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
