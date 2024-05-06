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
import type { CondensedProjectSchema, ProjectSchema } from './Projects';
import type { SimpleUserSchema } from './Users';
import type { CustomAttributeSchema } from '../templates/ResourceCustomAttributes';
import { AccessLevel } from '../constants';

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
  avatar_url: string;
  full_name: string;
  full_path: string;
}

export interface GroupSchema extends SimpleGroupSchema {
  path: string;
  description: string;
  visibility: string;
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
  shared_with_groups?: ProjectSchema[];
  projects?: ProjectSchema[];
  shared_projects?: ProjectSchema[];
}

export type AllGroupsOptions = {
  skipGroups?: number[];
  allAvailable?: boolean;
  search?: string;
  orderBy?: 'name' | 'path' | 'id';
  sort?: 'asc' | 'desc';
  statistics?: boolean;
  withCustomAttributes?: boolean;
  owned?: boolean;
  minAccessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
  topLevelOnly?: boolean;
};

export type AllGroupProjectsOptions = {
  visibility?: string;
  orderBy?:
    | 'id'
    | 'name'
    | 'path'
    | 'created_at'
    | 'updated_at'
    | 'similarity'
    | 'last_activity_at';
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
  visibility?: 'private' | 'public';
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
  visibility?: 'private' | 'public';
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
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<
    GitlabAPIResponse<(GroupSchema & { custom_attributes: CustomAttributeSchema[] })[], C, E, P>
  >;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: { statistics: true } & AllGroupsOptions &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<(GroupSchema & { statistics: GroupStatisticsSchema })[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: AllGroupsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: AllGroupsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>> {
    return RequestHelper.get<GroupSchema[]>()(this, 'groups', options);
  }

  allDescendantGroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: { statistics: true } & AllGroupsOptions &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<(GroupSchema & { statistics: GroupStatisticsSchema })[], C, E, P>>;

  allDescendantGroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: AllGroupsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>>;

  allDescendantGroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>> {
    return RequestHelper.get<GroupSchema[]>()(
      this,
      endpoint`groups/${groupId}/descendant_groups`,
      options,
    );
  }

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { simple: true } & AllGroupProjectsOptions &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupProjectsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupProjectsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[] | ProjectSchema[], C, E, P>> {
    return RequestHelper.get<CondensedProjectSchema[] | ProjectSchema[]>()(
      this,
      endpoint`groups/${groupId}/projects`,
      options,
    );
  }

  allSharedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { simple: true } & AllGroupProjectsOptions &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[], C, E, P>>;

  allSharedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupProjectsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  allSharedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupProjectsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[] | ProjectSchema[], C, E, P>> {
    return RequestHelper.get<CondensedProjectSchema[] | ProjectSchema[]>()(
      this,
      endpoint`groups/${groupId}/projects/shared`,
      options,
    );
  }

  allSubgroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { statistics: true } & AllGroupsOptions &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<(GroupSchema & { statistics: GroupStatisticsSchema })[], C, E, P>>;

  allSubgroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>>;

  allSubgroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllGroupsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<
    GitlabAPIResponse<
      GroupSchema[] | (GroupSchema & { statistics: GroupStatisticsSchema })[],
      C,
      E,
      P
    >
  > {
    return RequestHelper.get<
      GroupSchema[] | (GroupSchema & { statistics: GroupStatisticsSchema })[]
    >()(this, endpoint`groups/${groupId}/subgroups`, options);
  }

  allProvisionedUsers<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllProvisionedUsersOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, P>> {
    return RequestHelper.get<SimpleUserSchema[]>()(
      this,
      endpoint`groups/${groupId}/provisioned_users`,
      options,
    );
  }

  allTransferLocations<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { search?: string } & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, P>> {
    return RequestHelper.get<SimpleGroupSchema[]>()(
      this,
      endpoint`groups/${groupId}/transfer_locations`,
      options,
    );
  }

  create<E extends boolean = false>(
    name: string,
    path: string,
    { avatar, ...options }: CreateGroupOptions & Sudo & ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    if (avatar) {
      return RequestHelper.post<ExpandedGroupSchema>()(this, 'groups', {
        ...options,
        isForm: true,
        avatar: [avatar.content, avatar.filename],
        name,
        path,
      });
    }

    return RequestHelper.post<ExpandedGroupSchema>()(this, 'groups', { name, path, ...options });
  }

  downloadAvatar<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(this, endpoint`groups/${groupId}/avatar`, options);
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    { avatar, ...options }: EditGroupOptions & Sudo & ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    if (avatar) {
      return RequestHelper.post<ExpandedGroupSchema>()(this, endpoint`groups/${groupId}`, {
        ...options,
        isForm: true,
        avatar: [avatar.content, avatar.filename],
      });
    }

    return RequestHelper.put<ExpandedGroupSchema>()(this, endpoint`groups/${groupId}`, options);
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    options?: { permanentlyRemove?: boolean | string; fullPath?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`groups/${groupId}`, options);
  }

  removeAvatar<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(this, endpoint`groups/${groupId}`, {
      ...options,
      avatar: '',
    });
  }

  restore<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`groups/${groupId}/restore`, options);
  }

  search<E extends boolean = false>(
    nameOrPath: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, void>> {
    return RequestHelper.get<GroupSchema[]>()(this, 'groups', {
      search: nameOrPath,
      ...options,
    });
  }

  share<E extends boolean = false>(
    groupId: string | number,
    sharedGroupId: string | number,
    groupAccess: number,
    options: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    return RequestHelper.post<ExpandedGroupSchema>()(this, endpoint`groups/${groupId}/share`, {
      groupId: sharedGroupId,
      groupAccess,
      ...options,
    });
  }

  show<E extends boolean = false>(
    groupId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    return RequestHelper.get<ExpandedGroupSchema>()(this, endpoint`groups/${groupId}`, options);
  }

  transfer<E extends boolean = false>(
    groupId: string | number,
    options?: { groupId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`groups/${groupId}/transfer`, options);
  }

  transferProject<E extends boolean = false>(
    groupId: string | number,
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(
      this,
      endpoint`groups/${groupId}/projects/${projectId}`,
      options,
    );
  }

  unshare<E extends boolean = false>(
    groupId: string | number,
    sharedGroupId: string | number,
    options: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`groups/${groupId}/share/${sharedGroupId}`, options);
  }

  uploadAvatar<E extends boolean = false>(
    groupId: string | number,
    content: Blob,
    { filename, ...options }: { filename?: string } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<{ avatar_url: string }, C, E, void>> {
    return RequestHelper.put<{ avatar_url: string }>()(this, endpoint`groups/${groupId}/avatar`, {
      isForm: true,
      ...options,
      file: [content, filename],
    });
  }
}
