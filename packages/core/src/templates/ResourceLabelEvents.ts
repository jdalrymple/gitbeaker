import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleUserSchema } from '../resources/Users';
import type { LabelSchema } from './ResourceLabels';

import { RequestHelper, endpoint } from '../infrastructure';

export interface LabelEventSchema extends Record<string, unknown> {
  id: number;
  user: MappedOmit<SimpleUserSchema, 'created_at'>;
  created_at: string;
  resource_type: 'Issue' | 'Epic' | 'MergeRequest';
  resource_id: number;
  label: LabelSchema;
  action: 'add' | 'remove';
}

export class ResourceLabelEvents<C extends boolean = false> extends BaseResource<C> {
  protected resource2Type: string;

  constructor(resourceType: string, resource2Type: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });

    this.resource2Type = resource2Type;
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    resource2Id: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LabelEventSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<LabelEventSchema[]>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/resource_label_events`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    resource2Id: string | number,
    labelEventId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<LabelEventSchema, C, E, void>> {
    return RequestHelper.get<LabelEventSchema>()(
      this,
      endpoint`${resourceId}/${this.resource2Type}/${resource2Id}/resource_label_events/${labelEventId}`,
      options,
    );
  }
}
