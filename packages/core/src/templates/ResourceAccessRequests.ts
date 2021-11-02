import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper, Sudo } from '../infrastructure';

export type AccessLevel = 0 | 5 | 10 | 20 | 30 | 40 | 50;

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

  all(resourceId: string | number) {
    return RequestHelper.get<AccessRequestSchema[]>()(
      this,
      endpoint`${resourceId}/access_requests`,
    );
  }

  request(resourceId: string | number) {
    return RequestHelper.post<AccessRequestSchema>()(this, endpoint`${resourceId}/access_requests`);
  }

  approve(
    resourceId: string | number,
    userId: number,
    options?: { accessLevel?: AccessLevel } & Sudo,
  ) {
    return RequestHelper.post<AccessRequestSchema>()(
      this,
      endpoint`${resourceId}/access_requests/${userId}/approve`,
      options,
    );
  }

  deny(resourceId: string | number, userId: number) {
    return RequestHelper.del()(this, endpoint`${resourceId}/access_requests/${userId}`);
  }
}
