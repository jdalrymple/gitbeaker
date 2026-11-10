import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface LicenseSchema extends Record<string, unknown> {
  id: number;
  plan: string;
  created_at: string;
  starts_at: string;
  expires_at: string;
  historical_max: number;
  maximum_user_count: number;
  expired: boolean;
  overage: number;
  user_limit: number;
  active_users?: number;
  licensee: {
    Name: string;
    Email: string;
    Company: string;
  };
  add_ons: Record<string, number>;
}

export class License<C extends boolean = false> extends BaseResource<C> {
  add<E extends boolean = false>(
    license: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LicenseSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<LicenseSchema>()(this, 'license', {
      sudo,
      showExpanded,
      searchParams: { license },
      body,
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LicenseSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<LicenseSchema[]>()(this, 'licenses', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  show<E extends boolean = false>(
    licenseId?: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LicenseSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};
    const url = getPrefixedUrl('license', { license: licenseId });

    return RequestHelper.get<LicenseSchema>()(this, url, { sudo, showExpanded });
  }

  remove<E extends boolean = false>(
    licenceId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`license/${licenceId}`, { sudo, showExpanded });
  }

  exportUsage<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(this, 'license/usage_export.csv', { sudo, showExpanded });
  }

  recalculateBillableUsers<E extends boolean = false>(
    licenceId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ success: boolean }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<{ success: boolean }>()(
      this,
      endpoint`license/${licenceId}/refresh_billable_users`,
      { sudo, showExpanded },
    );
  }
}
