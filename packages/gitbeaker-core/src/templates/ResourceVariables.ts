import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions } from '../infrastructure';

export interface ResourceVariableSchemaDefault {
  variable_type: 'env_var' | 'file';
  value: string;
  protected: boolean;
  masked: boolean;
  environment_scope?: string; // Environment scope is only available for projects.
  key: string;
}

export interface ResourceVariableSchemaCamelizedNoKey {
  variableType: 'env_var' | 'file';
  value: string;
  protected: boolean;
  masked: boolean;
  environmentScope?: string;
}

export interface ResourceVariableSchemaCamelized extends ResourceVariableSchemaCamelizedNoKey {
  key: string;
}

export type ResourceVariableSchema =
  | ResourceVariableSchemaDefault
  | ResourceVariableSchemaCamelized;

export class ResourceVariables<C extends boolean> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<C, ResourceVariableSchema[]>(this, `${rId}/variables`, options);
  }

  create(resourceId: string | number, options?: ResourceVariableSchemaCamelized) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<C, ResourceVariableSchema>(this, `${rId}/variables`, options);
  }

  edit(resourceId: string | number, keyId: string, options?: ResourceVariableSchemaCamelizedNoKey) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put<C, ResourceVariableSchema>(this, `${rId}/variables/${kId}`, options);
  }

  show(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get<C, ResourceVariableSchema>(this, `${rId}/variables/${kId}`, options);
  }

  remove(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/variables/${kId}`, options);
  }
}
