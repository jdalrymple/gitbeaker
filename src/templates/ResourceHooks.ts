import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';

class ResourceHooks extends BaseService {
  constructor(resourceType, baseParams) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/hooks`, options);
  }

  show(resourceId, hookId) {
    const [rId, hId] = [resourceId, hookId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/hooks/${hId}`);
  }

  add(resourceId, url, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/hooks`, { url, ...options });
  }

  edit(resourceId, hookId, url, options) {
    const [rId, hId] = [resourceId, hookId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/hooks/${hId}`, { url, ...options });
  }

  remove(resourceId, hookId) {
    const [rId, hId] = [resourceId, hookId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/hooks/${hId}`);
  }
}

export default ResourceHooks;
