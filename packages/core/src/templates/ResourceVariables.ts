import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions } from '../infrastructure';

export interface VariableSchema extends Record<string, unknown> {
  variable_type: 'env_var' | 'file';
  value: string;
  protected: boolean;
  masked: boolean;
  environment_scope?: string; // Environment scope is only available for projects.
  key: string;
}

export class ResourceVariables<C extends boolean> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<VariableSchema[]>()(this, `${rId}/variables`, options);
  }

  create(resourceId: string | number, options?: VariableSchema) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<VariableSchema>()(this, `${rId}/variables`, options);
  }

  edit(resourceId: string | number, keyId: string, options?: Omit<VariableSchema, 'key'>) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put<VariableSchema>()(this, `${rId}/variables/${kId}`, options);
  }

  show(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get<VariableSchema>()(this, `${rId}/variables/${kId}`, options);
  }

  remove(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/variables/${kId}`, options);
  }
}
