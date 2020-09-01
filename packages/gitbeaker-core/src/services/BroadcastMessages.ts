import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class BroadcastMessages extends BaseService {
  all(options?: PaginatedRequestOptions): Promise<RequestHelper.GetResponse> {
    return RequestHelper.get(this, 'broadcast_messages', options);
  }

  create(options?: BaseRequestOptions): Promise<RequestHelper.PostResponse> {
    return RequestHelper.post(this, 'broadcast_messages', options);
  }

  edit(
    broadcastMessageId: number,
    options?: BaseRequestOptions,
  ): Promise<RequestHelper.PutResponse> {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.put(this, `broadcast_messages/${bId}`, options);
  }

  remove(broadcastMessageId: number, options?: Sudo): Promise<RequestHelper.DelResponse> {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.del(this, `broadcast_messages/${bId}`, options);
  }

  show(
    broadcastMessageId: number,
    options?: BaseRequestOptions,
  ): Promise<RequestHelper.GetResponse> {
    const bId = encodeURIComponent(broadcastMessageId);

    return RequestHelper.get(this, `broadcast_messages/${bId}`, options);
  }
}
