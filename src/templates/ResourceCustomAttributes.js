import { BaseService, RequestHelper } from '../infrastructure';

export class ResourceCustomAttributes extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(
      this,
      `${this.resourceType}/${rId}/custom_attributes`,
    );
  }

  set(resourceId, customAttributeId, value) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `${this.resourceType}/${rId}/custom_attributes/${cId}`,
      { value },
    );
  }

  remove(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.delete(
      this,
      `${this.resourceType}/${rId}/custom_attributes/${cId}`,
    );
  }

  show(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `${this.resourceType}/${rId}/custom_attributes/${cId}`,
    );
  }
}

export default ResourceCustomAttributes;
