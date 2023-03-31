import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceInvitations } from '../templates';
import type { AccessLevel, InvitationSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  Either,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface GroupInvitations<C extends boolean = false> {
  add<E extends boolean = false>(
    groupId: string | number,
    accessLevel: AccessLevel,
    options: Either<{ email: string }, { userId: string }> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    email: string,
    options?: BaseRequestOptions<E>,
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
