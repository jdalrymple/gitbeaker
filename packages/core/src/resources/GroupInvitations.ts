import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { InvitationSchema } from '../templates/ResourceInvitations';

import { AccessLevel } from '../constants';
import { ResourceInvitations } from '../templates';

export interface GroupInvitations<C extends boolean = false> {
  add<E extends boolean = false>(
    groupId: string | number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options: {
      expiresAt?: string;
      inviteSource?: string;
      tasksToBeDone?: string[];
      tasksProjectId?: number;
    } & OneOf<{ email: string; userId: string }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { query?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<InvitationSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    email: string,
    options?: {
      expiresAt?: string;
      accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    email: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;
}

export class GroupInvitations<C extends boolean = false> extends ResourceInvitations<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
