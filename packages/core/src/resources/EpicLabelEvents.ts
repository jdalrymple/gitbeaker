import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceLabelEvents } from '../templates';
import type { LabelEventSchema } from '../templates/ResourceLabelEvents';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface EpicLabelEvents<C extends boolean = false> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    epidId: number,
    options?: BaseRequestOptions<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<LabelEventSchema[], C, E, P>>;

  show<E extends boolean = false>(
    groupId: string | number,
    epidId: number,
    labelEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelEventSchema, C, E, void>>;
}

export class EpicLabelEvents<C extends boolean = false> extends ResourceLabelEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', 'epic', options);
  }
}
