import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { GroupSchema } from './Groups';
import { ResourceIssueBoards, IssueBoardSchema, IssueBoardListSchema } from '../templates';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

export interface GroupIssueBoardSchema extends IssueBoardSchema {
  group: Pick<GroupSchema, 'id' | 'name' | 'web_url'>;
}

export interface GroupIssueBoards<C extends boolean = false> extends ResourceIssueBoards<C> {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, IssueBoardSchema>[]>;

  create(
    groupId: string | number,
    name: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, GroupIssueBoardSchema>>;

  createList(
    groupId: string | number,
    boardId: number,
    labelId: number | string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, IssueBoardListSchema>>;

  edit(
    groupId: string | number,
    boardId: number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, GroupIssueBoardSchema>>;

  editList(
    groupId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, IssueBoardListSchema>>;

  lists(
    groupId: string | number,
    boardId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, IssueBoardListSchema>[]>;

  remove(groupId: string | number, boardId: number, options?: Sudo): Promise<void>;

  removeList(
    groupId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    groupId: string | number,
    boardId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, GroupIssueBoardSchema>>;

  showList(
    groupId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, IssueBoardListSchema>>;
}

export class GroupIssueBoards<C extends boolean = false> extends ResourceIssueBoards<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
