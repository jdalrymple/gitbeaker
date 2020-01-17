import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  ShowExpanded,
} from '../infrastructure';
import { ProjectSchema } from './Projects';

export type GroupSchema = GroupSchemaDefault | GroupSchemaCamelized;

export interface GroupSchemaDefault {
  id: number;
  name: string;
  path: string;
  full_name: string;
  full_path: string;
  parent_id: number;
  visibility: string;
  avatar_url: string;
  web_url: string;
}

export interface GroupSchemaCamelized {
  id: number;
  name: string;
  path: string;
  fullName: string;
  fullPath: string;
  parentId: number;
  visibility: string;
  avatarUrl: string;
  webUrl: string;
}

export type GroupDetailSchema = GroupSchema & {
  projects: ProjectSchema[];
};

export class Groups extends BaseService {
  all(options?: PaginatedRequestOptions): Promise<GroupSchema[]> {
    return RequestHelper.get(this, 'groups', options) as Promise<GroupSchema[]>;
  }

  create(name, path, options?: BaseRequestOptions & ShowExpanded) {
    return RequestHelper.post(this, 'groups', { name, path, ...options });
  }

  createLDAPLink(
    groupId: string | number,
    cn,
    groupAccess,
    provider: string,
    options?: Sudo & ShowExpanded,
  ) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/ldap_group_links`, {
      cn,
      groupAccess,
      provider,
      ...options,
    });
  }

  edit(groupId: string | number, options?: BaseRequestOptions & ShowExpanded) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.put(this, `groups/${gId}`, options);
  }

  projects(groupId: string | number, options?: BaseRequestOptions): Promise<ProjectSchema[]> {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/projects`, options) as Promise<ProjectSchema[]>;
  }

  remove(groupId: string | number, options?: Sudo & ShowExpanded) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.del(this, `groups/${gId}`, options);
  }

  removeLDAPLink(
    groupId: string | number,
    cn,
    { provider, ...options }: Sudo & ShowExpanded & { provider?: string } = {},
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

  syncLDAP(groupId: string | number, options?: Sudo & ShowExpanded) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post(this, `groups/${gId}/ldap_sync`, options);
  }
}
