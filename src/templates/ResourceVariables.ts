import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';
import { RequestOptions } from '../infrastructure/RequestHelper';

function url(
  resourceType: ResourceType,
  resourceId: ResourceId,
  resource2Type: Resource2Type,
  resource2Id: Resource2Id) {
  const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

  let output = `${resourceType}/${rId}/`;

  if (resource2Id) {
    output += `${resource2Type}/${r2Id}/`;
  }

  output += 'variables';

  return output;
}

class ResourceVariables extends BaseService {
  protected resourceType: ResourceType;
  protected resource2Type: Resource2Type;

  constructor(
    resourceType: ResourceType,
    resource2Type: Resource2Type,
    baseParams: BaseModelContructorOptions,
  ) {
    super(baseParams);

    this.resourceType = resourceType;
    this.resource2Type = resource2Type;
  }

  all(resourceId: ResourceType, resource2Id: Resource2Id) {
    return RequestHelper.get(
      this,
      url(this.resourceType, resourceId, this.resource2Type, resource2Id),
    );
  }

  create(resourceId: ResourceType, resource2Id: Resource2Id, options: RequestOptions) {
    return RequestHelper.post(
      this,
      url(this.resourceType, resourceId, this.resource2Type, resource2Id),
      options,
    );
  }

  edit(resourceId: ResourceType, resource2Id: Resource2Id, keyId: string, options: RequestOptions) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.put(
      this,
      `${url(this.resourceType, resourceId, this.resource2Type, resource2Id)}/${kId}`,
      options,
    );
  }

  show(resourceId: ResourceType, resource2Id: Resource2Id, keyId: string) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(
      this,
      `${url(this.resourceType, resourceId, this.resource2Type, resource2Id)}/${kId}`,
    );
  }

  remove(resourceId: ResourceType, resource2Id: Resource2Id, keyId: string) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(
      this,
      `${url(this.resourceType, resourceId, this.resource2Type, resource2Id)}/${kId}`,
    );
  }
}

export default ResourceVariables;
