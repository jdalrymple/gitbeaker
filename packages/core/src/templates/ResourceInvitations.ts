import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, ensureRequiredParams } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

export interface InvitationSchema extends Record<string, unknown> {
  id: number;
  invite_email: string;
  created_at: string;
  access_level: Exclude<AccessLevel, AccessLevel.ADMIN>;
  expires_at: string;
  user_name: string;
  created_by_name: string;
}

export class ResourceInvitations<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add<E extends boolean = false>(
    resourceId: string | number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options: OneOf<{ email: string; userId: string }> & {
      expiresAt?: string;
      inviteSource?: string;
      tasksToBeDone?: string[];
      tasksProjectId?: number;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>> {
    ensureRequiredParams({ email: options?.email, userId: options?.userId });

    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<InvitationSchema>()(this, endpoint`${resourceId}/invitations`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        accessLevel,
      },
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: PaginationRequestOptions<P> & { query?: string } & BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<InvitationSchema[]>()(this, endpoint`${resourceId}/invitations`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    email: string,
    options?: { expiresAt?: string; accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN> } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<InvitationSchema>()(
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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<InvitationSchema>()(
      this,
      endpoint`${resourceId}/invitations/${email}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
