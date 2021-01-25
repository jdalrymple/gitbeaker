import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class BroadcastMessages<C extends boolean> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<C>(this, 'broadcast_messages', options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post<C>(this, 'broadcast_messages', options);
  }

  edit(broadcastMessageId: number, options?: BaseRequestOptions) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.put<C>(this, `broadcast_messages/${bId}`, options);
  }

  remove(broadcastMessageId: number, options?: Sudo) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.del<C>(this, `broadcast_messages/${bId}`, options);
  }

  show(broadcastMessageId: number, options?: BaseRequestOptions) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.get<C>(this, `broadcast_messages/${bId}`, options);
  }
}
