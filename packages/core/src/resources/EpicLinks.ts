import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import { SimpleUserSchema } from './Users';

export interface CondensedEpicLinkSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  group_id: number;
  parent_id: number;
  title: string;
  has_children: boolean;
  has_issues: boolean;
  reference: string;
  url: string;
  relation_url: string;
}

export interface EpicLinkSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  group_id: number;
  parent_id: number;
  title: string;
  description: string;
  author: SimpleUserSchema;
  start_date?: string;
  start_date_is_fixed: boolean;
  start_date_fixed?: string;
  start_date_from_milestones?: string;
  start_date_from_inherited_source?: string;
  due_date: string;
  due_date_is_fixed: boolean;
  due_date_fixed?: string;
  due_date_from_milestones?: string;
  due_date_from_inherited_source: string;
  created_at: string;
  updated_at: string;
  labels?: string[];
}

export class EpicLinks<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    epicIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<EpicLinkSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<EpicLinkSchema[]>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  assign<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    childEpicId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<EpicLinkSchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.post<EpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links/${childEpicId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    title: string,
    options?: { confidential?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CondensedEpicLinkSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CondensedEpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links`,
      {
        sudo,
        showExpanded,
        searchParams: {
          title,
        },
        body,
      },
    );
  }

  reorder<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    childEpicId: number,
    options?: { moveBeforeId?: number; moveAfterId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<EpicLinkSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<EpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links/${childEpicId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  unassign<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    childEpicId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<EpicLinkSchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.del<EpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links/${childEpicId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }
}
