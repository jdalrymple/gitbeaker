import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
  Camelize,
} from '../infrastructure';

import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface BulkImportConfigurationSchema extends Record<string, unknown> {
  url: string;
  access_token: string;
}

export interface BulkImportEntitySchema extends Record<string, unknown> {
  source_type: 'group_entity' | 'project_entity';
  source_full_path: string;
  destination_slug: string;
  destination_namespace: string;
  destination_name?: string;
  migrate_memberships?: boolean;
  migrate_projects?: boolean;
}

export interface BulkImportFailureSchema extends Record<string, unknown> {
  relation: string;
  step: string;
  exception_message: string;
  exception_class: string;
  correlation_id_value: string;
  created_at: string;
  pipeline_class: string;
  pipeline_step: string;
  source_url?: string;
  source_title?: string;
}

export interface BulkImportStatsSchema extends Record<string, unknown> {
  [key: string]: {
    source: number;
    fetched: number;
    imported: number;
  };
}

export interface BulkImportSchema extends Record<string, unknown> {
  id: number;
  status: 'created' | 'started' | 'finished' | 'failed' | 'canceled';
  source_type: string;
  source_url?: string;
  created_at: string;
  updated_at: string;
  has_failures: boolean;
}

export interface BulkImportEntityFullSchema extends Record<string, unknown> {
  id: number;
  bulk_import_id: number;
  status: 'created' | 'started' | 'finished' | 'failed';
  entity_type: 'group' | 'project';
  source_full_path: string;
  destination_full_path: string;
  destination_name: string;
  destination_slug: string;
  destination_namespace: string;
  parent_id?: number | null;
  namespace_id?: number | null;
  project_id?: number | null;
  created_at: string;
  updated_at: string;
  failures: BulkImportFailureSchema[];
  migrate_projects: boolean;
  migrate_memberships: boolean;
  has_failures: boolean;
  stats: BulkImportStatsSchema;
}

export type BulkImportStatus = 'created' | 'started' | 'finished' | 'failed';

export class BulkImports<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    configuration: Camelize<BulkImportConfigurationSchema>,
    entities: Camelize<BulkImportEntitySchema>[],
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BulkImportSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<BulkImportSchema>()(this, 'bulk_imports', {
      sudo,
      showExpanded,
      body: {
        configuration,
        entities,
      },
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { status?: BulkImportStatus } & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BulkImportSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<BulkImportSchema[]>()(this, 'bulk_imports', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
    });
  }

  allEntities<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      status?: BulkImportStatus;
      bulkImportId?: string | number;
    } & PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<BulkImportEntityFullSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, bulkImportId, ...searchParams } = options || {};

    const url = getPrefixedUrl('entities', {
      bulk_imports: bulkImportId || true,
    });

    return RequestHelper.get<BulkImportEntityFullSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
    });
  }

  show<E extends boolean = false>(
    bulkImportId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BulkImportSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<BulkImportSchema>()(this, endpoint`bulk_imports/${bulkImportId}`, {
      sudo,
      showExpanded,
    });
  }

  showEntity<E extends boolean = false>(
    bulkImportId: number,
    entityId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BulkImportEntityFullSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<BulkImportEntityFullSchema>()(
      this,
      endpoint`bulk_imports/${bulkImportId}/entities/${entityId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showEntityFailures<E extends boolean = false>(
    bulkImportId: number,
    entityId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BulkImportFailureSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<BulkImportFailureSchema>()(
      this,
      endpoint`bulk_imports/${bulkImportId}/entities/${entityId}/failures`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  cancel<E extends boolean = false>(
    bulkImportId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BulkImportSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<BulkImportSchema>()(
      this,
      endpoint`bulk_imports/${bulkImportId}/cancel`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
