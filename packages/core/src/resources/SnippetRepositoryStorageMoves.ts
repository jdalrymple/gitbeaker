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
import type { SnippetSchema } from './Snippets';

export interface SnippetRepositoryStorageMoveSchema extends RepositoryStorageMoveSchema {
  snippet: Pick<
    SnippetSchema,
    | 'id'
    | 'title'
    | 'description'
    | 'visibility'
    | 'updated_at'
    | 'created_at'
    | 'created_at'
    | 'web_url'
    | 'raw_url'
    | 'ssh_url_to_repo'
    | 'http_url_to_repo'
  >;
}

export interface SnippetRepositoryStorageMoves<C extends boolean = false>
  extends ResourceRepositoryStorageMoves<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { snippetId?: string | number } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<SnippetRepositoryStorageMoveSchema[], C, E, P>>;

  show<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    repositoryStorageId: number,
    options?: { snippetId?: string | number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SnippetRepositoryStorageMoveSchema, C, E, P>>;

  schedule<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    sourceStorageName: string,
    options?: { snippetId?: string | number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SnippetRepositoryStorageMoveSchema, C, E, P>>;
}

export class SnippetRepositoryStorageMoves<
  C extends boolean = false,
> extends ResourceRepositoryStorageMoves<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('snippets', options);
  }
}
