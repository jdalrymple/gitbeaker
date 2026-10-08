import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface TokenInformationSchema extends Record<string, unknown> {
  id: number;
  user_id: number;
  name: string;
  revoked: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  scopes: string[];
  impersonation: boolean;
  expire_notification_delivered: boolean;
  last_used_at: string | null;
  after_expiry_notification_delivered: boolean;
  previous_personal_access_token_id: number | null;
  advanced_scopes: unknown;
  organization_id: number | null;
}

export class TokenInformation<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    token: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TokenInformationSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<TokenInformationSchema>()(this, 'admin/token', {
      sudo,
      showExpanded,
      body: {
        token,
      },
    });
  }

  revoke<E extends boolean = false>(
    token: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, 'admin/token', {
      sudo,
      showExpanded,
      body: {
        token,
      },
    });
  }
}
