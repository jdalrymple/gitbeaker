import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';

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
  active_users: number;
  licensee: {
    Name: string;
  };
  add_ons: {
    GitLab_FileLocks: number;
    GitLab_Auditor_User: number;
  };
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
      searchParams,
    });
  }

  show<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LicenseSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<LicenseSchema>()(this, 'license', { sudo, showExpanded });
  }

  remove<E extends boolean = false>(
    licenceId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LicenseSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<LicenseSchema>()(this, `license/${licenceId}`, { sudo, showExpanded });
  }

  recalculateBillableUsers<E extends boolean = false>(
    licenceId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ success: boolean }, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<{ success: boolean }>()(
      this,
      `license/${licenceId}/refresh_billable_users`,
      { sudo, showExpanded, body },
    );
  }
}
