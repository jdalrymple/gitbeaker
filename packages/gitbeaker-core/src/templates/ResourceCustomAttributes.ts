import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

export class ResourceCustomAttributes<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get()(this, `${rId}/custom_attributes`, options);
  }

  set(resourceId: string | number, customAttributeId: number, value: string, options?: Sudo) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.put()(this, `${rId}/custom_attributes/${cId}`, {
      value,
      ...options,
    });
  }

  remove(resourceId: string | number, customAttributeId: number, options?: Sudo) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/custom_attributes/${cId}`, options);
  }

  show(resourceId: string | number, customAttributeId: number, options?: Sudo) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.get()(this, `${rId}/custom_attributes/${cId}`, options);
  }
}
