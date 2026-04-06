import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { AwardEmojiSchema } from './ResourceAwardEmojis';

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
    options?: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};
    const url = endpoint`${projectId}/${this.resourceType}/${resourceIId}/notes/${noteId}/award_emoji`;

    return RequestHelper.get<AwardEmojiSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  award<E extends boolean = false>(
    projectId: string | number,
    resourceIId: number,
    noteId: number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};
    const url = endpoint`${projectId}/${this.resourceType}/${resourceIId}/notes/${noteId}/award_emoji/${awardId}`;

    return RequestHelper.get<AwardEmojiSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }
}
