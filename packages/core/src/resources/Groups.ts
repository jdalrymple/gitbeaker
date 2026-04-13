import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CustomAttributeSchema } from '../templates/ResourceCustomAttributes';
import type { CondensedProjectSchema, ProjectSchema } from './Projects';
import type { SimpleUserSchema } from './Users';
import { BaseResource } from '@gitbeaker/requester-utils';
import { AccessLevel } from '../constants';
import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export interface GroupStatisticsSchema {
  storage_size: number;
  repository_size: number;
  wiki_size: number;
  lfs_objects_size: number;
  job_artifacts_size: number;
  pipeline_artifacts_size: number;
  packages_size: number;
  snippets_size: number;
  uploads_size: number;
}

export interface CondensedGroupSchema extends Record<string, unknown> {
  id: number;
  web_url: string;
  name: string;
}

export interface SimpleGroupSchema extends CondensedGroupSchema {
  avatar_url: string | null;
  full_name: string;
  full_path: string;
}

export interface GroupSchema extends SimpleGroupSchema {
  path: string;
  description: string;
  visibility: 'public' | 'internal' | 'private';
  share_with_group_lock: boolean;
  require_two_factor_authentication: boolean;
  two_factor_grace_period: number;
  project_creation_level: string;
  auto_devops_enabled?: boolean;
  subgroup_creation_level: string;
  emails_enabled?: boolean;
  mentions_disabled?: boolean;
  lfs_enabled: boolean;
  default_branch_protection: number;
  request_access_enabled: boolean;
  created_at: string;
  parent_id: number;
  ldap_cn?: string;
  ldap_access?: string;
  marked_for_deletion_on?: string;
  membership_lock?: boolean;
}

export interface ExpandedGroupSchema extends GroupSchema {
  runners_token: string;
  file_template_project_id: number;
  shared_with_groups:
    | {
        group_id: number;
        group_name: string;
        group_full_path: string;
        group_access_level: number;
      }[]
    | null;
  projects?: ProjectSchema[];
  shared_projects?: ProjectSchema[];
}

export type AllGroupsOptions = {
  skipGroups?: number[];
  allAvailable?: boolean;
  search?: string;
  orderBy?: 'name' | 'path' | 'id';
  sort?: 'asc' | 'desc';
  visibility?: 'public' | 'internal' | 'private';
  statistics?: boolean;
  withCustomAttributes?: boolean;
  owned?: boolean;
  minAccessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
  topLevelOnly?: boolean;
  markedForDeletionOn?: string;
  active?: boolean;
  archived?: boolean;
};

export type AllGroupProjectsOptions = {
  visibility?: 'public' | 'internal' | 'private';
  orderBy?:
    | 'id'
    | 'name'
    | 'path'
    | 'created_at'
    | 'updated_at'
    | 'similarity'
    | 'last_activity_at';
  topic?: string;
  sort?: 'asc' | 'desc';
  archived?: boolean;
  search?: string;
  simple?: boolean;
  owned?: boolean;
  starred?: boolean;
  withIssuesEnabled?: boolean;
  withMergeRequestsEnabled?: boolean;
  withShared?: boolean;
  includeSubgroups?: boolean;
  minAccessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
  withCustomAttributes?: boolean;
  withSecurityReports?: boolean;
};

export type CreateGroupOptions = {
  autoDevopsEnabled?: boolean;
  avatar?: { content: Blob; filename: string };
  defaultBranchProtection?: 0 | 1 | 2 | 3;
  description?: string;
  emailsDisabled?: boolean;
  lfsEnabled?: boolean;
  mentionsDisabled?: boolean;
  parentId?: number;
  projectCreationLevel?: 'noone' | 'maintainer' | 'developer';
  requestAccessEnabled?: boolean;
  requireTwoFactorAuthentication?: boolean;
  shareWithGroupLock?: boolean;
  subgroupCreationLevel?: string;
  twoFactorGracePeriod?: number;
  visibility?: 'public' | 'internal' | 'private';
  membershipLock?: boolean;
  extraSharedRunnersMinutesLimit?: number;
  sharedRunnersMinutesLimit?: number;
};

