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
import type { AwardEmojiSchema } from './ResourceAwardEmojis';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export class ResourceNoteAwardEmojis<C extends boolean = false> extends BaseResource<C> {
  protected resourceType: string;

  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: 'projects', ...options });

    this.resourceType = resourceType;
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};
    const url = endpoint`${projectId}/${this.resourceType}/${resourceIId}/notes/${noteId}/award_emoji`;

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
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};
    const url = endpoint`${projectId}/${this.resourceType}/${resourceIId}/notes/${noteId}/award_emoji`;

    return RequestHelper.post<AwardEmojiSchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        name,
      },
    });
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    awardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};
    const url = endpoint`${projectId}/${this.resourceType}/${resourceIId}/notes/${noteId}/award_emoji/${awardId}`;

    return RequestHelper.del()(this, url, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    awardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};
    const url = endpoint`${projectId}/${this.resourceType}/${resourceIId}/notes/${noteId}/award_emoji/${awardId}`;

    return RequestHelper.get<AwardEmojiSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }
}
