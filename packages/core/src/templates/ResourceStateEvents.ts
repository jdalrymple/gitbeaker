import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleUserSchema } from '../resources/Users';

export interface StateEventSchema extends Record<string, unknown> {
  id: number;
  user: MappedOmit<SimpleUserSchema, 'created_at'>;
  created_at: string;
  resource_type: 'Issue';
  resource_id: number;
  action: 'add' | 'remove';
  state: 'opened' | 'closed';
}

export class ResourceStateEvents<C extends boolean = false> extends BaseResource<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    resource2Id: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<StateEventSchema[], C, E, P>> {
    return RequestHelper.get<StateEventSchema[]>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/resource_state_events`,
      options,
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    stateEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<StateEventSchema, C, E, void>> {
    return RequestHelper.get<StateEventSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/resource_state_events/${stateEventId}`,
      options,
    );
  }
}
