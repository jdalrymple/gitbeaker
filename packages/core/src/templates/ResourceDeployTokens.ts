import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export type DeployTokenScope =
  | 'read_repository'
  | 'read_registry'
  | 'write_registry'
  | 'read_package_registry'
  | 'write_package_registry';

export interface DeployTokenSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
  expires_at: string;
  scopes?: string[];
}

// https://docs.gitlab.com/ee/api/deploy_tokens.html
export class ResourceDeployTokens<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add(
    resourceId: string | number,
    tokenName: string,
    tokenScopes: DeployTokenScope[],
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<DeployTokenSchema>()(this, endpoint`${resourceId}/deploy_tokens`, {
      name: tokenName,
      scopes: tokenScopes,
      ...options,
    });
  }

  all({
    resourceId,
    projectId,
    groupId,
    ...options
  }: {
    resourceId?: string | number;
    projectId?: string | number;
    groupId?: string | number;
  } & PaginatedRequestOptions = {}) {
    const prefix =
      resourceId || projectId || groupId
        ? endpoint`${(resourceId || projectId || groupId) as string}/`
        : '';

    return RequestHelper.get<DeployTokenSchema[]>()(this, `${prefix}deploy_tokens`, options);
  }

  remove(resourceId: string | number, tokenId: number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`${resourceId}/deploy_tokens/${tokenId}`, options);
  }
}
