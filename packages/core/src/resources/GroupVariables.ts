import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceVariables } from '../templates';
import type { VariableSchema, VariableType } from '../templates/types';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface GroupVariables<C extends boolean = false> extends ResourceVariables<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<VariableSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    key: string,
    value: string,
    options?: {
      variableType?: VariableType;
      protected?: boolean;
      masked?: boolean;
      environmentScope?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    key: string,
    value: string,
    options?: {
      variableType?: VariableType;
      protected?: boolean;
      masked?: boolean;
      environmentScope?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    key: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    key: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class GroupVariables<C extends boolean = false> extends ResourceVariables<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
