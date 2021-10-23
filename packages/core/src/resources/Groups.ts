import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  ShowExpanded,
  RequestHelper,
  Sudo,
  endpoint,
} from '../infrastructure';
import { ProjectSchema } from './Projects';

export interface GroupSchema extends Record<string, unknown> {
  id: number;
  name: string;
  path: string;
  full_name: string;
  full_path: string;
  parent_id: number;
  visibility: string;
  avatar_url: string;
  web_url: string;
  description: string;
  share_with_group_lock: boolean;
  require_two_factor_authentication: boolean;
  two_factor_grace_period: number;
  project_creation_level: string;
  auto_devops_enabled: boolean;
  subgroup_creation_level: string;
  emails_disabled: boolean;
  mentions_disabled: boolean;
  lfs_enabled: boolean;
  default_branch_protection: number;
  request_access_enabled: boolean;
  file_template_project_id: number;
  created_at: string;
}

export type GroupDetailSchema = {
  id: number;
  name: string;
  path: string;
  full_name: string;
  full_path: string;
  parent_id: number;
  visibility: string;
  avatar_url: string;
  web_url: string;
  description: string;
  request_access_enabled: boolean;
  file_template_project_id: number;
  runners_token: string;
  shared_with_groups: {
    group_id: number;
    group_name: string;
    group_full_path: string;
    group_access_level: number;
    expires_at: string;
  }[];
  created_at: string;
};

export class Groups<C extends boolean = false> extends BaseResource<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<GroupSchema[]>()(this, 'groups', options);
  }

  create(name: string, path: string, options?: BaseRequestOptions) {
    return RequestHelper.post<GroupSchema>()(this, 'groups', { name, path, ...options });
  }

  createLDAPLink(
    groupId: string | number,
    cn: string,
    groupAccess: number,
    provider: string,
    options?: Sudo & ShowExpanded,
  ) {
    return RequestHelper.post()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      cn,
      groupAccess,
      provider,
      ...options,
    });
  }

  edit(groupId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.put<GroupSchema>()(this, endpoint`groups/${groupId}`, options);
  }

  projects(groupId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.get<ProjectSchema[]>()(
      this,
      endpoint`groups/${groupId}/projects`,
      options,
    );
  }

  remove(groupId: string | number, options?: Sudo & ShowExpanded) {
    return RequestHelper.del()(this, endpoint`groups/${groupId}`, options);
  }

  removeLDAPLink(
    groupId: string | number,
    cn: string,
    { provider, ...options }: Sudo & ShowExpanded & { provider?: string } = {},
  ) {
    const gId = encodeURIComponent(groupId);
    const url = provider ? `${provider}/${cn}` : `${cn}`;

    return RequestHelper.del()(
      this,
      `groups/${gId}/ldap_group_links/${url}`,
      options as Record<string, unknown>,
    );
  }

  search(nameOrPath: string, options?: Sudo) {
    return RequestHelper.get()(this, 'groups', {
      search: nameOrPath,
      ...options,
    });
  }

  show(groupId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.get<GroupDetailSchema>()(this, endpoint`groups/${groupId}`, options);
  }

  subgroups(groupId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get()(this, endpoint`groups/${groupId}/subgroups`, options);
  }

  syncLDAP(groupId: string | number, options?: Sudo & ShowExpanded) {
    return RequestHelper.post()(this, endpoint`groups/${groupId}/ldap_sync`, options);
  }

  transferProject(
    groupId: string | number,
    projectId: string | number,
    options?: BaseRequestOptions & ShowExpanded,
  ) {
    return RequestHelper.post()(this, endpoint`groups/${groupId}/projects/${projectId}`, options);
  }
}
