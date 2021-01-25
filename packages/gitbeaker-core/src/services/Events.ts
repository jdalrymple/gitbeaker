import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions } from '../infrastructure';

export interface EventOptions {
  action?:
    | 'created'
    | 'updated'
    | 'closed'
    | 'reopened'
    | 'pushed'
    | 'commented'
    | 'merged'
    | 'joined'
    | 'left'
    | 'destroyed'
    | 'expired';
  targetType?: 'issue' | 'milestone' | 'merge_request' | 'note' | 'project' | 'snippet' | 'user';
}

export class Events<C extends boolean> extends BaseService<C> {
  all(options?: PaginatedRequestOptions & EventOptions) {
    return RequestHelper.get<C>(this, 'events', options);
  }
}
