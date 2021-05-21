import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo } from '../infrastructure';
import { AccessLevel, AccessRequestSchema } from '../models';

export class ResourceAccessRequests<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<AccessRequestSchema[]>()(this, `${rId}/access_requests`);
  }

  request(resourceId: string | number) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<AccessRequestSchema>()(this, `${rId}/access_requests`);
  }

  approve(
    resourceId: string | number,
    userId: number,
    options?: { accessLevel?: AccessLevel } & Sudo,
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post<AccessRequestSchema>()(
      this,
      `${rId}/access_requests/${uId}/approve`,
      options,
    );
  }

  deny(resourceId: string | number, userId: number) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/access_requests/${uId}`);
  }
}
