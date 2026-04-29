import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface AvatarSchema extends Record<string, unknown> {
  avatar_url: string;
}

export class Avatar<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    email: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AvatarSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<AvatarSchema>()(this, 'avatar', {
      sudo,
      showExpanded,
      searchParams: { email },
    });
  }
}
