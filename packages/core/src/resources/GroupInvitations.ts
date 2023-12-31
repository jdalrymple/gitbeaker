import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceInvitations } from '../templates';
import type { InvitationSchema } from '../templates/ResourceInvitations';
import type {
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

export interface GroupInvitations<C extends boolean = false> {
  add<E extends boolean = false>(
    groupId: string | number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options: OneOf<{ email: string; userId: string }> & {
      expiresAt?: string;
      inviteSource?: string;
      tasksToBeDone?: string[];
      tasksProjectId?: number;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & { query?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    email: string,
    options?: { expiresAt?: string; accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN> } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    email: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;
}

export class GroupInvitations<C extends boolean = false> extends ResourceInvitations<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
