import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export type VariableType = 'env_var' | 'file';
export interface VariableSchema extends Record<string, unknown> {
  variable_type: VariableType;
  value: string;
  protected: boolean;
  masked: boolean;
  key: string;
}
export type VariableFilter = Record<'environment_scope', number | string>;

export class ResourceVariables<C extends boolean> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<VariableSchema[], C, E, P>> {
    return RequestHelper.get<VariableSchema[]>()(this, endpoint`${resourceId}/variables`, options);
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    key: string,
    value: string,
    options?: {
      variableType?: VariableType;
      protected?: boolean;
      masked?: boolean;
      environmentScope?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>> {
    return RequestHelper.post<VariableSchema>()(this, endpoint`${resourceId}/variables`, {
      key,
      value,
      ...options,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    key: string,
    value: string,
    options?: {
      variableType?: VariableType;
      protected?: boolean;
      masked?: boolean;
      environmentScope?: string;
      filter: VariableFilter;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>> {
    return RequestHelper.put<VariableSchema>()(this, endpoint`${resourceId}/variables/${key}`, {
      value,
      ...options,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    key: string,
    options?: { filter?: VariableFilter } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>> {
    return RequestHelper.get<VariableSchema>()(
      this,
      endpoint`${resourceId}/variables/${key}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    key: string,
    options?: { filter?: VariableFilter } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/variables/${key}`, options);
  }
}
