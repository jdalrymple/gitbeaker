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
import type { CondensedProjectSchema, ExpandedProjectSchema } from './Projects';
import type { UserSchema } from './Users';

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
  emails_disabled?: boolean;
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
  shared_with_groups?: ExpandedProjectSchema[];
  projects?: ExpandedProjectSchema[];
  shared_projects?: ExpandedProjectSchema[];
}

export class Groups<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: { statistics: true } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<(GroupSchema & { statistics: GroupStatisticsSchema })[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>> {
    return RequestHelper.get<GroupSchema[]>()(this, 'groups', options);
  }

  allDescendantGroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: { statistics: true } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<(GroupSchema & { statistics: GroupStatisticsSchema })[], C, E, P>>;

  allDescendantGroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>> {
    return RequestHelper.get<GroupSchema[]>()(
      this,
      endpoint`groups/${groupId}/descendant_groups`,
      options,
    );
  }

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { simple: true; sharedOnly?: boolean } & PaginationRequestOptions<P> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedProjectSchema[], C, E, P>>;

  allProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedProjectSchema[], C, E, P>> {
    return RequestHelper.get()(this, endpoint`groups/${groupId}/projects`, options) as any;
  }

  allSharedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { simple: true } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<CondensedProjectSchema[], C, E, P>>;

  allSharedProjects<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedProjectSchema[], C, E, P>> {
    return RequestHelper.get()(this, endpoint`groups/${groupId}/projects/shared`, options) as any;
  }

  allSubgroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { statistics: true } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<(GroupSchema & { statistics: GroupStatisticsSchema })[], C, E, P>>;

  allSubgroups<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupSchema[], C, E, P>> {
    return RequestHelper.get<GroupSchema[]>()(this, endpoint`groups/${groupId}/subgroups`, options);
  }

  allProvisionedUsers<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<UserSchema[], C, E, P>> {
    return RequestHelper.get<UserSchema[]>()(
      this,
      endpoint`groups/${groupId}/provisioned_users`,
      options,
    );
  }

  allTransferLocations<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { search?: string } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
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
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupSchema, C, E, void>> {
    return RequestHelper.post<GroupSchema>()(this, 'groups', { name, path, ...options });
  }

  downloadAvatar<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(this, endpoint`groups/${groupId}/avatar`, options);
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedGroupSchema, C, E, void>> {
    return RequestHelper.put<ExpandedGroupSchema>()(this, endpoint`groups/${groupId}`, options);
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
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
    options: BaseRequestOptions<E>,
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
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`groups/${groupId}/transfer`, options);
  }

  transferProject<E extends boolean = false>(
    groupId: string | number,
    projectId: string | number,
    options?: BaseRequestOptions<E>,
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
    options: BaseRequestOptions<E>,
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
