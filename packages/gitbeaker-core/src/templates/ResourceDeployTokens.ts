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

// https://docs.gitlab.com/ee/api/deploy_tokens.html
export class ResourceDeployTokens extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  add(
    resourceId: string | number,
    tokenName: string,
    tokenScopes: string[],
    options?: BaseRequestOptions,
  ) {

    return RequestHelper.post(this, `${encodeURIComponent(resourceId)}/deploy_tokens`, {
      name: tokenName,
      scopes: tokenScopes,
      ...options,
    });
  }

  all({ resourceId, ...options }: { resourceId?: string | number } & PaginatedRequestOptions) {

    if (resourceId) {
      url = `${encodeURIComponent(resourceId)}/deploy_tokens`;
    } else {
      // For getting all deploy tokens. (FIXME?) This needs to be at the root of the webserver, not after the resource type
      url = 'deploy_tokens';
    }

    return RequestHelper.get(this, url.join('/'), options);
  }

  remove(resourceId: string | number, tokenId: number, options?: Sudo) {
    const [rId, tId] = [resourceId, tokenId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/deploy_tokens/${tId}`, options);
  }
}
