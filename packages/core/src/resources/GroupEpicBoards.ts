import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CondensedGroupSchema } from './Groups';
import { LabelSchema } from '../templates/ResourceLabels';

export interface GroupEpicBoardListSchema extends Record<string, unknown> {
  id: number;
  label: Pick<LabelSchema, 'id' | 'name' | 'color' | 'description'>;
  position: number;
  list_type: 'label';
  collapsed: boolean;
}

export interface GroupEpicBoardSchema extends Record<string, unknown> {
  id: number;
  name: string;
  group: CondensedGroupSchema;
  hide_backlog_list: boolean;
  hide_closed_list: boolean;
  labels: LabelSchema[] | null;
  lists: GroupEpicBoardListSchema[] | null;
}

export class GroupEpicBoards<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupEpicBoardSchema[], C, E, P>> {
    return RequestHelper.get<GroupEpicBoardSchema[]>()(
      this,
      endpoint`groups/${groupId}/epic_boards`,
      options,
    );
  }

  allLists<E extends boolean = false>(
    groupId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupEpicBoardListSchema[], C, E, void>> {
    return RequestHelper.get<GroupEpicBoardListSchema[]>()(
      this,
      endpoint`groups/${groupId}/epic_boards/${boardId}/lists`,
      options,
    );
  }

  show<E extends boolean = false>(
    groupId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupEpicBoardSchema, C, E, void>> {
    return RequestHelper.get<GroupEpicBoardSchema>()(
      this,
      endpoint`groups/${groupId}/epic_boards/${boardId}`,
      options,
    );
  }

  showList<E extends boolean = false>(
    groupId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupEpicBoardListSchema, C, E, void>> {
    return RequestHelper.get<GroupEpicBoardListSchema>()(
      this,
      endpoint`groups/${groupId}/epic_boards/${boardId}/lists/${listId}`,
      options,
    );
  }
}
