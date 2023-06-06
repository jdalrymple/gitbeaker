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
import type { UserSchema } from '../resources/Users';
import type { MilestoneSchema } from './ResourceMilestones';

export interface MilestoneEventSchema extends Record<string, unknown> {
  id: number;
  user: MappedOmit<UserSchema, 'created_at'>;
  created_at: string;
  resource_type: 'Issue' | 'MergeRequest';
  resource_id: number;
  milestone: MilestoneSchema;
  action: 'add' | 'remove';
}

export class ResourceMilestoneEvents<C extends boolean = false> extends BaseResource<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    resource2Id: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MilestoneEventSchema[], C, E, P>> {
    return RequestHelper.get<MilestoneEventSchema[]>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/resource_milestone_events`,
      options,
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    milestoneEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneEventSchema, C, E, void>> {
    return RequestHelper.get<MilestoneEventSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/resource_milestone_events/${milestoneEventId}`,
      options,
    );
  }
}
