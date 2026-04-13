import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface SearchMigrationSchema extends Record<string, unknown> {
  version: number;
  name: string;
  started_at: string;
  completed_at: string;
  completed: boolean;
  obsolete: boolean;
  migration_state: {
    task_id: string | null;
    pause_indexing?: boolean;
    slice?: number;
    max_slices?: number;
    retry_attempt?: number;
    permutation_idx?: number;
    documents_remaining?: number;
    documents_remaining_for_permutation?: number;
  };
}

export class SearchAdmin<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SearchMigrationSchema, C, E, void>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SearchMigrationSchema>()(this, 'admin/search/migrations', {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  show<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    versionOrName: string,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SearchMigrationSchema, C, E, void>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SearchMigrationSchema>()(
      this,
      endpoint`admin/search/migrations/${versionOrName}`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }
}
