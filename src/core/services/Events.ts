import { BaseService, RequestHelper, PaginatedRequestOptions } from '../infrastructure';

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

export class Events extends BaseService {
  all(options?: PaginatedRequestOptions & EventOptions) {
    return RequestHelper.get(this, 'events', options);
  }
}
