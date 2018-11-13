import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
  ResourceId,
  ResourceType,
  CustomAttributeId,
} from '@src/types';

class ResourceCustomAttributes extends BaseService {
  constructor(resourceType: ResourceType, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  all(resourceId: ResourceId, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/custom_attributes`, options);
  }

  set(resourceId: ResourceId, customAttributeId: CustomAttributeId, value: string, options?: Sudo) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/custom_attributes/${cId}`, {
      value,
      ...options,
    });
  }

  remove(resourceId: ResourceId, customAttributeId: CustomAttributeId, options?: Sudo) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/custom_attributes/${cId}`, options);
  }

  show(resourceId: ResourceId, customAttributeId: CustomAttributeId, options?: Sudo) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/custom_attributes/${cId}`, options);
  }
}

export default ResourceCustomAttributes;
