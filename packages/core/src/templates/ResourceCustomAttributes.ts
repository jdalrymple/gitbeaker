import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { endpoint, PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

export interface CustomAttributeSchema extends Record<string, unknown> {
  key: string;
  value: string;
}

export class ResourceCustomAttributes<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<CustomAttributeSchema[]>()(
      this,
      endpoint`${resourceId}/custom_attributes`,
      options,
    );
  }

  set(resourceId: string | number, customAttributeId: string, value: string, options?: Sudo) {
    return RequestHelper.put<CustomAttributeSchema>()(
      this,
      endpoint`${resourceId}/custom_attributes/${customAttributeId}`,
      {
        value,
        ...options,
      },
    );
  }

  remove(resourceId: string | number, customAttributeId: string, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/custom_attributes/${customAttributeId}`,
      options,
    );
  }

  show(resourceId: string | number, customAttributeId: string, options?: Sudo) {
    return RequestHelper.get<CustomAttributeSchema>()(
      this,
      endpoint`${resourceId}/custom_attributes/${customAttributeId}`,
      options,
    );
  }
}
