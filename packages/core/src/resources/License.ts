import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LicenseSchema, C, E, void>> {
    return RequestHelper.post<LicenseSchema>()(this, 'license', {
      searchParams: { license },
      ...options,
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<LicenseSchema[], C, E, P>> {
    return RequestHelper.get<LicenseSchema[]>()(this, 'licenses', options);
  }

  show<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LicenseSchema, C, E, void>> {
    return RequestHelper.get<LicenseSchema>()(this, 'license', options);
  }

  remove<E extends boolean = false>(
    licenceId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LicenseSchema, C, E, void>> {
    return RequestHelper.del<LicenseSchema>()(this, `license/${licenceId}`, options);
  }
}
