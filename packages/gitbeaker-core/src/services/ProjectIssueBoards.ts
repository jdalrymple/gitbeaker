import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceIssueBoards } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectIssueBoards<C extends boolean = false> extends ResourceIssueBoards() {
  all(projectId: string | number, options?: PaginatedRequestOptions);

  create(projectId: string | number, name: string, options?: Sudo);

  createList(projectId: string | number, boardId: number, labelId: number, options?: Sudo);

  edit(projectId: string | number, boardId: number, options?: BaseRequestOptions);

  editList(
    projectId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo,
  );

  lists(projectId: string | number, boardId: number, options?: Sudo);

  remove(projectId: string | number, boardId: number, options?: Sudo);

  removeList(projectId: string | number, boardId: number, listId: number, options?: Sudo);

  show(projectId: string | number, boardId: number, options?: Sudo);

  showList(projectId: string | number, boardId: number, listId: number, options?: Sudo);
}

export class ProjectIssueBoards<C extends boolean = false> extends ResourceIssueBoards() {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
