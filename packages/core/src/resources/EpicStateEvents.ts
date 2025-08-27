import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceStateEvents } from '../templates';
import type { StateEventSchema } from '../templates/ResourceStateEvents';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface EpicStateEvents<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    epicId: number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<StateEventSchema[], C, E, P>>;

  show<E extends boolean = false>(
    groupId: string | number,
    epicId: number,
    stateEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<StateEventSchema, C, E, void>>;
}

export class EpicStateEvents<C extends boolean = false> extends ResourceStateEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', 'epics', options);
  }
}
