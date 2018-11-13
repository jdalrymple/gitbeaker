import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, BroadcastMessageId } from '@src/types';

class BroadcastMessages extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'broadcast_messages', options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'broadcast_messages', options);
  }

  edit(broadcastMessageId: BroadcastMessageId, options?: BaseRequestOptions) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.put(this, `broadcast_messages/${bId}`, options);
  }

  remove(broadcastMessageId: BroadcastMessageId) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.delete(this, `broadcast_messages/${bId}`);
  }

  show(broadcastMessageId: BroadcastMessageId, options?: BaseRequestOptions) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.get(this, `broadcast_messages/${bId}`, options);
  }
}

export default BroadcastMessages;
