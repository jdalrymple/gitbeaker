import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { RepositoryStorageMoveSchema } from '../templates/ResourceRepositoryStorageMoves';
import type { ExpandedSnippetSchema } from './Snippets';

import { ResourceRepositoryStorageMoves } from '../templates';

export interface SnippetRepositoryStorageMoveSchema extends RepositoryStorageMoveSchema {
  snippet: Pick<
    ExpandedSnippetSchema,
    | 'id'
    | 'title'
    | 'description'
    | 'visibility'
    | 'updated_at'
    | 'created_at'
    | 'project_id'
    | 'web_url'
    | 'raw_url'
    | 'ssh_url_to_repo'
    | 'http_url_to_repo'
  >;
}

export interface SnippetRepositoryStorageMoves<C extends boolean = false>
  extends ResourceRepositoryStorageMoves<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { snippetId?: string | number } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SnippetRepositoryStorageMoveSchema[], C, E, P>>;

  show<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    repositoryStorageId: number,
    options?: { snippetId?: string | number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SnippetRepositoryStorageMoveSchema, C, E, P>>;

  create<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      snippetId?: string | number;
      sourceStorageName?: string;
      destinationStorageName?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SnippetRepositoryStorageMoveSchema | { message: string }, C, E, P>>;
}

export class SnippetRepositoryStorageMoves<
  C extends boolean = false,
> extends ResourceRepositoryStorageMoves<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('snippets', options);
  }
}
