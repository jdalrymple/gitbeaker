import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ExpandedProjectSchema } from './Projects';
import type { EventOptions, EventSchema } from './Events';
import type { AccessLevel } from '../templates/types';
import type { PersonalAccessTokenSchema } from './PersonalAccessTokens';

export interface UserSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
  created_at?: string;
}

export interface ExpandedUserSchema extends UserSchema {
  bio?: string;
  location?: string;
  public_email: string;
  skype: string;
  linkedin: string;
  twitter: string;
  website_url: string;
  organization?: string;
  last_sign_in_at: string;
  confirmed_at: string;
  last_activity_on: string;
  email: string;
  theme_id: number;
  color_scheme_id: number;
  projects_limit: number;
  current_sign_in_at?: string;
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  external: boolean;
  private_profile?: string;
  current_sign_in_ip: string;
  last_sign_in_ip: string;
  shared_runners_minutes_limit?: number;
  extra_shared_runners_minutes_limit?: number;
  is_auditor?: boolean;
  using_license_seat?: boolean;
  identities?: { provider: string; extern_uid: string; saml_provider_id?: number }[];
  provisioned_by_group_id?: number;
}

export interface UserActivitySchema extends Record<string, unknown> {
  username: string;
  last_activity_on: string;
  last_activity_at: string;
}

export interface UserStatusSchema extends Record<string, unknown> {
  emoji: string;
  availability: string;
  message: string;
  message_html: string;
  clear_status_at: string;
}

export interface UserPreferenceSchema extends Record<string, unknown> {
  id: number;
  user_id: number;
  view_diffs_file_by_file: boolean;
  show_whitespace_in_diffs: boolean;
}

export interface UserCountSchema extends Record<string, unknown> {
  merge_requests: number;
  assigned_issues: number;
  assigned_merge_requests: number;
  review_requested_merge_requests: number;
  todos: number;
}

export interface UserMembershipSchema extends Record<string, unknown> {
  source_id: number;
  source_name: string;
  source_type: 'Project' | 'Namespace';
  access_level: AccessLevel;
}

export class Users<C extends boolean = false> extends BaseResource<C> {
  activate<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`users/${userId}/activate`, options);
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<(UserSchema | ExpandedUserSchema)[], C, E, P>> {
    return RequestHelper.get<(UserSchema | ExpandedUserSchema)[]>()(this, 'users', options);
  }

  allActivities<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<UserActivitySchema[], C, E, P>> {
    return RequestHelper.get<UserActivitySchema[]>()(this, 'user/activities', options);
  }

  allEvents<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E> & EventOptions,
  ) {
    return RequestHelper.get<EventSchema[]>()(this, endpoint`users/${userId}/events`, options);
  }

  allFollowers<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<UserSchema[], C, E, P>> {
    return RequestHelper.get<UserSchema[]>()(this, endpoint`users/${userId}/followers`, options);
  }

  allFollowing<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<UserSchema[], C, E, P>> {
    return RequestHelper.get<UserSchema[]>()(this, endpoint`users/${userId}/following`, options);
  }

  allMemberships<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: { type?: 'Project' | 'Namespace' } & PaginationRequestOptions<P> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<UserMembershipSchema[], C, E, P>> {
    return RequestHelper.get<UserMembershipSchema[]>()(
      this,
      endpoint`users/${userId}/memberships`,
      options,
    );
  }

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedProjectSchema[], C, E, P>> {
    return RequestHelper.get<ExpandedProjectSchema[]>()(
      this,
      endpoint`users/${userId}/projects`,
      options,
    );
  }

  // Convenience method - Functionality already present in the all method in the Projects wrapper
  allStarredProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedProjectSchema[], C, E, P>> {
    return RequestHelper.get<ExpandedProjectSchema[]>()(
      this,
      endpoint`users/${userId}/starred_projects`,
      options,
    );
  }

  approve<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`users/${userId}/approve`,
      options,
    );
  }

  ban<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`users/${userId}/ban`, options);
  }

  block<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`users/${userId}/block`, options);
  }

  deactivate<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`users/${userId}/deactivate`, options);
  }

  disableTwoFactor<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.patch<void>()(this, endpoint`users/${userId}/disable_two_factor`, options);
  }

  follow<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserSchema, C, E, void>> {
    return RequestHelper.post<UserSchema>()(this, endpoint`users/${userId}/follow`, options);
  }

  create<E extends boolean = false>(
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<UserSchema | ExpandedUserSchema, C, E, void>> {
    return RequestHelper.post<UserSchema>()(this, 'users', options);
  }

  createPersonalAccessToken<E extends boolean = false>(
    userId: number,
    name: string,
    scopes: string[],
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>> {
    return RequestHelper.post<PersonalAccessTokenSchema>()(
      this,
      endpoint`users/${userId}/personal_access_tokens`,
      {
        name,
        scopes,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(userId: number, options?: BaseRequestOptions<E>) {
    return RequestHelper.put<UserSchema>()(this, endpoint`users/${userId}`, options);
  }

  editStatus<E extends boolean = false>(
    options?: {
      emoji?: string;
      message?: string;
      clearStatusAfter?:
        | '30_minutes'
        | '3_hours'
        | '8_hours'
        | '1_day'
        | '3_days'
        | '7_days'
        | '30_days';
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserStatusSchema, C, E, void>> {
    return RequestHelper.put<UserStatusSchema>()(this, 'user/status', options);
  }

  editCurrentUserPreferences<E extends boolean = false>(
    viewDiffsFileByFile: boolean,
    showWhitespaceInDiffs: boolean,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserPreferenceSchema, C, E, void>> {
    return RequestHelper.get<UserPreferenceSchema>()(this, 'user/preferences', {
      viewDiffsFileByFile,
      showWhitespaceInDiffs,
      ...options,
    });
  }

  reject<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`users/${userId}/reject`,
      options,
    );
  }

  show<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserSchema | ExpandedUserSchema, C, E, void>> {
    return RequestHelper.get<UserSchema | ExpandedUserSchema>()(
      this,
      endpoint`users/${userId}`,
      options,
    );
  }

  showCounts<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserCountSchema, C, E, void>> {
    return RequestHelper.get<UserCountSchema>()(this, 'user_counts', options);
  }

  showCurrentUser<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedUserSchema, C, E, void>> {
    return RequestHelper.get<ExpandedUserSchema>()(this, 'user', options);
  }

  showCurrentUserPreferences<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserPreferenceSchema, C, E, void>> {
    return RequestHelper.get<UserPreferenceSchema>()(this, 'user/preferences', options);
  }

  showStatus<E extends boolean = false>(
    options?: { iDOrUsername?: string | number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserStatusSchema, C, E, void>> {
    let url: string;

    if (options?.iDOrUsername) url = `users/${options?.iDOrUsername}/status`;
    else url = 'user/status';

    return RequestHelper.get<UserStatusSchema>()(this, url, options);
  }

  remove<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`users/${userId}`, options);
  }

  removeAuthenticationIdentity<E extends boolean = false>(
    userId: number,
    provider: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`users/${userId}/identities/${provider}`, options);
  }

  unban<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`users/${userId}/unban`, options);
  }

  unblock<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`users/${userId}/unblock`, options);
  }

  unfollow<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserSchema, C, E, void>> {
    return RequestHelper.post<UserSchema>()(this, endpoint`users/${userId}/unfollow`, options);
  }
}
