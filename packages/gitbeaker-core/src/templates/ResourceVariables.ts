import {
  BaseService,
  RequestHelper,
  BaseServiceOptions,
  PaginatedRequestOptions,
} from '../infrastructure';

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
    super({ url: resourceType, ...options });
  }

  all(
    resourceId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema[]> {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/variables`, options) as Promise<
      ResourceVariableSchema[]
    >;
  }

  create(
    resourceId: string | number,
    options?: ResourceVariableSchemaCamelized,
  ): Promise<ResourceVariableSchema> {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/variables`, options) as Promise<ResourceVariableSchema>;
  }

  edit(
    resourceId: string | number,
    keyId: string,
    options?: ResourceVariableSchemaCamelizedNoKey,
  ): Promise<ResourceVariableSchema> {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/variables/${kId}`, options) as Promise<
      ResourceVariableSchema
    >;
  }

  show(
    resourceId: string | number,
    keyId: string,
    options?: PaginatedRequestOptions,
  ): Promise<ResourceVariableSchema> {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/variables/${kId}`, options) as Promise<
      ResourceVariableSchema
    >;
  }

  remove(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/variables/${kId}`, options);
  }
}
