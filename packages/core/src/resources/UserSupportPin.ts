import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface UserSupportPinSchema extends Record<string, unknown> {
  pin: string;
  expires_at: string;
}

export class UserSupportPin<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserSupportPinSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserSupportPinSchema>()(this, 'user/support_pin', {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    options?: { userId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserSupportPinSchema, C, E, void>> {
    const { userId, sudo, showExpanded } = options || {};

    const url = getPrefixedUrl('support_pin', { users: userId, user: !userId });

    return RequestHelper.get<UserSupportPinSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }

  revoke<E extends boolean = false>(
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`users/${userId}/support_pin/revoke`, {
      sudo,
      showExpanded,
    });
  }
}
