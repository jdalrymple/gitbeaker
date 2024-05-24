import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
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
    if (!options?.email && !options?.userId)
      throw new Error(
        'Missing required argument. Please supply a email or a userId in the options parameter.',
      );

    return RequestHelper.post<InvitationSchema>()(this, endpoint`${resourceId}/invitations`, {
      accessLevel,
      ...options,
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: PaginationRequestOptions<P> & { query?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema[], C, E, P>> {
    return RequestHelper.get<InvitationSchema[]>()(
      this,
      endpoint`${resourceId}/invitations`,
      options,
    );
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    email: string,
    options?: { expiresAt?: string; accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN> } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>> {
    return RequestHelper.put<InvitationSchema>()(
      this,
      endpoint`${resourceId}/invitations/${email}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    email: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>> {
    return RequestHelper.put<InvitationSchema>()(
      this,
      endpoint`${resourceId}/invitations/${email}`,
      options,
    );
  }
}
