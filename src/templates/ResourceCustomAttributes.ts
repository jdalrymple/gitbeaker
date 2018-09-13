import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

export type CustomAttributeId = string | number;
class ResourceCustomAttributes extends BaseService {
  constructor(resourceType: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId: string) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/custom_attributes`);
  }

  set(resourceId: ResourceId, customAttributeId: CustomAttributeId, value: string) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/custom_attributes/${cId}`, {
      value,
    });
  }

  remove(resourceId: ResourceId, customAttributeId: CustomAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/custom_attributes/${cId}`);
  }

  show(resourceId: ResourceId, customAttributeId: CustomAttributeId) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/custom_attributes/${cId}`);
  }
}

export default ResourceCustomAttributes;
