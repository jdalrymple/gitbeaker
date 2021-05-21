import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { GroupSchema } from './Groups';
import { ResourceIssueBoards, IssueBoardSchema, IssueBoardListSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupIssueBoardSchema extends IssueBoardSchema {
  group: Pick<GroupSchema, 'id' | 'name' | 'web_url'>;
}

export interface GroupIssueBoards extends ResourceIssueBoards {
  all(groupId: string | number, options?: PaginatedRequestOptions): Promise<IssueBoardSchema[]>;

  create(groupId: string | number, name: string, options?: Sudo): Promise<GroupIssueBoardSchema>;

  createList(
    groupId: string | number,
    boardId: number,
    labelId: number | string,
    options?: Sudo,
  ): Promise<IssueBoardListSchema>;

  edit(
    groupId: string | number,
    boardId: number,
    options?: BaseRequestOptions,
  ): Promise<GroupIssueBoardSchema>;

  editList(
    groupId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo,
  ): Promise<IssueBoardListSchema>;

  lists(groupId: string | number, boardId: number, options?: Sudo): Promise<IssueBoardListSchema[]>;

  remove(groupId: string | number, boardId: number, options?: Sudo): Promise<void>;

  removeList(
    groupId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo,
  ): Promise<void>;

  show(groupId: string | number, boardId: number, options?: Sudo): Promise<GroupIssueBoardSchema>;

  showList(
    groupId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo,
  ): Promise<IssueBoardListSchema>;
}

export class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
