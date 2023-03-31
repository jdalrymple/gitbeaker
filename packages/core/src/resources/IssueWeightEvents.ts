import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceStateEvents } from '../templates';
import type { StateEventSchema } from '../templates/types';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface IssueWeightEvents<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<StateEventSchema[], C, E, P>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    weightEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<StateEventSchema, C, E, void>>;
}

export class IssueWeightEvents<C extends boolean = false> extends ResourceStateEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
