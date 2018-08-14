import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

class ResourceCustomAttributes extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
  }

  @api('<resourceId>', { method: 'GET' })
  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/custom_attributes`);
  }

  @api('<resourceId>', '<customAttributeId>', '<value>', { method: 'PUT' })
  set(resourceId, customAttributeId, value) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/custom_attributes/${cId}`, {
      value,
    });
  }

  @api('<resourceId>', '<customAttributeId>', { method: 'DELETE' })
  remove(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/custom_attributes/${cId}`);
  }

  @api('<resourceId>', '<customAttributeId>', { method: 'GET' })
  show(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/custom_attributes/${cId}`);
  }
}

export default ResourceCustomAttributes;
