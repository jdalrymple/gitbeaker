import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Camelize } from '../infrastructure';

export interface ResourceVariableSchemaDefault {
  variable_type: 'env_var' | 'file';
  value: string;
  protected: boolean;
  masked: boolean;
  environment_scope?: string; // Environment scope is only available for projects.
  key: string;
}

export type ResourceVariableSchema<C> = C extends true
  ? Camelize<ResourceVariableSchemaDefault>
  : ResourceVariableSchemaDefault;

export class ResourceVariables<C extends boolean> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<C, ResourceVariableSchema<C>[]>(this, `${rId}/variables`, options);
  }

  create(resourceId: string | number, options?: ResourceVariableSchema<true>) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<C, ResourceVariableSchema<C>>(this, `${rId}/variables`, options);
  }

  edit(
    resourceId: string | number,
    keyId: string,
    options?: Exclude<ResourceVariableSchema<true>, 'key'>,
  ) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.put<C, ResourceVariableSchema<C>>(
      this,
      `${rId}/variables/${kId}`,
      options,
    );
  }

  show(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.get<C, ResourceVariableSchema<C>>(
      this,
      `${rId}/variables/${kId}`,
      options,
    );
  }

  remove(resourceId: string | number, keyId: string, options?: PaginatedRequestOptions) {
    const [rId, kId] = [resourceId, keyId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/variables/${kId}`, options);
  }
}
