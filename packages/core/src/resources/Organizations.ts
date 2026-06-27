import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, createFormData, normalizeFormData } from '../infrastructure';

export interface OrganizationSchema extends Record<string, unknown> {
  id: number;
  name: string;
  path: string;
  description: string;
  created_at: string;
  updated_at: string;
  web_url: string;
  avatar_url: string;
}

export interface CreateOrganizationOptions {
  name: string;
  path: string;
  description?: string;
  avatar?: { content: Blob; filename: string };
}

export class Organizations<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    options: CreateOrganizationOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<OrganizationSchema, C, E, void>> {
    const { name, path, description, avatar, sudo, showExpanded } = options;

    const body = avatar
      ? createFormData(
          normalizeFormData({
            name,
            path,
            description,
            avatar: [avatar.content, avatar.filename],
          }),
        )
      : { name, path, description };

    return RequestHelper.post<OrganizationSchema>()(this, 'organizations', {
      sudo,
      showExpanded,
      body,
    });
  }
}