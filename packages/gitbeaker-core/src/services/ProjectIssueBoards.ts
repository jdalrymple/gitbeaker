import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ProjectSchema } from './Projects';
import { ResourceIssueBoards, IssueBoardSchema, IssueBoardListSchema } from '../templates';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

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

export interface ProjectIssueBoards<C extends boolean = false> extends ResourceIssueBoards<C> {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, ProjectIssueBoardSchema>[]>;

  create(
    groupId: string | number,
    name: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, ProjectIssueBoardSchema>>;

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
  ): Promise<CamelizedRecord<C, ProjectIssueBoardSchema>>;

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
  ): Promise<CamelizedRecord<C, ProjectIssueBoardSchema>>;

  showList(
    groupId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, IssueBoardListSchema>>;
}

export class ProjectIssueBoards<C extends boolean = false> extends ResourceIssueBoards<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
