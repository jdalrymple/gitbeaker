import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { VariableFilter, VariableSchema, VariableType } from '../templates/ResourceVariables';

import { ResourceVariables } from '../templates';

export interface ProjectVariableSchema extends VariableSchema {
  environment_scope: string;
}

export interface ProjectVariables<C extends boolean = false> extends ResourceVariables<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectVariableSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    key: string,
    value: string,
    options?: {
      variableType?: VariableType;
      protected?: boolean;
      masked?: boolean;
      masked_and_hidden?: boolean;
      environmentScope?: string;
      description?: string;
      raw?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectVariableSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    key: string,
    value: string,
    options?: {
      variableType?: VariableType;
      protected?: boolean;
      masked?: boolean;
      masked_and_hidden?: boolean;
      environmentScope?: string;
      raw?: boolean;
      filter: VariableFilter;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectVariableSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    key: string,
    options?: { filter?: VariableFilter } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectVariableSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    key: string,
    options?: { filter?: VariableFilter } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class ProjectVariables<C extends boolean = false> extends ResourceVariables<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
