import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { CustomAttributeSchema } from '../models';
import { PaginatedRequestOptions, CamelizedRecord, Sudo } from '../infrastructure';
import { ResourceCustomAttributes } from '../templates';

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
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
