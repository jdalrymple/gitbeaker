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
import { AccessLevel } from '../constants';
import { RequestHelper, endpoint } from '../infrastructure';

export interface AccessRequestSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
  state: string;
  created_at: string;
  requested_at: string;
}

export class ResourceAccessRequests<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessRequestSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<AccessRequestSchema[]>()(
      this,
      endpoint`${resourceId}/access_requests`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
      },
    );
  }

  request<E extends boolean = false>(
    resourceId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessRequestSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<AccessRequestSchema>()(
      this,
      endpoint`${resourceId}/access_requests`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  approve<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    options?: { accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN> } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessRequestSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<AccessRequestSchema>()(
      this,
      endpoint`${resourceId}/access_requests/${userId}/approve`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  deny<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/access_requests/${userId}`, {
      sudo,
      showExpanded,
    });
  }
}
