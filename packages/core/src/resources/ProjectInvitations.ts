import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceInvitations } from '../templates';
import type { InvitationSchema } from '../templates/ResourceInvitations';
import type { AccessLevel } from '../templates/ResourceAccessRequests';
import type {
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProjectInvitations<C extends boolean = false> {
  add<E extends boolean = false>(
    projectId: string | number,
    accessLevel: AccessLevel,
    options: OneOf<{ email: string; userId: string }> & {
      expiresAt?: string;
      inviteSource?: string;
      tasksToBeDone?: string[];
      tasksProjectId?: number;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & { query?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    email: string,
    options?: { expiresAt?: string; accessLevel?: AccessLevel } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    email: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<InvitationSchema, C, E, void>>;
}

export class ProjectInvitations<C extends boolean = false> extends ResourceInvitations<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
