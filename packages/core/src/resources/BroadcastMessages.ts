import type {
  Camelize,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { AccessLevel } from '../constants';
import { RequestHelper } from '../infrastructure';

export interface BroadcastMessageSchema extends Record<string, unknown> {
  message: string;
  starts_at: string;
  ends_at: string;
  color: string;
  font: string;
  id: number;
  active: boolean;
  target_path: string;
  target_access_levels: Exclude<
    AccessLevel,
    AccessLevel.MINIMAL_ACCESS | AccessLevel.NO_ACCESS | AccessLevel.ADMIN
  >[];
  broadcast_type: string;
  dismissible: boolean;
}

type BroadcastMessageOptions = Partial<Camelize<BroadcastMessageSchema>>;

export class BroadcastMessages<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<BroadcastMessageSchema[]>()(this, 'broadcast_messages', {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  create<E extends boolean = false>(
    options?: BroadcastMessageOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<BroadcastMessageSchema>()(this, 'broadcast_messages', {
      sudo,
      showExpanded,
      body,
    });
  }

  edit<E extends boolean = false>(
    broadcastMessageId: number,
    options?: BroadcastMessageOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<BroadcastMessageSchema>()(
      this,
      `broadcast_messages/${broadcastMessageId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    broadcastMessageId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, `broadcast_messages/${broadcastMessageId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    broadcastMessageId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<BroadcastMessageSchema>()(
      this,
      `broadcast_messages/${broadcastMessageId}`,
      { sudo, showExpanded },
    );
  }
}
