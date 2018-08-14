import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class BroadcastMessages extends BaseService {
  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, 'broadcast_messages', options);
  }

  @api({ options: true, method: 'POST' })
  create(options) {
    return RequestHelper.post(this, 'broadcast_messages', options);
  }

  @api('<broadcastMessageId>', { options: true, method: 'PUT' })
  edit(broadcastMessageId, options) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.put(this, `broadcast_messages/${bId}`, options);
  }

  @api('<broadcastMessageId>', { method: 'DELETE' })
  remove(broadcastMessageId) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.delete(this, `broadcast_messages/${bId}`);
  }

  @api('<broadcastMessageId>', { options: true, method: 'GET' })
  show(broadcastMessageId, options) {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.get(this, `broadcast_messages/${bId}`, options);
  }
}

export default BroadcastMessages;
