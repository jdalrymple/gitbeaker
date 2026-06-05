import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface GroupEpicBoardLabelSchema extends Record<string, unknown> {
  id: number;
  title: string;
  name: string;
  color: string;
  description?: string | null;
  group_id?: number | null;
  project_id?: number | null;
  template: boolean;
  text_color: string;
  created_at: string;
  updated_at: string;
}

export interface GroupEpicBoardListLabelSchema extends Record<string, unknown> {
  id: number;
  name: string;
  color: string;
  description?: string | null;
}

export interface GroupEpicBoardListSchema extends Record<string, unknown> {
  id: number;
  label: GroupEpicBoardListLabelSchema;
  position: number;
  list_type: string;
  collapsed: boolean;
}

export interface GroupEpicBoardGroupSchema extends Record<string, unknown> {
  id: number;
  name: string;
  web_url: string;
}

export interface GroupEpicBoardSchema extends Record<string, unknown> {
  id: number;
  name: string;
  hide_backlog_list: boolean;
  hide_closed_list: boolean;
  group: GroupEpicBoardGroupSchema;
  labels: GroupEpicBoardLabelSchema[];
  lists: GroupEpicBoardListSchema[];
}

export class GroupEpicBoards<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupEpicBoardSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GroupEpicBoardSchema[]>()(
      this,
      endpoint`groups/${groupId}/epic_boards`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
      },
    );
  }

  show<E extends boolean = false>(
    groupId: string | number,
    boardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupEpicBoardSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupEpicBoardSchema>()(
      this,
      endpoint`groups/${groupId}/epic_boards/${boardId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allLists<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    boardId: number,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupEpicBoardListSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GroupEpicBoardListSchema[]>()(
      this,
      endpoint`groups/${groupId}/epic_boards/${boardId}/lists`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
      },
    );
  }

  showList<E extends boolean = false>(
    groupId: string | number,
    boardId: number,
    listId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupEpicBoardListSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupEpicBoardListSchema>()(
      this,
      endpoint`groups/${groupId}/epic_boards/${boardId}/lists/${listId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
