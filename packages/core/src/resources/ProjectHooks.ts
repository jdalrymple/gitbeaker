import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceHooks } from '../templates';
import type {
  AddResourceHookOptions,
  EditResourceHookOptions,
  ExpandedHookSchema,
} from '../templates/ResourceHooks';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProjectHookSchema extends ExpandedHookSchema {
  projectId: number;
}

export interface ProjectHooks<C extends boolean = false> {
  add<E extends boolean = false>(
    projectId: string | number,
    url: string,
    options?: AddResourceHookOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectHookSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectHookSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    hookId: number,
    url: string,
    options?: EditResourceHookOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectHookSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
  show<E extends boolean = false>(
    projectId: string | number,
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectHookSchema, C, E, void>>;
}

export class ProjectHooks<C extends boolean = false> extends ResourceHooks<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
