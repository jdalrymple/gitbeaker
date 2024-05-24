import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface IterationSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  group_id: number;
  title: string;
  description: string;
  state: number;
  created_at: string;
  updated_at: string;
  due_date: string;
  start_date: string;
  web_url: string;
}

export interface AllIterationsOptions {
  state?: 'opened' | 'upcoming' | 'current' | 'closed' | 'all';
  search?: string;
  includeAncestors?: boolean;
  updatedBefore?: string;
  updatedAfter?: string;
}

export class ResourceIterations<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: AllIterationsOptions & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<IterationSchema[], C, E, P>> {
    return RequestHelper.get<IterationSchema[]>()(
      this,
      endpoint`${resourceId}/iterations`,
      options,
    );
  }
}
