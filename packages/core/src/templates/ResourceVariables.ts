import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, endpoint } from '../infrastructure';

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
    return RequestHelper.get<VariableSchema[]>()(this, endpoint`${resourceId}/variables`, options);
  }

  create(resourceId: string | number, options?: VariableSchema) {
    return RequestHelper.post<VariableSchema>()(this, endpoint`${resourceId}/variables`, options);
  }

  edit(resourceId: string | number, keyId: string, options?: Omit<VariableSchema, 'key'>) {
    return RequestHelper.put<VariableSchema>()(
      this,
      endpoint`${resourceId}/variables/${keyId}`,
      options,
    );
  }

  show(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    return RequestHelper.get<VariableSchema>()(
      this,
      endpoint`${resourceId}/variables/${keyId}`,
      options,
    );
  }

  remove(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    return RequestHelper.del()(this, endpoint`${resourceId}/variables/${keyId}`, options);
  }
}
