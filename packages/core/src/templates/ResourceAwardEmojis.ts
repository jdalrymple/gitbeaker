import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleUserSchema } from '../resources/Users';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface AwardEmojiSchema extends Record<string, unknown> {
  id: number;
  name: string;
  user: SimpleUserSchema;
  created_at: string;
  updated_at: string;
  awardable_id: number;
  awardable_type: string;
}

export class ResourceAwardEmojis<C extends boolean = false> extends BaseResource<C> {
  protected resourceType2: string;

  constructor(resourceType1: string, resourceType2: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType1, ...options });

    this.resourceType2 = resourceType2;
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    resourceIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};
    const url = endpoint`${resourceId}/${this.resourceType2}/${resourceIId}/award_emoji`;

    return RequestHelper.get<AwardEmojiSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  award<E extends boolean = false>(
    resourceId: string | number,
    resourceIId: number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};
    const url = endpoint`${resourceId}/${this.resourceType2}/${resourceIId}/award_emoji`;

    return RequestHelper.post<AwardEmojiSchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        name,
      },
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    resourceIId: number,
    awardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};
    const url = endpoint`${resourceId}/${this.resourceType2}/${resourceIId}/award_emoji/${awardId}`;

    return RequestHelper.del()(this, url, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    resourceIId: number,
    awardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};
    const url = endpoint`${resourceId}/${this.resourceType2}/${resourceIId}/award_emoji/${awardId}`;

    return RequestHelper.get<AwardEmojiSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }
}
