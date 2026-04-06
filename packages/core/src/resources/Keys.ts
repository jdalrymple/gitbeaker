import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, ensureRequiredParams } from '../infrastructure';
import type { GitlabAPIResponse, OneOf, ShowExpanded, Sudo } from '../infrastructure';
import type { ExpandedUserSchema } from './Users';

export interface DeployKeyProjectsSchema extends Record<string, unknown> {
  id: number;
  deploy_key_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  can_push: boolean;
}

export interface KeySchema extends Record<string, unknown> {
  id: number;
  title: string;
  key: string;
  created_at: string;
  expires_at: string;
  usage_type?: string;
  user: ExpandedUserSchema;
  deploy_keys_projects?: DeployKeyProjectsSchema[];
}

export class Keys<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    {
      keyId,
      fingerprint,
      sudo,
      showExpanded,
      ...searchParams
    }: OneOf<{ keyId: number; fingerprint: string }> & Sudo & ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<KeySchema, C, E, void>> {
    let url: string;

    ensureRequiredParams({ keyId, fingerprint });

    if (keyId) url = `keys/${keyId}`;
    else url = `keys?fingerprint=${fingerprint}`;

    return RequestHelper.get<KeySchema>()(this, url, {
      sudo,
      showExpanded,
      searchParams,
    });
  }
}
