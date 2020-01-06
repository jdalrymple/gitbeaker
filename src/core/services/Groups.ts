import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { ProjectSchema } from './Projects';

// As of GitLab v12.6.2
export interface GroupSchema {
  id: number;
  web_url: string;
  name: string;
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
  lfs_enabled: boolean;
  avatar_url: string;
  request_access_enabled: boolean;
  full_name: string;
  full_path: string;
  parent_id?: number;
}

// As of GitLab v12.6.2
export interface GroupDetailSchema extends GroupSchema {
  projects: ProjectSchema[];
  shared_projects: ProjectSchema[];
  runners_token: string;
}

export class Groups extends BaseService {
  all(options?: PaginatedRequestOptions): Promise<GroupSchema[]> {
    return RequestHelper.get(this, 'groups', options) as Promise<GroupSchema[]>;
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'groups', options);
  }

  createLDAPLink(groupId: string | number, cn, groupAccess, provider: string, options?: Sudo) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/ldap_group_links`, {
      cn,
      groupAccess,
      provider,
      ...options,
    });
  }

  edit(groupId: string | number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.put(this, `groups/${gId}`, options);
  }

  projects(groupId: string | number, options?: BaseRequestOptions): Promise<ProjectSchema[]> {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/projects`, options) as Promise<ProjectSchema[]>;
  }

  remove(groupId: string | number, options?: Sudo) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.del(this, `groups/${gId}`, options);
  }

  removeLDAPLink(
    groupId: string | number,
    cn,
    { provider, ...options }: Sudo & { provider?: string } = {},
  ) {
    const gId = encodeURIComponent(groupId);
    const url = provider ? `${provider}/${cn}` : `${cn}`;

    return RequestHelper.del(this, `groups/${gId}/ldap_group_links/${url}`, options);
  }

  search(nameOrPath: string, options?: Sudo) {
    return RequestHelper.get(this, 'groups', {
      search: nameOrPath,
      ...options,
    });
  }

  show(groupId: string | number, options?: BaseRequestOptions): Promise<GroupDetailSchema> {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}`, options) as Promise<GroupDetailSchema>;
  }

  subgroups(groupId: string | number, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/subgroups`, options);
  }

  syncLDAP(groupId: string | number, options?: Sudo) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/ldap_sync`, options);
  }
}
