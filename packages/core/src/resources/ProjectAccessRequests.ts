import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { AccessRequestSchema } from '../templates/ResourceAccessRequests';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { AccessLevel } from '../constants';
import { ResourceAccessRequests } from '../templates';

export interface ProjectAccessRequests<C extends boolean = false>
  extends ResourceAccessRequests<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessRequestSchema[], C, E, P>>;

  request<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessRequestSchema, C, E, void>>;

  approve<E extends boolean = false>(
    projectId: string | number,
    userId: number,
    options?: { accessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN> } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessRequestSchema, C, E, void>>;

  deny<E extends boolean = false>(
    projectId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class ProjectAccessRequests<C extends boolean = false> extends ResourceAccessRequests<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
