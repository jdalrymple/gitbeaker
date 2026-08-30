import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  Camelize,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { AccessLevel } from '../constants';
import { RequestHelper, endpoint } from '../infrastructure';

export interface BroadcastMessageSchema extends Record<string, unknown> {
  message: string;
  starts_at: string;
  ends_at: string;
  font: string;
  id: number;
  active: boolean;
  target_path?: string;
  target_access_levels?: Exclude<
    AccessLevel,
    AccessLevel.MINIMAL_ACCESS | AccessLevel.NO_ACCESS | AccessLevel.ADMIN
  >[];
  broadcast_type?: string;
  dismissable?: boolean;
  theme?:
    | 'indigo'
    | 'light-indigo'
    | 'blue'
    | 'light-blue'
    | 'green'
    | 'light-green'
    | 'red'
    | 'light-red'
    | 'dark'
    | 'light';
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
    message: string,
    options?: Omit<BroadcastMessageOptions, 'message'> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<BroadcastMessageSchema>()(this, 'broadcast_messages', {
      sudo,
      showExpanded,
      body: { message, ...body },
    });
  }

  edit<E extends boolean = false>(
    broadcastMessageId: number,
    options?: BroadcastMessageOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BroadcastMessageSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<BroadcastMessageSchema>()(
      this,
      endpoint`broadcast_messages/${broadcastMessageId}`,
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

    return RequestHelper.del()(this, endpoint`broadcast_messages/${broadcastMessageId}`, {
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
      endpoint`broadcast_messages/${broadcastMessageId}`,
      { sudo, showExpanded },
    );
  }
}
