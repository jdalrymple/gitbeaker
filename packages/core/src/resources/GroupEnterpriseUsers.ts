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

import { RequestHelper, endpoint } from '../infrastructure';

export interface GroupEnterpriseUserIdentitySchema extends Record<string, unknown> {
  provider: string;
  extern_uid: string;
  saml_provider_id: number;
}

export interface GroupEnterpriseUserSCIMIdentitySchema extends Record<string, unknown> {
  extern_uid: string;
  group_id: number;
  active: boolean;
}

export interface GroupEnterpriseUserSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
  created_at: string;
  bio: string;
  location?: string | null;
  public_email: string;
  linkedin: string;
  twitter: string;
  website_url: string;
  organization?: string | null;
  job_title: string;
  pronouns?: string | null;
  bot: boolean;
  work_information?: string | null;
  followers: number;
  following: number;
  local_time?: string | null;
  last_sign_in_at?: string | null;
  confirmed_at: string;
  last_activity_on?: string | null;
  email: string;
  theme_id: number;
  color_scheme_id: number;
  projects_limit: number;
  current_sign_in_at?: string | null;
  identities: GroupEnterpriseUserIdentitySchema[];
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  external: boolean;
  private_profile: boolean;
  commit_email: string;
  shared_runners_minutes_limit?: number | null;
  extra_shared_runners_minutes_limit?: number | null;
  scim_identities: GroupEnterpriseUserSCIMIdentitySchema[];
}

export interface GroupEnterpriseUserListOptions extends BaseRequestSearchParams {
  username?: string;
  search?: string;
  active?: boolean;
  blocked?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  twoFactor?: 'enabled' | 'disabled';
}

export interface GroupEnterpriseUserEditOptions {
  name?: string;
  email?: string;
}

export class GroupEnterpriseUsers<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: GroupEnterpriseUserListOptions & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupEnterpriseUserSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GroupEnterpriseUserSchema[]>()(
      this,
      endpoint`groups/${groupId}/enterprise_users`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as GroupEnterpriseUserListOptions &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  show<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupEnterpriseUserSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupEnterpriseUserSchema>()(
      this,
      endpoint`groups/${groupId}/enterprise_users/${userId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: GroupEnterpriseUserEditOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupEnterpriseUserSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<GroupEnterpriseUserSchema>()(
      this,
      endpoint`groups/${groupId}/enterprise_users/${userId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: { hardDelete?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}/enterprise_users/${userId}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  disableTwoFactor<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.patch<void>()(
      this,
      endpoint`groups/${groupId}/enterprise_users/${userId}/disable_two_factor`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
