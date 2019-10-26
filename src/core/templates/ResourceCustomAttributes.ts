import {
  BaseService,
  BaseServiceOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { ResourceId, CustomAttributeId } from '..';

export class ResourceCustomAttributes extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
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

    return RequestHelper.del(this, `${rId}/custom_attributes/${cId}`, options);
  }

  show(resourceId: ResourceId, customAttributeId: CustomAttributeId, options?: Sudo) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/custom_attributes/${cId}`, options);
  }
}