export type EditGroupOptions = {
  name?: string;
  path?: string;
  autoDevopsEnabled?: boolean;
  avatar?: { content: Blob; filename: string };
  defaultBranchProtection?: 0 | 1 | 2 | 3;
  description?: string;
  emailsDisabled?: boolean;
  lfsEnabled?: boolean;
  mentionsDisabled?: boolean;
  preventSharingGroupsOutsideHierarchy?: boolean;
  projectCreationLevel?: 'noone' | 'maintainer' | 'developer';
  requestAccessEnabled?: boolean;
  requireTwoFactorAuthentication?: boolean;
  sharedRunnersSetting?:
    | 'enabled'
    | 'disabled_and_overridable'
    | 'disabled_and_unoverridable'
    | 'disabled_with_override';
  shareWithGroupLock?: boolean;
  subgroupCreationLevel?: string;
  twoFactorGracePeriod?: number;
  visibility?: 'public' | 'internal' | 'private';
  extraSharedRunnersMinutesLimit?: number;
  fileTemplateProjectId?: number;
  membershipLock?: boolean;
  preventForkingOutsideGroup?: boolean;
  sharedRunnersMinutesLimit?: number;
  uniqueProjectDownloadLimit?: number;
  uniqueProjectDownloadLimitIntervalInSeconds?: number;
  uniqueProjectDownloadLimitAllowlist?: string[];
  uniqueProjectDownloadLimitAlertlist?: number[];
  autoBanUserOnExcessiveProjectsDownload?: boolean;
  ipRestrictionRanges?: string;
};

export type AllProvisionedUsersOptions = {
  username?: string;
  search?: string;
  active?: boolean;
  blocked?: boolean;
  createdAfter?: string;
  createdBefore?: string;
};

