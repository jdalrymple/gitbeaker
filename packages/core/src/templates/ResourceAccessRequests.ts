import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

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
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessRequestSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<AccessRequestSchema[]>()(
      this,
      endpoint`${resourceId}/access_requests`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
      },
    );
  }

  request<E extends boolean = false>(
    resourceId: string | number,
    options?: Sudo & ShowExpanded<E>,
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
    options?: { accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN> } & Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/access_requests/${userId}`, {
      sudo,
      showExpanded,
    });
  }
}
