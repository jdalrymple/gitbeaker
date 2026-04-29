import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { IterationEventSchema } from '../templates/ResourceIterationEvents';

import { ResourceIterationEvents } from '../templates';

export interface IssueIterationEvents<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    issueIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IterationEventSchema[], C, E, P>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    iterationEventId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IterationEventSchema, C, E, void>>;
}

export class IssueIterationEvents<C extends boolean = false> extends ResourceIterationEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
