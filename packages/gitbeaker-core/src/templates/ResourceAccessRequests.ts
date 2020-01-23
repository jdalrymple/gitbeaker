import { BaseService, RequestHelper, BaseServiceOptions, Sudo } from '../infrastructure';

export type AccessLevel = 10 | 20 | 30 | 40 | 50;

export class ResourceAccessRequests extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  all(resourceId: string | number) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/access_requests`);
  }

  request(resourceId: string | number) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/access_requests`);
  }

  approve(
    resourceId: string | number,
    userId: number,
    { accessLevel }: { accessLevel?: AccessLevel } & Sudo = {},
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/access_requests/${uId}/approve`, {
      accessLevel,
    });
  }

  deny(resourceId: string | number, userId: number) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/access_requests/${uId}`);
  }
}
