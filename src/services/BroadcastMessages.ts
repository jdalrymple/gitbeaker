import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type BroadcastMessageId = string | number;

class BroadcastMessages extends BaseService {
  all(options: RequestOptions) {
    return RequestHelper.get(this, 'broadcast_messages', options);
  }

  create(options: RequestOptions) {
    return RequestHelper.post(this, 'broadcast_messages', options);
  }

  edit(broadcastMessageId: BroadcastMessageId, options: RequestOptions) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.put(this, `broadcast_messages/${bId}`, options);
  }

  remove(broadcastMessageId: BroadcastMessageId) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.delete(this, `broadcast_messages/${bId}`);
  }

  show(broadcastMessageId: BroadcastMessageId, options: RequestOptions) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.get(this, `broadcast_messages/${bId}`, options);
  }
}

export default BroadcastMessages;
