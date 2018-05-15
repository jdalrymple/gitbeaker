import { BaseService, RequestHelper } from '../infrastructure';

class BroadcastMessages extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'broadcast_messages', options);
  }

  create(options) {
    return RequestHelper.post(this, 'broadcast_messages', options);
  }

  edit(broadcastMessageId, options) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.put(this, `broadcast_messages/${bId}`, options);
  }

  remove(broadcastMessageId) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.delete(this, `broadcast_messages/${bId}`);
  }

  show(broadcastMessageId, options) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.get(this, `broadcast_messages/${bId}`, options);
  }
}

export default BroadcastMessages;
