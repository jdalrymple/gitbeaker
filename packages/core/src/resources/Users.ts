import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestSearchParams,
  PaginationRequestSearchParams,
  RequestHelper,
  createFormData,
  endpoint,
  getPrefixedUrl,
} from '../infrastructure';
import type {
  AllOrNone,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ProjectSchema, ProjectStatisticsSchema, SimpleProjectSchema } from './Projects';
import type { AllEventOptions, EventSchema } from './Events';
import type { PersonalAccessTokenSchema } from './PersonalAccessTokens';
import type { CustomAttributeSchema } from '../templates/ResourceCustomAttributes';
import { AccessLevel } from '../constants';

export interface AsAdmin<A extends boolean = false> {
  asAdmin?: A;
}

export interface SimpleUserSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
  created_at: string;
}

export interface UserSchema extends SimpleUserSchema {
  locked: boolean | null;
  bio: string | null;
  bot: boolean | null;
  location: string | null;
  public_email: string | null;
  skype: string | null;
  linkedin: string | null;
  twitter: string | null;
  discord: string | null;
  website_url: string | null;
  pronouns: string | null;
  organization: string | null;
  job_title: string | null;
  work_information: string | null;
  followers: number | null;
  following: number | null;
  local_time: string | null;
  is_followed: boolean | null;
}

export interface ExpandedUserSchema extends UserSchema {
  is_admin: boolean | null;
  bot: boolean;
  last_sign_in_at: string;
  confirmed_at: string;
  last_activity_on: string;
  email: string;
  theme_id: number;
  color_scheme_id: number;
  projects_limit: number;
  current_sign_in_at: string | null;
  note: string | null;
  identities: { provider: string; extern_uid: string; saml_provider_id: number }[] | null;
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  external: boolean;
  private_profile: string | null;
  namespace_id: number | null;
  created_by: string | null;
}

