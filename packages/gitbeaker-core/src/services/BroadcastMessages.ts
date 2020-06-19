import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class BroadcastMessages extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'broadcast_messages', options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'broadcast_messages', options);
  }

  edit(broadcastMessageId: number, options?: BaseRequestOptions) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.put(this, `broadcast_messages/${bId}`, options);
  }

  remove(broadcastMessageId: number, options?: Sudo) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.del(this, `broadcast_messages/${bId}`, options);
  }

  show(broadcastMessageId: number, options?: BaseRequestOptions) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.get(this, `broadcast_messages/${bId}`, options);
  }
}