export class Groups<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: { withCustomAttributes: true } & AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<
    GitlabAPIResponse<({ custom_attributes: CustomAttributeSchema[] } & GroupSchema)[], C, E, P>
  >;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: { statistics: true } & AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<({ statistics: GroupStatisticsSchema } & GroupSchema)[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GroupSchema[]>()(this, 'groups', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as AllGroupsOptions &
        BaseRequestSearchParams &
        PaginationRequestSearchParams<P>,
    });
  }

  allDescendantGroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: { statistics: true } & AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<({ statistics: GroupStatisticsSchema } & GroupSchema)[], C, E, P>>;

  allDescendantGroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>>;

  allDescendantGroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GroupSchema[]>()(this, endpoint`groups/${groupId}/descendant_groups`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as AllGroupsOptions &
        BaseRequestSearchParams &
        PaginationRequestSearchParams<P>,
    });
  }

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { simple: true } & AllGroupProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[] | ProjectSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CondensedProjectSchema[] | ProjectSchema[]>()(
      this,
      endpoint`groups/${groupId}/projects`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as AllGroupProjectsOptions &
          BaseRequestSearchParams &
          PaginationRequestSearchParams<P>,
      },
    );
  }

  allSharedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { simple: true } & AllGroupProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[], C, E, P>>;

  allSharedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  allSharedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[] | ProjectSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CondensedProjectSchema[] | ProjectSchema[]>()(
      this,
      endpoint`groups/${groupId}/projects/shared`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as AllGroupProjectsOptions &
          BaseRequestSearchParams &
          PaginationRequestSearchParams<P>,
      },
    );
  }

  allSubgroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { statistics: true } & AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<({ statistics: GroupStatisticsSchema } & GroupSchema)[], C, E, P>>;

  allSubgroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>>;

  allSubgroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<
    GitlabAPIResponse<
      GroupSchema[] | ({ statistics: GroupStatisticsSchema } & GroupSchema)[],
      C,
      E,
      P
    >
  > {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<
      GroupSchema[] | ({ statistics: GroupStatisticsSchema } & GroupSchema)[]
    >()(this, endpoint`groups/${groupId}/subgroups`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as AllGroupsOptions &
        BaseRequestSearchParams &
        PaginationRequestSearchParams<P>,
    });
  }

  allProvisionedUsers<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllProvisionedUsersOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SimpleUserSchema[]>()(
      this,
      endpoint`groups/${groupId}/provisioned_users`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as AllProvisionedUsersOptions &
          BaseRequestSearchParams &
          PaginationRequestSearchParams<P>,
      },
    );
  }

  allTransferLocations<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { search?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SimpleGroupSchema[]>()(
      this,
      endpoint`groups/${groupId}/transfer_locations`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as {
          search?: string;
        } & BaseRequestSearchParams &
          PaginationRequestSearchParams<P>,
      },
    );
  }

  create<E extends boolean = false>(
    name: string,
    path: string,
    { avatar, ...options }: CreateGroupOptions & ShowExpanded<E> & Sudo = {} as any,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedGroupSchema>()(this, 'groups', {
      sudo,
      showExpanded,
      body: avatar
        ? createFormData({
            ...body,
            name,
            path,
            avatar: [avatar.content, avatar.filename],
          })
        : {
            ...body,
            name,
            path,
          },
    });
  }

  downloadAvatar<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(this, endpoint`groups/${groupId}/avatar`, {
      sudo,
      showExpanded,
    });
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    { avatar, ...options }: EditGroupOptions & ShowExpanded<E> & Sudo = {} as any,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedGroupSchema>()(this, endpoint`groups/${groupId}`, {
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

  remove<E extends boolean = false>(
    groupId: string | number,
    options?: { permanentlyRemove?: boolean | string; fullPath?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  removeAvatar<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<void>()(this, endpoint`groups/${groupId}`, {
      sudo,
      showExpanded,
      body: { avatar: '' },
    });
  }

  restore<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`groups/${groupId}/restore`, {
      sudo,
      showExpanded,
    });
  }

  search<E extends boolean = false>(
    nameOrPath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupSchema[]>()(this, 'groups', {
      sudo,
      showExpanded,
      searchParams: { search: nameOrPath },
    });
  }

  share<E extends boolean = false>(
    groupId: string | number,
    sharedGroupId: string | number,
    groupAccess: number,
    options?: { expiresAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedGroupSchema>()(this, endpoint`groups/${groupId}/share`, {
      sudo,
      showExpanded,
      body: { ...body, groupId: sharedGroupId, groupAccess },
    });
  }

  show<E extends boolean = false>(
    groupId: string | number,
    options?: BaseRequestSearchParams & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExpandedGroupSchema>()(this, endpoint`groups/${groupId}`, {
      sudo,
      showExpanded,
    });
  }

  transfer<E extends boolean = false>(
    groupId: string | number,
    options?: { groupId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(this, endpoint`groups/${groupId}/transfer`, {
      sudo,
      showExpanded,
      body,
    });
  }

  transferProject<E extends boolean = false>(
    groupId: string | number,
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`groups/${groupId}/projects/${projectId}`, {
      sudo,
      showExpanded,
    });
  }

  unshare<E extends boolean = false>(
    groupId: string | number,
    sharedGroupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}/share/${sharedGroupId}`, {
      sudo,
      showExpanded,
    });
  }

  uploadAvatar<E extends boolean = false>(
    groupId: string | number,
    content: Blob,
    { filename, ...options }: { filename?: string } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<{ avatar_url: string }, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<{ avatar_url: string }>()(this, endpoint`groups/${groupId}/avatar`, {
      sudo,
      showExpanded,
      body: createFormData({
        ...body,
        file: [content, filename],
      }),
    });
  }
}
