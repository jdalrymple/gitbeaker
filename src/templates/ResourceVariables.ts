import { BaseService, RequestHelper } from '../infrastructure';

const url = (resourceId, resource2Type, resource2Id) => {
  const [rId, r2Id] = [resourceId, resource2Id].map(encodeURIComponent);
  const output = [rId];

  if (resource2Id) output.push(resource2Type, r2Id);

  output.push('variables');

  return output.join('/');
};

class ResourceVariables extends BaseService {
  protected resourceType: temporaryAny;
  protected resource2Type: temporaryAny;

  constructor(resourceType, resource2Type, baseParams) {
    super(baseParams);

    this.url = [this.url, resourceType].join('/');
    this.resource2Type = resource2Type;
  }

  all(resourceId, resource2Id) {
    return RequestHelper.get(
      this,
      url(resourceId, this.resource2Type, resource2Id),
    );
  }

  create(resourceId, resource2Id, options) {
    return RequestHelper.post(
      this,
      url(resourceId, this.resource2Type, resource2Id),
      options,
    );
  }

  edit(resourceId, resource2Id, keyId, options) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.put(
      this,
      `${url(resourceId, this.resource2Type, resource2Id)}/${kId}`,
      options,
    );
  }

  show(resourceId, resource2Id, keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(
      this,
      `${url(resourceId, this.resource2Type, resource2Id)}/${kId}`,
    );
  }

  remove(resourceId, resource2Id, keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(
      this,
      `${url(resourceId, this.resource2Type, resource2Id)}/${kId}`,
    );
  }
}

export default ResourceVariables;
