import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceCustomAttributes } from '../templates';
import type { CustomAttributeSchema } from '../templates/ResourceCustomAttributes';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProjectCustomAttributes<C extends boolean = false>
  extends ResourceCustomAttributes<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema[], C, E, P>>;

  set<E extends boolean = false>(
    projectId: string | number,
    customAttributeId: string,
    value: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    customAttributeId: string,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    customAttributeId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema, C, E, void>>;
}

export class ProjectCustomAttributes<C extends boolean> extends ResourceCustomAttributes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
