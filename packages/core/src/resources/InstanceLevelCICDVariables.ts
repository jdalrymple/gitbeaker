import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface CICDVariableSchema extends Record<string, unknown> {
  key: string;
  description?: string | null;
  variable_type: string;
  value: string;
  protected: boolean;
  masked: boolean;
  raw: boolean;
}

export class InstanceLevelCICDVariables<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CICDVariableSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CICDVariableSchema[]>()(this, 'admin/ci/variables', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    key: string,
    value: string,
    options?: {
      description?: string;
      variableType?: string;
      protected?: boolean;
      masked?: boolean;
      raw?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CICDVariableSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CICDVariableSchema>()(this, 'admin/ci/variables', {
      sudo,
      showExpanded,
      body: { ...body, key, value },
    });
  }

  edit<E extends boolean = false>(
    keyId: string,
    value: string,
    options?: {
      description?: string;
      variableType?: string;
      protected?: boolean;
      masked?: boolean;
      raw?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CICDVariableSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<CICDVariableSchema>()(this, endpoint`admin/ci/variables/${keyId}`, {
      sudo,
      showExpanded,
      body: { ...body, value },
    });
  }

  show<E extends boolean = false>(
    keyId: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CICDVariableSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<CICDVariableSchema>()(this, endpoint`admin/ci/variables/${keyId}`, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    keyId: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<void>()(this, endpoint`admin/ci/variables/${keyId}`, {
      sudo,
      showExpanded,
    });
  }
}
