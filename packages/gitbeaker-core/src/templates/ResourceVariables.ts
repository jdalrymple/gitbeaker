import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions } from '../infrastructure';
import { ResourceVariableSchema } from '../models';

export class ResourceVariables<C extends boolean> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<ResourceVariableSchema[]>()(this, `${rId}/variables`, options);
  }

  create(resourceId: string | number, options?: ResourceVariableSchema) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<ResourceVariableSchema>()(this, `${rId}/variables`, options);
  }

  edit(resourceId: string | number, keyId: string, options?: Omit<ResourceVariableSchema, 'key'>) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put<ResourceVariableSchema>()(this, `${rId}/variables/${kId}`, options);
  }

  show(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get<ResourceVariableSchema>()(this, `${rId}/variables/${kId}`, options);
  }

  remove(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/variables/${kId}`, options);
  }
}
