import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  ShowExpanded,
  RequestHelper,
  Sudo,
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
}

export type GroupDetailSchema = GroupSchema & {
  projects: ProjectSchema[];
};

export class Groups<C extends boolean = false> extends BaseService<C> {
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
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post()(this, `groups/${gId}/ldap_group_links`, {
      cn,
      groupAccess,
      provider,
      ...options,
    });
  }

  edit(groupId: string | number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.put()(this, `groups/${gId}`, options);
  }

  projects(groupId: string | number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<ProjectSchema[]>()(this, `groups/${gId}/projects`, options);
  }

  remove(groupId: string | number, options?: Sudo & ShowExpanded) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.del()(this, `groups/${gId}`, options);
  }

  removeLDAPLink(
    groupId: string | number,
    cn: string,
    { provider, ...options }: Sudo & ShowExpanded & { provider?: string } = {},
  ) {
    const gId = encodeURIComponent(groupId);
    const url = provider ? `${provider}/${cn}` : `${cn}`;

    return RequestHelper.del()(this, `groups/${gId}/ldap_group_links/${url}`, options);
  }

  search(nameOrPath: string, options?: Sudo) {
    return RequestHelper.get()(this, 'groups', {
      search: nameOrPath,
      ...options,
    });
  }

  show(groupId: string | number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<GroupDetailSchema>()(this, `groups/${gId}`, options);
  }

  subgroups(groupId: string | number, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get()(this, `groups/${gId}/subgroups`, options);
  }

  syncLDAP(groupId: string | number, options?: Sudo & ShowExpanded) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post()(this, `groups/${gId}/ldap_sync`, options);
  }
}
