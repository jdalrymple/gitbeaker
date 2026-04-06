import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface CustomAttributeSchema extends Record<string, unknown> {
  key: string;
  value: string;
}

export class ResourceCustomAttributes<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CustomAttributeSchema[]>()(
      this,
      endpoint`${resourceId}/custom_attributes`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
      },
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    customAttributeId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/custom_attributes/${customAttributeId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  set<E extends boolean = false>(
    resourceId: string | number,
    customAttributeId: string,
    value: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<CustomAttributeSchema>()(
      this,
      endpoint`${resourceId}/custom_attributes/${customAttributeId}`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          value,
        },
      },
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    customAttributeId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CustomAttributeSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<CustomAttributeSchema>()(
      this,
      endpoint`${resourceId}/custom_attributes/${customAttributeId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
