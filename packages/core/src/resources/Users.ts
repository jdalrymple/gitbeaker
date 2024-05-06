import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  AllOrNone,
  AsAdmin,
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
  avatar?: { content: Blob; filepath?: string };
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
    return RequestHelper.post<void>()(this, endpoint`users/${userId}/activate`, options);
  }

  all<A extends boolean = false, E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { withCustomAttributes: true } & AsAdmin<A> &
      AllUsersOptions &
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
    options?: AllUsersOptions & AsAdmin<A> & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<(A extends false ? SimpleUserSchema : AdminUserSchema)[], C, E, P>>;

  all<A extends boolean = false, E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllUsersOptions & AsAdmin<A> & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<(A extends false ? SimpleUserSchema : AdminUserSchema)[], C, E, P>> {
    return RequestHelper.get<(A extends false ? SimpleUserSchema : AdminUserSchema)[]>()(
      this,
      'users',
      options,
    );
  }

  allActivities<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { from?: string } & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserActivitySchema[], C, E, P>> {
    return RequestHelper.get<UserActivitySchema[]>()(this, 'user/activities', options);
  }

  allEvents<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: AllEventOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<EventSchema[]>()(this, endpoint`users/${userId}/events`, options);
  }

  allFollowers<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, P>> {
    return RequestHelper.get<SimpleUserSchema[]>()(
      this,
      endpoint`users/${userId}/followers`,
      options,
    );
  }

  allFollowing<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, P>> {
    return RequestHelper.get<SimpleUserSchema[]>()(
      this,
      endpoint`users/${userId}/following`,
      options,
    );
  }

  allMemberships<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: { type?: 'Project' | 'Namespace' } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserMembershipSchema[], C, E, P>> {
    return RequestHelper.get<UserMembershipSchema[]>()(
      this,
      endpoint`users/${userId}/memberships`,
      options,
    );
  }

  allProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      Sudo &
      ShowExpanded<E> & { simple: true },
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options: PaginationRequestOptions<P> &
      AllUserProjectsOptions &
      Sudo &
      ShowExpanded<E> & { statistics: true },
  ): Promise<
    GitlabAPIResponse<(ProjectSchema & { statistics: ProjectStatisticsSchema })[], C, E, P>
  >;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    userId: string | number,
    options?: PaginationRequestOptions<P> & AllUserProjectsOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: string | number,
    options?: AllUserProjectsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>> {
    return RequestHelper.get<ProjectSchema[]>()(this, endpoint`users/${userId}/projects`, options);
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
    return RequestHelper.get<ProjectSchema[]>()(
      this,
      endpoint`users/${userId}/contributed_projects`,
      options,
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
    return RequestHelper.get<ProjectSchema[]>()(
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

  create<E extends boolean = false>(
    options?: CreateUserOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedUserSchema, C, E, void>> {
    return RequestHelper.post<ExpandedUserSchema>()(this, 'users', options);
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

  createCIRunner<E extends boolean = false>(
    runnerType: 'instance_type' | 'group_type' | 'project_type',
    options?: CreateUserCIRunnerOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserRunnerSchema, C, E, void>> {
    return RequestHelper.post<UserRunnerSchema>()(this, 'user/runners', {
      ...options,
      runnerType,
    });
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

  edit<E extends boolean = false>(
    userId: number,
    options?: EditUserOptions & Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.put<ExpandedUserSchema>()(this, endpoint`users/${userId}`, options);
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
    return RequestHelper.put<UserPreferenceSchema>()(this, 'user/preferences', {
      viewDiffsFileByFile,
      showWhitespaceInDiffs,
      ...options,
    });
  }

  follow<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleUserSchema, C, E, void>> {
    return RequestHelper.post<SimpleUserSchema>()(this, endpoint`users/${userId}/follow`, options);
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

  show<A extends boolean = false, E extends boolean = false>(
    userId: number,
    options?: AsAdmin<A> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<A extends false ? UserSchema : AdminUserSchema, C, E, void>> {
    return RequestHelper.get<A extends false ? UserSchema : AdminUserSchema>()(
      this,
      endpoint`users/${userId}`,
      options,
    );
  }

  showCount<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserCountSchema, C, E, void>> {
    return RequestHelper.get<UserCountSchema>()(this, 'user_counts', options);
  }

  showAssociationsCount<E extends boolean = false>(
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserAssociationCountSchema, C, E, void>> {
    return RequestHelper.get<UserAssociationCountSchema>()(
      this,
      `users/${userId}/associations_count`,
      options,
    );
  }

  showCurrentUser<A extends boolean = false, E extends boolean = false>(
    options?: AsAdmin<A> & Sudo & ShowExpanded<E>,
  ): Promise<
    GitlabAPIResponse<A extends false ? ExpandedUserSchema : AdminUserSchema, C, E, void>
  > {
    return RequestHelper.get<A extends false ? ExpandedUserSchema : AdminUserSchema>()(
      this,
      'user',
      options,
    );
  }

  showCurrentUserPreferences<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserPreferenceSchema, C, E, void>> {
    return RequestHelper.get<UserPreferenceSchema>()(this, 'user/preferences', options);
  }

  showStatus<E extends boolean = false>({
    iDOrUsername,
    ...options
  }: { iDOrUsername?: string | number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<UserStatusSchema, C, E, void>
  > {
    let url: string;

    if (iDOrUsername) url = `users/${iDOrUsername}/status`;
    else url = 'user/status';

    return RequestHelper.get<UserStatusSchema>()(this, url, options);
  }

  remove<E extends boolean = false>(
    userId: number,
    options?: { hardDelete?: boolean } & Sudo & ShowExpanded<E>,
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
