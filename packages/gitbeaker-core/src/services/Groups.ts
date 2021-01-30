import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  Camelize,
  ShowExpanded,
} from '../infrastructure';
import { ProjectSchema } from './Projects';

export interface GroupSchemaDefault extends Record<string, unknown> {
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

export type GroupSchema<C> = C extends true ? Camelize<GroupSchemaDefault> : GroupSchemaDefault;

export type GroupDetailSchema<C> = GroupSchema<C> & {
  projects: ProjectSchema<C>[];
};

export class Groups<C extends boolean = false> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<C, GroupSchema<C>[]>(this, 'groups', options);
  }

  create(name: string, path: string, options?: BaseRequestOptions) {
    return RequestHelper.post<C>(this, 'groups', { name, path, ...options });
  }

  createLDAPLink(
    groupId: string | number,
    cn: string,
    groupAccess: number,
    provider: string,
    options?: Sudo & ShowExpanded,
  ) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post<C>(this, `groups/${gId}/ldap_group_links`, {
      cn,
      groupAccess,
      provider,
      ...options,
    });
  }

  edit(groupId: string | number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.put<C>(this, `groups/${gId}`, options);
  }

  projects(groupId: string | number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<C, ProjectSchema<C>[]>(this, `groups/${gId}/projects`, options);
  }

  remove(groupId: string | number, options?: Sudo & ShowExpanded) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.del<C>(this, `groups/${gId}`, options);
  }

  removeLDAPLink(
    groupId: string | number,
    cn: string,
    { provider, ...options }: Sudo & ShowExpanded & { provider?: string } = {},
  ) {
    const gId = encodeURIComponent(groupId);
    const url = provider ? `${provider}/${cn}` : `${cn}`;

    return RequestHelper.del<C>(this, `groups/${gId}/ldap_group_links/${url}`, options);
  }

  search(nameOrPath: string, options?: Sudo) {
    return RequestHelper.get<C>(this, 'groups', {
      search: nameOrPath,
      ...options,
    });
  }

  show(groupId: string | number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<C, GroupDetailSchema<C>>(this, `groups/${gId}`, options);
  }

  subgroups(groupId: string | number, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<C>(this, `groups/${gId}/subgroups`, options);
  }

  syncLDAP(groupId: string | number, options?: Sudo & ShowExpanded) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.post<C>(this, `groups/${gId}/ldap_sync`, options);
  }
}
