import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, ensureRequiredParams, endpoint, getPrefixedUrl } from '../infrastructure';

export interface ServiceAccountSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
  email?: string;
  unconfirmed_email?: string;
}

export type ServiceAccountOptions = {
  name?: string;
  username?: string;
  email?: string;
};

export class ServiceAccounts<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      orderBy?: 'id' | 'username';
      sort?: 'asc' | 'desc';
    } & BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ServiceAccountSchema[], C, E, P>> {
    const { projectId, groupId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('service_accounts', {
      projects: projectId,
      groups: groupId,
    });

    return RequestHelper.get<ServiceAccountSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      ServiceAccountOptions &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ServiceAccountSchema, C, E, void>> {
    const { projectId, groupId, sudo, showExpanded, ...body } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('service_accounts', {
      projects: projectId,
      groups: groupId,
    });

    return RequestHelper.post<ServiceAccountSchema>()(this, url, {
      sudo,
      showExpanded,
      body,
    });
  }

  edit<E extends boolean = false>(
    serviceAccountId: number,
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      ServiceAccountOptions &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ServiceAccountSchema, C, E, void>> {
    const { projectId, groupId, sudo, showExpanded, ...body } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl(endpoint`service_accounts/${serviceAccountId}`, {
      projects: projectId,
      groups: groupId,
    });

    return RequestHelper.patch<ServiceAccountSchema>()(this, url, {
      sudo,
      showExpanded,
      body,
    });
  }

  remove<E extends boolean = false>(
    serviceAccountId: number,
    options?: {
      hardDelete?: boolean;
    } & OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { projectId, groupId, sudo, showExpanded, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl(endpoint`service_accounts/${serviceAccountId}`, {
      projects: projectId,
      groups: groupId,
    });

    return RequestHelper.del()(this, url, {
      sudo,
      showExpanded,
      searchParams,
    });
  }
}
