import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { AccessLevel } from '../constants';
import { RequestHelper, endpoint, ensureRequiredParams } from '../infrastructure';

export interface InvitationSchema extends Record<string, unknown> {
  id: number;
  invite_email: string;
  created_at: string;
  access_level: Exclude<AccessLevel, AccessLevel.ADMIN>;
  expires_at?: string | null;
  user_name?: string;
  created_by_name?: string;
}

export interface InvitationResponseSchema extends Record<string, unknown> {
  status: 'success' | 'error';
  message?: Record<string, string>;
  queued_users?: Record<string, string>;
}

export interface UpdateInvitationResponseSchema extends Record<string, unknown> {
  expires_at?: string | null;
  access_level: Exclude<AccessLevel, AccessLevel.ADMIN>;
}

export class ResourceInvitations<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add<E extends boolean = false>(
    resourceId: string | number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options: {
      expiresAt?: string;
      inviteSource?: string;
      memberRoleId?: number;
      tasksToBeDone?: string[];
      tasksProjectId?: number;
    } & OneOf<{ email: string; userId: string }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<InvitationResponseSchema, C, E, void>> {
    ensureRequiredParams({ email: options?.email, userId: options?.userId });

    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<InvitationResponseSchema>()(
      this,
      endpoint`${resourceId}/invitations`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          accessLevel,
        },
      },
    );
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: { query?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<InvitationSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<InvitationSchema[]>()(this, endpoint`${resourceId}/invitations`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    email: string,
    options?: {
      expiresAt?: string;
      accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<UpdateInvitationResponseSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<UpdateInvitationResponseSchema>()(
      this,
      endpoint`${resourceId}/invitations/${email}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    email: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/invitations/${email}`, {
      sudo,
      showExpanded,
    });
  }
}
