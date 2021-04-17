import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
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
export class ResourceDeployTokens<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add(
    resourceId: string | number,
    tokenName: string,
    tokenScopes: DeployTokenScope[],
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<DeployTokenSchema>()(
      this,
      `${encodeURIComponent(resourceId)}/deploy_tokens`,
      {
        name: tokenName,
        scopes: tokenScopes,
        ...options,
      },
    );
  }

  all({ resourceId, ...options }: { resourceId?: string | number } & PaginatedRequestOptions) {
    let url: string;

    if (resourceId) {
      url = `${encodeURIComponent(resourceId)}/deploy_tokens`;
    } else {
      url = 'deploy_tokens';
    }

    return RequestHelper.get<DeployTokenSchema[]>()(this, url, options);
  }

  remove(resourceId: string | number, tokenId: number, options?: Sudo) {
    const [rId, tId] = [resourceId, tokenId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/deploy_tokens/${tId}`, options);
  }
}
