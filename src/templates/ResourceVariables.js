import { BaseService, RequestHelper } from '../infrastructure';

class ResourceVariables extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/s`);
  }

  create(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${this.resourceType}/${rId}/s`, options);
  }

  edit(resourceId, keyId, options) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put(this, `${this.resourceType}/${rId}/s/${kId}`, options);
  }

  show(resourceId, keyId) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/s/${kId}`);
  }

  remove(resourceId, keyId) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${this.resourceType}/${rId}/s/${kId}`);
  }
}

export default ResourceVariables;
