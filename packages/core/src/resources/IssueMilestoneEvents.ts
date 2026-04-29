import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { MilestoneEventSchema } from '../templates/ResourceMilestoneEvents';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestoneEvents } from '../templates';

export interface IssueMilestoneEvents<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    issueIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MilestoneEventSchema[], C, E, P>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    milestoneEventId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MilestoneEventSchema, C, E, void>>;
}

export class IssueMilestoneEvents<C extends boolean = false> extends ResourceMilestoneEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
