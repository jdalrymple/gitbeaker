import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface RepositoryStorageMoveSchema extends Record<string, unknown> {
  id: number;
  created_at: string;
  state:
    | 'initial'
    | 'scheduled'
    | 'started'
    | 'replicated'
    | 'failed'
    | 'finished'
    | 'cleanup failed';
  source_storage_name: string;
  destination_storage_name: string;
}

export class ResourceRepositoryStorageMoves<C extends boolean = false> extends BaseResource<C> {
  protected resourceType: string;

  protected resourceTypeSingular: string;

  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super(options);

    this.resourceType = resourceType;
    this.resourceTypeSingular = resourceType.substring(0, resourceType.length - 1);
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RepositoryStorageMoveSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};
    const resourceId = searchParams?.[`${this.resourceTypeSingular}Id`] as string | number;
    const url = resourceId
      ? endpoint`${this.resourceType}/${resourceId}/repository_storage_moves`
      : `${this.resourceTypeSingular}_repository_storage_moves`;

    return RequestHelper.get<RepositoryStorageMoveSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  show<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    repositoryStorageId: number,
    options?: BaseRequestSearchParams & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RepositoryStorageMoveSchema, C, E, P>> {
    const { sudo, showExpanded, ...searchParams } = options || {};
    const resourceId = searchParams?.[`${this.resourceTypeSingular}Id`] as string | number;
    const url = resourceId
      ? endpoint`${this.resourceType}/${resourceId}/repository_storage_moves`
      : `${this.resourceTypeSingular}_repository_storage_moves`;

    return RequestHelper.get<RepositoryStorageMoveSchema>()(this, `${url}/${repositoryStorageId}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  schedule<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    sourceStorageName: string,
    options?: { destinationStorageName?: string } & BaseRequestSearchParams &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RepositoryStorageMoveSchema, C, E, P>> {
    const { sudo, showExpanded, ...body } = options || {};
    const resourceId = body?.[`${this.resourceTypeSingular}Id`] as string | number;
    const url = resourceId
      ? endpoint`${this.resourceType}/${resourceId}/repository_storage_moves`
      : `${this.resourceTypeSingular}_repository_storage_moves`;

    return RequestHelper.post<RepositoryStorageMoveSchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        ...body,
        sourceStorageName,
      },
    });
  }
}
