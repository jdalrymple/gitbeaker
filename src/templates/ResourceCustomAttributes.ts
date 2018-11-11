import { BaseService, RequestHelper } from '../infrastructure';

class ResourceCustomAttributes extends BaseService {
  constructor(resourceType, baseParams) {
    super({ url: resourceType, ...baseParams });
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/custom_attributes`);
  }

  set(resourceId, customAttributeId, value) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/custom_attributes/${cId}`, {
      value,
    });
  }

  remove(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/custom_attributes/${cId}`);
  }

  show(resourceId, customAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/custom_attributes/${cId}`);
  }
}

export default ResourceCustomAttributes;
