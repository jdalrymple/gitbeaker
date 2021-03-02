import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceIssueBoards } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupIssueBoards<C extends boolean = false> extends ResourceIssueBoards<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions);

  create(groupId: string | number, name: string, options?: Sudo);

  createList(groupId: string | number, boardId: number, labelId: number, options?: Sudo);

  edit(groupId: string | number, boardId: number, options?: BaseRequestOptions);

  editList(
    groupId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo,
  );

  lists(groupId: string | number, boardId: number, options?: Sudo);

  remove(groupId: string | number, boardId: number, options?: Sudo);

  removeList(groupId: string | number, boardId: number, listId: number, options?: Sudo);

  show(groupId: string | number, boardId: number, options?: Sudo);

  showList(groupId: string | number, boardId: number, listId: number, options?: Sudo);
}

export class GroupIssueBoards<C extends boolean = false> extends ResourceIssueBoards<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('groups', options);
  }
}
