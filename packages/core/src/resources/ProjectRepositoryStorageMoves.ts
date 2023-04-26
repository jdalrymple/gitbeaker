import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceRepositoryStorageMoves } from '../templates';
import type { RepositoryStorageMoveSchema } from '../templates/ResourceRepositoryStorageMoves';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';

export interface ProjectRepositoryStorageMoveSchema extends RepositoryStorageMoveSchema {
  project: SimpleProjectSchema;
}

export interface ProjectRepositoryStorageMoves<C extends boolean = false>
  extends ResourceRepositoryStorageMoves<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { projectId?: string | number } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectRepositoryStorageMoveSchema[], C, E, P>>;

  show<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    repositoryStorageId: number,
    options?: { projectId?: string | number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectRepositoryStorageMoveSchema, C, E, P>>;

  schedule<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    sourceStorageName: string,
    options?: { projectId?: string | number; destinationStorageName } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectRepositoryStorageMoveSchema, C, E, P>>;
}

export class ProjectRepositoryStorageMoves<
  C extends boolean = false,
> extends ResourceRepositoryStorageMoves<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
