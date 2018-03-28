import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';

class ResourceVariables extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/variables`);
  }

  create(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/variables`, options);
  }

  edit(resourceId, keyId, options) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/variables/${kId}`, options);
  }

  show(resourceId, keyId) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/variables/${kId}`);
  }

  remove(resourceId, keyId) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/variables/${kId}`);
  }
}

export default ResourceVariables;
