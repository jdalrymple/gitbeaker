import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ProjectSchema } from './Projects';
import { ResourceIssueBoards, IssueBoardSchema, IssueBoardListSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectIssueBoardSchema extends IssueBoardSchema {
  project: Pick<
    ProjectSchema,
    | 'id'
    | 'name'
    | 'name_with_namespace'
    | 'path'
    | 'path_with_namespace'
    | 'http_url_to_repo'
    | 'web_url'
  >;
}

export interface ProjectIssueBoards extends ResourceIssueBoards {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<ProjectIssueBoardSchema[]>;

  create(groupId: string | number, name: string, options?: Sudo): Promise<ProjectIssueBoardSchema>;

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
  ): Promise<ProjectIssueBoardSchema>;

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

  show(groupId: string | number, boardId: number, options?: Sudo): Promise<ProjectIssueBoardSchema>;

  showList(
    groupId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo,
  ): Promise<IssueBoardListSchema>;
}

export class ProjectIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
