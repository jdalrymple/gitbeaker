import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceIssueBoards } from '../templates';
import { IssueBoardListSchema, IssueBoardSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';

export interface ProjectIssueBoardSchema extends IssueBoardSchema {
  project: SimpleProjectSchema;
}

export interface ProjectIssueBoards<C extends boolean = false> extends ResourceIssueBoards<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectIssueBoardSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectIssueBoardSchema, C, E, void>>;

  createList<E extends boolean = false>(
    projectId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    boardId: number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectIssueBoardSchema, C, E, void>>;

  editList<E extends boolean = false>(
    projectId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>>;

  alllists<E extends boolean = false>(
    projectId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema[], C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  removeList<E extends boolean = false>(
    projectId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    boardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectIssueBoardSchema, C, E, void>>;

  showList<E extends boolean = false>(
    projectId: string | number,
    boardId: number,
    listId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueBoardListSchema, C, E, void>>;
}

export class ProjectIssueBoards<C extends boolean = false> extends ResourceIssueBoards<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
