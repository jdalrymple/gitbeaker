import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

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
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VariableSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<VariableSchema[]>()(this, endpoint`${resourceId}/variables`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
    });
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
      description?: string;
      raw?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<VariableSchema>()(this, endpoint`${resourceId}/variables`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        key,
        value,
      },
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
      description?: string;
      raw?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<VariableSchema>()(this, endpoint`${resourceId}/variables/${key}`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        value,
      },
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    key: string,
    options?: { filter?: VariableFilter } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VariableSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<VariableSchema>()(this, endpoint`${resourceId}/variables/${key}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    key: string,
    options?: { filter?: VariableFilter } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/variables/${key}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }
}
