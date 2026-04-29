import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { AllIterationsOptions, IterationSchema } from '../templates/ResourceIterations';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceIterations } from '../templates';

export interface GroupIterations<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: AllIterationsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IterationSchema[], C, E, P>>;
}

export class GroupIterations<C extends boolean = false> extends ResourceIterations<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
