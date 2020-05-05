import {
  BaseRequestOptions,
  BaseService,
  BaseServiceOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

interface IncludeInherited {
  includeInherited?: boolean;
}

type DeployTokenScope = 'read_repository' | 'read_registry' | 'write_registry';

// https://docs.gitlab.com/ee/api/deploy_tokens.html
export class ResourceDeployTokens extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  add(
    resourceId: string | number,
    tokenName: string,
    tokenScopes: DeployTokenScope[],
    options?: BaseRequestOptions,
  ) {

    return RequestHelper.post(this, `${encodeURIComponent(resourceId)}/deploy_tokens`, {
      name: tokenName,
      scopes: tokenScopes,
      ...options,
    });
  }

  all({ resourceId, ...options }: { resourceId?: string | number } & PaginatedRequestOptions) {
    let url;
    
    if (resourceId) {
      url = `${encodeURIComponent(resourceId)}/deploy_tokens`;
    } else {
      url = 'deploy_tokens';
    }

    return RequestHelper.get(this, url, options);
  }

  remove(resourceId: string | number, tokenId: number, options?: Sudo) {
    const [rId, tId] = [resourceId, tokenId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/deploy_tokens/${tId}`, options);
  }
}
