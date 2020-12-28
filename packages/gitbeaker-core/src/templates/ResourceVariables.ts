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

export class ResourceVariables extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<ResourceVariableSchema[]>(this, `${rId}/variables`, options);
  }

  create(resourceId: string | number, options?: ResourceVariableSchemaCamelized) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<ResourceVariableSchema>(this, `${rId}/variables`, options);
  }

  edit(resourceId: string | number, keyId: string, options?: ResourceVariableSchemaCamelizedNoKey) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put<ResourceVariableSchema>(this, `${rId}/variables/${kId}`, options);
  }

  show(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get<ResourceVariableSchema>(this, `${rId}/variables/${kId}`, options);
  }

  remove(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/variables/${kId}`, options);
  }
}
