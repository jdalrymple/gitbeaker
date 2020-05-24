import { ResourceIssueBoards } from '../templates';
import {
  BaseServiceOptions,
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
} from '../infrastructure';

export interface GroupIssueBoards extends ResourceIssueBoards {
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

export class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
