import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

const url = (resourceType, resourceId, resource2Type, resource2Id) => {
  const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);

  let output = `${resourceType}/${rId}/`;

  if (resource2Id) {
    output += `${resource2Type}/${r2Id}/`;
  }

  output += 'variables';

  return output;
};

class ResourceVariables extends BaseService {
  constructor(resourceType, resource2Type, ...args) {
    super(...args);

    this.resourceType = resourceType;
    this.resource2Type = resource2Type;
  }

  @api('<resourceId>', '<resource2Id>', { method: 'GET' })
  all(resourceId, resource2Id) {
    return RequestHelper.get(
      this,
      url(this.resourceType, resourceId, this.resource2Type, resource2Id),
    );
  }

  @api('<resourceId>', '<resource2Id>', { options: true, method: 'POST' })
  create(resourceId, resource2Id, options) {
    return RequestHelper.post(
      this,
      url(this.resourceType, resourceId, this.resource2Type, resource2Id),
      options,
    );
  }

  @api('<resourceId>', '<resource2Id>', '<keyId>', { options: true, method: 'PUT' })
  edit(resourceId, resource2Id, keyId, options) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.put(
      this,
      `${url(this.resourceType, resourceId, this.resource2Type, resource2Id)}/${kId}`,
      options,
    );
  }

  @api('<resourceId>', '<resource2Id>', '<keyId>', { method: 'GET' })
  show(resourceId, resource2Id, keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(
      this,
      `${url(this.resourceType, resourceId, this.resource2Type, resource2Id)}/${kId}`,
    );
  }

  @api('<resourceId>', '<resource2Id>', '<keyId>', { method: 'DELETE' })
  remove(resourceId, resource2Id, keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(
      this,
      `${url(this.resourceType, resourceId, this.resource2Type, resource2Id)}/${kId}`,
    );
  }
}

export default ResourceVariables;
