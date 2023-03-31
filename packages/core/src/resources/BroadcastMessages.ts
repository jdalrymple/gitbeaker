import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { AccessLevel } from '../templates/types';
import type {
  BaseRequestOptions,
  Camelize,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface BroadcastMessageSchema extends Record<string, unknown> {
  message: string;
  starts_at: string;
  ends_at: string;
  color: string;
  font: string;
  id: number;
  active: boolean;
  target_path: string;
  target_access_levels: AccessLevel[];
  broadcast_type: string;
  dismissable: boolean;
}

export type BroadcastMessageOptions = Camelize<Omit<BroadcastMessageSchema, 'id'>>;

export class BroadcastMessages<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema[], C, E, P>> {
    return RequestHelper.get<BroadcastMessageSchema[]>()(this, 'broadcast_messages', options);
  }

  create<E extends boolean = false>(
    options?: BroadcastMessageOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema, C, E, void>> {
    return RequestHelper.post<BroadcastMessageSchema>()(this, 'broadcast_messages', options);
  }

  edit<E extends boolean = false>(
    broadcastMessageId: number,
    options?: BroadcastMessageOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema, C, E, void>> {
    return RequestHelper.put<BroadcastMessageSchema>()(
      this,
      `broadcast_messages/${broadcastMessageId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    broadcastMessageId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, `broadcast_messages/${broadcastMessageId}`, options);
  }

  show<E extends boolean = false>(
    broadcastMessageId: number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema, C, E, void>> {
    return RequestHelper.get<BroadcastMessageSchema>()(
      this,
      `broadcast_messages/${broadcastMessageId}`,
      options,
    );
  }
}
