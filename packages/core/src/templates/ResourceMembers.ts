import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from './ResourceAccessRequests';

export interface IncludeInherited {
  includeInherited?: boolean;
}

export interface MemberSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
  expires_at: string;
  access_level: AccessLevel;
  email: string;
  group_saml_identity: {
    extern_uid: string;
    provider: string;
    saml_provider_id: number;
  };
}

export class ResourceMembers<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add(
    resourceId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<MemberSchema>()(this, endpoint`${resourceId}/members`, {
      userId: String(userId),
      accessLevel,
      ...options,
    });
  }

  all(
    resourceId: string | number,
    { includeInherited, ...options }: IncludeInherited & PaginatedRequestOptions = {},
  ) {
    const rId = encodeURIComponent(resourceId);
    const url = [rId, 'members'];

    if (includeInherited) url.push('all');

    return RequestHelper.get<MemberSchema[]>()(this, url.join('/'), options);
  }

  edit(
    resourceId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.put<MemberSchema>()(this, endpoint`${resourceId}/members/${userId}`, {
      accessLevel,
      ...options,
    });
  }

  show(
    resourceId: string | number,
    userId: number,
    { includeInherited, ...options }: IncludeInherited & Sudo = {},
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    const url = [rId, 'members'];

    if (includeInherited) url.push('all');

    url.push(uId);

    return RequestHelper.get<MemberSchema>()(
      this,
      url.join('/'),
      options as Record<string, unknown>,
    );
  }

  remove(resourceId: string | number, userId: number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`${resourceId}/members/${userId}`, options);
  }
}
