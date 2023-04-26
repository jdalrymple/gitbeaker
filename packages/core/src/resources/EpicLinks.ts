import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { UserSchema } from './Users';

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
  author: UserSchema;
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
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<EpicLinkSchema[], C, E, P>> {
    return RequestHelper.get<EpicLinkSchema[]>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links`,
      options,
    );
  }

  assign<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    childEpicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicLinkSchema, C, E, void>> {
    return RequestHelper.post<EpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links/${childEpicId}`,
      options,
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    title: string,
    options?: { confidential?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedEpicLinkSchema, C, E, void>> {
    return RequestHelper.post<CondensedEpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links`,
      {
        searchParams: {
          title,
        },
        ...options,
      },
    );
  }

  reorder<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    childEpicId: number,
    options?: { moveBeforeId?: number; moveAfterId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicLinkSchema, C, E, void>> {
    return RequestHelper.put<EpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links/${childEpicId}`,
      options,
    );
  }

  unassign<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    childEpicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicLinkSchema, C, E, void>> {
    return RequestHelper.del<EpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/links/${childEpicId}`,
      options,
    );
  }
}