export interface AdminUserSchema extends ExpandedUserSchema {
  current_sign_in_ip: string;
  last_sign_in_ip: string;
  using_license_seat: boolean | null;
  email_reset_offered_at: string | null;
  shared_runners_minutes_limit?: number | null;
  extra_shared_runners_minutes_limit?: number | null;
  is_auditor?: boolean | null;
  provisioned_by_group_id?: number | null;
  plan?: string;
  trial?: boolean;
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

export interface UserAssociationCountSchema extends Record<string, unknown> {
  groups_count: number;
  projects_count: number;
  issues_count: number;
  merge_requests_count: number;
}

export interface UserMembershipSchema extends Record<string, unknown> {
  source_id: number;
  source_name: string;
  source_type: 'Project' | 'Namespace';
  access_level: Exclude<AccessLevel, AccessLevel.ADMIN>;
}

export interface UserRunnerSchema extends Record<string, unknown> {
  id: number;
  token: string;
  token_expires_at: string | null;
}

export type AllUsersOptions = {
  orderBy?: 'name' | 'username' | 'created_at' | 'updated_at';
  createdBy?: string;
  sort?: 'asc' | 'desc';
  twoFactor?: string;
  withoutProjects?: boolean;
  admins?: boolean;
  samlProviderId?: number;
  skipLdap?: boolean;
  search?: string;
  username?: string;
  active?: boolean;
  blocked?: boolean;
  external?: boolean;
  excludeInternal?: boolean;
  excludeExternal?: boolean;
  withoutProjectBots?: boolean;
  createdBefore?: string;
  createdAfter?: string;
  withCustomAttributes?: boolean;
  customAttributes?: Record<string, string>;
} & AllOrNone<{ provider: string; externUid: string }>;

export type CreateUserOptions = {
  admin?: boolean;
  auditor?: boolean;
  avatar?: { content: Blob; filename?: string };
  bio?: string;
  canCreateGroup?: boolean;
  colorSchemeId?: number;
  commitEmail?: string;
  email?: string;
  externUid?: string;
  external?: boolean;
  extraSharedRunnersMinutesLimit?: number;
  forceRandomPassword?: boolean;
  groupIdForSaml?: number;
  linkedin?: string;
  location?: string;
  name?: string;
  note?: string;
  organization?: string;
  password?: string;
  privateProfile?: string;
  projectsLimit?: number;
  pronouns?: string;
  provider?: string;
  publicEmail?: string;
  resetPassword?: boolean;
  sharedRunnersMinutesLimit?: number;
  skipConfirmation?: boolean;
  skype?: string;
  themeId?: number;
  twitter?: string;
  discord?: string;
  username?: string;
  viewDiffsFileByFile?: boolean;
  websiteUrl?: string;
};

export type EditUserOptions = CreateUserOptions;

export type CreateUserCIRunnerOptions = {
  groupId?: number;
  projectId?: number;
  description?: string;
  paused?: boolean;
  locked?: boolean;
  runUntagged?: boolean;
  tagList?: string[];
  accessLevel?: 'not_protected' | 'ref_protected';
  maximumTimeout?: number;
  maintenanceNote?: string;
};

export type AllUserProjectsOptions = {
  archived?: boolean;
  idAfter?: number;
  idBefore?: number;
  membership?: boolean;
  minAccessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
  orderBy?: 'id' | 'name' | 'path' | 'created_at' | 'updated_at' | 'last_activity_at';
  owned?: boolean;
  search?: string;
  simple?: boolean;
  sort?: 'asc' | 'desc';
  starred?: boolean;
  statistics?: boolean;
  visibility?: 'public' | 'internal' | 'private';
  withCustomAttributes?: boolean;
  withIssuesEnabled?: boolean;
  withMergeRequestsEnabled?: boolean;
  withProgrammingLanguage?: string;
  updatedBefore?: string;
  updatedAfter?: string;
};

export class Users<C extends boolean = false> extends BaseResource<C> {
  activate<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`users/${userId}/activate`, {
      sudo,
      showExpanded,
    });
  }

  all<A extends boolean = false, E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { withCustomAttributes: true } & AsAdmin<A> &
      AllUsersOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<
    GitlabAPIResponse<
      ((A extends false ? SimpleUserSchema : AdminUserSchema) & {
        custom_attributes: CustomAttributeSchema[];
      })[],
      C,
      E,
      P
    >
  >;

  all<A extends boolean = false, E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllUsersOptions &
      BaseRequestSearchParams &
      AsAdmin<A> &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<(A extends false ? SimpleUserSchema : AdminUserSchema)[], C, E, P>>;

  all<A extends boolean = false, E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllUsersOptions &
      BaseRequestSearchParams &
      AsAdmin<A> &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<(A extends false ? SimpleUserSchema : AdminUserSchema)[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<(A extends false ? SimpleUserSchema : AdminUserSchema)[]>()(
      this,
      'users',
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> &
          AllUsersOptions &
          BaseRequestSearchParams,
      },
    );
  }

  allActivities<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> &
      BaseRequestSearchParams & { from?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserActivitySchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<UserActivitySchema[]>()(this, 'user/activities', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  allEvents<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: AllEventOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ) {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<EventSchema[]>()(this, endpoint`users/${userId}/events`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  allFollowers<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SimpleUserSchema[]>()(this, endpoint`users/${userId}/followers`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  allFollowing<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SimpleUserSchema[]>()(this, endpoint`users/${userId}/following`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  allMemberships<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> &
      BaseRequestSearchParams & { type?: 'Project' | 'Namespace' } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserMembershipSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<UserMembershipSchema[]>()(
      this,
      endpoint`users/${userId}/memberships`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
      },
    );
  }

  allProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E> & { simple: true },
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E> & { statistics: true },
  ): Promise<
    GitlabAPIResponse<(ProjectSchema & { statistics: ProjectStatisticsSchema })[], C, E, P>
  >;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options?: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: string | number,
    options?: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProjectSchema[]>()(this, endpoint`users/${userId}/projects`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> &
        AllUserProjectsOptions &
        BaseRequestSearchParams,
    });
  }

  allContributedProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      Sudo &
      ShowExpanded<E> & { simple: true },
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, P>>;

  allContributedProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      Sudo &
      ShowExpanded<E> & { statistics: true },
  ): Promise<
    GitlabAPIResponse<(ProjectSchema & { statistics: ProjectStatisticsSchema })[], C, E, P>
  >;

  allContributedProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options?: PaginationRequestOptions<P> & AllUserProjectsOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  allContributedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: string | number,
    options?: AllUserProjectsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProjectSchema[]>()(
      this,
      endpoint`users/${userId}/contributed_projects`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
      },
    );
  }

  // Convenience method - Functionality already present in the all method in the Projects wrapper
  allStarredProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      Sudo &
      ShowExpanded<E> & { simple: true },
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, P>>;

  allStarredProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      Sudo &
      ShowExpanded<E> & { statistics: true },
  ): Promise<
    GitlabAPIResponse<(ProjectSchema & { statistics: ProjectStatisticsSchema })[], C, E, P>
  >;

  allStarredProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options?: PaginationRequestOptions<P> & AllUserProjectsOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  allStarredProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: string | number,
    options?: AllUserProjectsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProjectSchema[]>()(this, endpoint`users/${userId}/starred_projects`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
    });
  }

  approve<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<{ message: string }>()(this, endpoint`users/${userId}/approve`, {
      sudo,
      showExpanded,
    });
  }

  ban<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`users/${userId}/ban`, {
      sudo,
      showExpanded,
    });
  }

  block<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`users/${userId}/block`, {
      sudo,
      showExpanded,
    });
  }

  create<E extends boolean = false>(
    options?: CreateUserOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedUserSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedUserSchema>()(this, 'users', {
      sudo,
      showExpanded,
      body,
    });
  }

  createPersonalAccessToken<E extends boolean = false>(
    userId: number,
    name: string,
    scopes: string[],
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PersonalAccessTokenSchema>()(
      this,
      endpoint`users/${userId}/personal_access_tokens`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
          scopes,
        },
      },
    );
  }

  createCIRunner<E extends boolean = false>(
    runnerType: 'instance_type' | 'group_type' | 'project_type',
    options?: CreateUserCIRunnerOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserRunnerSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<UserRunnerSchema>()(this, 'user/runners', {
      sudo,
      showExpanded,
      body: {
        ...body,
        runnerType,
      },
    });
  }

  deactivate<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`users/${userId}/deactivate`, {
      sudo,
      showExpanded,
    });
  }

  disableTwoFactor<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.patch<void>()(this, endpoint`users/${userId}/disable_two_factor`, {
      sudo,
      showExpanded,
    });
  }

  edit<E extends boolean = false>(
    userId: number,
    { avatar, ...options }: EditUserOptions & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<ExpandedUserSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options;

    return RequestHelper.put<ExpandedUserSchema>()(this, endpoint`users/${userId}`, {
      sudo,
      showExpanded,
      body: avatar
        ? createFormData({
            ...body,
            avatar: [avatar.content, avatar.filename],
          })
        : body,
    });
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
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<UserStatusSchema>()(this, 'user/status', {
      sudo,
      showExpanded,
      body,
    });
  }

  editCurrentUserPreferences<E extends boolean = false>(
    viewDiffsFileByFile: boolean,
    showWhitespaceInDiffs: boolean,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserPreferenceSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<UserPreferenceSchema>()(this, 'user/preferences', {
      sudo,
      showExpanded,
      body: {
        ...body,
        viewDiffsFileByFile,
        showWhitespaceInDiffs,
      },
    });
  }

  follow<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleUserSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<SimpleUserSchema>()(this, endpoint`users/${userId}/follow`, {
      sudo,
      showExpanded,
    });
  }

  reject<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<{ message: string }>()(this, endpoint`users/${userId}/reject`, {
      sudo,
      showExpanded,
    });
  }

  show<A extends boolean = false, E extends boolean = false>(
    userId: number,
    options?: AsAdmin<A> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<A extends false ? UserSchema : AdminUserSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<A extends false ? UserSchema : AdminUserSchema>()(
      this,
      endpoint`users/${userId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showCount<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserCountSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UserCountSchema>()(this, 'user_counts', {
      sudo,
      showExpanded,
    });
  }

  showAssociationsCount<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserAssociationCountSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UserAssociationCountSchema>()(
      this,
      `users/${userId}/associations_count`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showCurrentUser<A extends boolean = false, E extends boolean = false>(
    options?: AsAdmin<A> & Sudo & ShowExpanded<E>,
  ): Promise<
    GitlabAPIResponse<A extends false ? ExpandedUserSchema : AdminUserSchema, C, E, void>
  > {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<A extends false ? ExpandedUserSchema : AdminUserSchema>()(
      this,
      'user',
      {
        sudo,
        showExpanded,
      },
    );
  }

  showCurrentUserPreferences<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserPreferenceSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UserPreferenceSchema>()(this, 'user/preferences', {
      sudo,
      showExpanded,
    });
  }

  showStatus<E extends boolean = false>({
    iDOrUsername,
    ...options
  }: { iDOrUsername?: string | number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<UserStatusSchema, C, E, void>
  > {
    const { sudo, showExpanded } = options || {};
    const url = getPrefixedUrl('status', { users: iDOrUsername, user: !iDOrUsername });

    return RequestHelper.get<UserStatusSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    userId: number,
    options?: { hardDelete?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`users/${userId}`, {
      sudo,
      showExpanded,
    });
  }

  removeAuthenticationIdentity<E extends boolean = false>(
    userId: number,
    provider: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`users/${userId}/identities/${provider}`, {
      sudo,
      showExpanded,
    });
  }

  unban<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`users/${userId}/unban`, {
      sudo,
      showExpanded,
    });
  }

  unblock<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`users/${userId}/unblock`, {
      sudo,
      showExpanded,
    });
  }

  unfollow<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserSchema>()(this, endpoint`users/${userId}/unfollow`, {
      sudo,
      showExpanded,
    });
  }
}
