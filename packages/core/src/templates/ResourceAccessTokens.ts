import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper, Sudo } from '../infrastructure';
import { AccessLevel } from './ResourceAccessRequests';

export type AccessTokenScope = "api" | "read_api" | "read_registry" | "write_registry" | "read_repository" | "write_repository";

export interface AccessTokenSchema extends Record<string, unknown> {
  user_id: number;
  scopes: AccessTokenScope[];
  name: string;
  expires_at: string;
  id: number;
  active: boolean;
  created_at: string;
  revoked: boolean;
  access_level: AccessLevel;
}

export type AccessTokenCreatedSchema = AccessTokenSchema & {
  token: string;
}

export interface AccessTokenRequestSchema extends Record<string, unknown> {
  scopes: AccessTokenScope[];
  name: string;
  expires_at?: string;
  access_level?: AccessLevel;
}


export interface AccessRequestSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
  state: string;
  created_at: string;
  requested_at: string;
}

export class ResourceAccessTokens<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number) {
    return RequestHelper.get<AccessTokenSchema[]>()(
      this,
      endpoint`${resourceId}/access_tokens`,
    );
  }

  create(resourceId: string | number, tokenSpecifications: AccessTokenRequestSchema & Sudo) {
    return RequestHelper.post<AccessTokenCreatedSchema>()(this, endpoint`${resourceId}/access_tokens`, tokenSpecifications);
  }

  show(resourceId: string | number, tokenId: string | number) {
    return RequestHelper.get<AccessTokenSchema>()(this, endpoint`${resourceId}/access_tokens/${tokenId}`);
  }

  revoke(resourceId: string | number, tokenId: string | number) {
    return RequestHelper.del()(this, endpoint`${resourceId}/access_tokens/${tokenId}`);
  }
}
