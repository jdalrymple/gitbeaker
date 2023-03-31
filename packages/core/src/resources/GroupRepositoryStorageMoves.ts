import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceRepositoryStorageMoves } from '../templates';
import type { RepositoryStorageMoveSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { GroupSchema } from './Groups';

export interface GroupRepositoryStorageMoveSchema extends RepositoryStorageMoveSchema {
  group: Pick<GroupSchema, 'id' | 'web_url' | 'name'>;
}

export interface GroupRepositoryStorageMoves<C extends boolean = false>
  extends ResourceRepositoryStorageMoves<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { groupId?: string | number } & PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupRepositoryStorageMoveSchema[], C, E, P>>;

  show<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    repositoryStorageId: number,
    options?: { groupId?: string | number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupRepositoryStorageMoveSchema, C, E, P>>;

  schedule<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    sourceStorageName: string,
    options?: { groupId?: string | number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupRepositoryStorageMoveSchema, C, E, P>>;
}

export class GroupRepositoryStorageMoves<
  C extends boolean = false,
> extends ResourceRepositoryStorageMoves<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
