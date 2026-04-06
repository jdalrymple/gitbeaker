import { BaseResource } from '@gitbeaker/requester-utils';
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
import { EpicSchema } from './Epics';

export interface RelatedEpicSchema extends EpicSchema {
  related_epic_link_id: number;
}

export interface RelatedEpicLinkSchema extends Record<string, unknown> {
  source_epic: RelatedEpicSchema;
  target_epic: RelatedEpicSchema;
}

export type RelatedEpicLinkType = 'relates_to' | 'blocks' | 'is_blocked_by';

export class LinkedEpics<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    epicIId: number,
    options?: {
      createdAfter?: string;
      createdBefore?: string;
      updatedAfter?: string;
      updatedBefore?: string;
    } & Sudo &
      ShowExpanded<E> &
      PaginationRequestOptions<P> &
      BaseRequestSearchParams,
  ): Promise<GitlabAPIResponse<RelatedEpicSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<RelatedEpicSchema[]>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/related_epics`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
      },
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    targetEpicIId: string | number,
    targetGroupId: string | number,
    options?: { linkType?: RelatedEpicLinkType } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RelatedEpicLinkSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RelatedEpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/related_epics`,
      {
        sudo,
        showExpanded,
        searchParams: {
          targetGroupId,
          targetEpicIid: targetEpicIId,
        },
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    relatedEpicLinkId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RelatedEpicLinkSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<RelatedEpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/related_epics/${relatedEpicLinkId}`,
      { sudo, showExpanded },
    );
  }
}
