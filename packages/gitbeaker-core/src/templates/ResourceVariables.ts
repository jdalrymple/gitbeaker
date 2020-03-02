import {
  BaseService,
  RequestHelper,
  BaseServiceOptions,
  PaginatedRequestOptions,
} from '../infrastructure';

export interface BaseResourceVariableSchema {
  variable_type: 'env_var' | 'file';
  value: string;
  protected: boolean;
  masked: boolean;
  // Environment scope is only available for projects.
  environment_scope?: string;
}

export interface ResourceVariableSchema extends BaseResourceVariableSchema {
  key: string;
}

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
    options?: ResourceVariableSchema,
  ): Promise<ResourceVariableSchema> {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/variables`, options) as Promise<ResourceVariableSchema>;
  }

  edit(
    resourceId: string | number,
    keyId: string,
    options?: BaseResourceVariableSchema,
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
