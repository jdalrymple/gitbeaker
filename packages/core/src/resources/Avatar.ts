import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface AvatarSchema extends Record<string, unknown> {
  avatar_url: string;
}

export class Avatar<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    email: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AvatarSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<AvatarSchema>()(this, 'avatar', {
      sudo,
      showExpanded,
      searchParams: { email },
    });
  }
}
