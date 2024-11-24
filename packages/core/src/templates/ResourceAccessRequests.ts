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
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessRequestSchema[], C, E, P>> {
    return RequestHelper.get<AccessRequestSchema[]>()(
      this,
      endpoint`${resourceId}/access_requests`,
      options,
    );
  }

  request<E extends boolean = false>(
    resourceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessRequestSchema, C, E, void>> {
    return RequestHelper.post<AccessRequestSchema>()(
      this,
      endpoint`${resourceId}/access_requests`,
      options,
    );
  }

  approve<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    options?: { accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN> } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessRequestSchema, C, E, void>> {
    return RequestHelper.put<AccessRequestSchema>()(
      this,
      endpoint`${resourceId}/access_requests/${userId}/approve`,
      options,
    );
  }

  deny<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/access_requests/${userId}`, options);
  }
}
