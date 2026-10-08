import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface UserModerationResponse extends Record<string, unknown> {
  message: string;
}

export class UserModeration<C extends boolean = false> extends BaseResource<C> {
  approve<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserModerationResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserModerationResponse>()(this, endpoint`users/${userId}/approve`, {
      sudo,
      showExpanded,
    });
  }

  reject<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserModerationResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserModerationResponse>()(this, endpoint`users/${userId}/reject`, {
      sudo,
      showExpanded,
    });
  }

  activate<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserModerationResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserModerationResponse>()(this, endpoint`users/${userId}/activate`, {
      sudo,
      showExpanded,
    });
  }

  deactivate<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserModerationResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserModerationResponse>()(
      this,
      endpoint`users/${userId}/deactivate`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  block<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserModerationResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserModerationResponse>()(this, endpoint`users/${userId}/block`, {
      sudo,
      showExpanded,
    });
  }

  unblock<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserModerationResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserModerationResponse>()(this, endpoint`users/${userId}/unblock`, {
      sudo,
      showExpanded,
    });
  }

  ban<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserModerationResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserModerationResponse>()(this, endpoint`users/${userId}/ban`, {
      sudo,
      showExpanded,
    });
  }

  unban<E extends boolean = false>(
    userId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserModerationResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<UserModerationResponse>()(this, endpoint`users/${userId}/unban`, {
      sudo,
      showExpanded,
    });
  }
}
