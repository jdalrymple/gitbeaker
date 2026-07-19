import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { SimpleUserSchema } from './Users';

import { RequestHelper, endpoint } from '../infrastructure';

export class UserFollows<C extends boolean = false> extends BaseResource<C> {
  follow<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SimpleUserSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<SimpleUserSchema>()(this, endpoint`users/${userId}/follow`, {
      sudo,
      showExpanded,
    });
  }

  unfollow<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post()(this, endpoint`users/${userId}/unfollow`, {
      sudo,
      showExpanded,
    });
  }

  showFollowers<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<SimpleUserSchema[]>()(this, endpoint`users/${userId}/followers`, {
      sudo,
      showExpanded,
    });
  }

  showFollowing<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SimpleUserSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<SimpleUserSchema[]>()(this, endpoint`users/${userId}/following`, {
      sudo,
      showExpanded,
    });
  }
}
