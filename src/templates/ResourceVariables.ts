import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseServiceOptions,
  BaseRequestOptions,
  PaginatedRequestOptions,
  ResourceId,
  ResourceType,
  KeyId,
} from '@src/types';

const url = (resourceId, resource2Type, resource2Id) => {
  const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);
  const output = [rId];

  if (resource2Id) output.push(resource2Type, r2Id);

  output.push('variables');

  return output.join('/');
};

class ResourceVariables extends BaseService {
  protected resource2Type: string | null;

  constructor(
    resourceType: ResourceType,
    resource2Type: ResourceType | null,
    options: BaseServiceOptions,
  ) {
    super({ url: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all(resourceId: ResourceType, resource2Id: ResourceId, options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, url(resourceId, this.resource2Type, resource2Id), options);
  }

  create(resourceId: ResourceType, resource2Id: ResourceId, options?: BaseRequestOptions) {
    return RequestHelper.post(this, url(resourceId, this.resource2Type, resource2Id), options);
  }

  edit(
    resourceId: ResourceType,
    resource2Id: ResourceId,
    keyId: KeyId,
    options?: BaseRequestOptions,
  ) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.put(
      this,
      `${url(resourceId, this.resource2Type, resource2Id)}/${kId}`,
      options,
    );
  }

  show(
    resourceId: ResourceType,
    resource2Id: ResourceId,
    keyId: KeyId,
    options?: BaseRequestOptions,
  ) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(
      this,
      `${url(resourceId, this.resource2Type, resource2Id)}/${kId}`,
      options,
    );
  }

  remove(
    resourceId: ResourceType,
    resource2Id: ResourceId,
    keyId: KeyId,
    options?: BaseRequestOptions,
  ) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(
      this,
      `${url(resourceId, this.resource2Type, resource2Id)}/${kId}`,
      options,
    );
  }
}

export default ResourceVariables;
