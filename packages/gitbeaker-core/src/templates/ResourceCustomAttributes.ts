import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

export interface CustomAttributeSchema extends Record<string, unknown> {
  key: string;
  value: string;
}

export class ResourceCustomAttributes extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<CustomAttributeSchema[]>()(this, `${rId}/custom_attributes`, options);
  }

  set(resourceId: string | number, customAttributeId: number, value: string, options?: Sudo) {
    const [rId, cId] = [resourceId, customAttributeId].map(encodeURIComponent);

    return RequestHelper.put<CustomAttributeSchema>()(this, `${rId}/custom_attributes/${cId}`, {
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

    return RequestHelper.get<CustomAttributeSchema>()(
      this,
      `${rId}/custom_attributes/${cId}`,
      options,
    );
  }
}
