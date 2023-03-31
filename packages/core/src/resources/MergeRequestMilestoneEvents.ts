import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestoneEvents } from '../templates';
import type { MilestoneEventSchema } from '../templates/types';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface MergeRequestMilestoneEvents<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MilestoneEventSchema[], C, E, P>>;

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    milestoneEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneEventSchema, C, E, void>>;
}

export class MergeRequestMilestoneEvents<
  C extends boolean = false,
> extends ResourceMilestoneEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'merge_requests', options);
  }
}
