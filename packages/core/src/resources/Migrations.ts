import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestSearchParams, RequestHelper, endpoint } from '../infrastructure';

export type MigrationStatus = 'created' | 'started' | 'finished' | 'failed';

export interface MigrationEntityFailure {
  pipeline_class: string;
  pipeline_step: string;
  exception_class: string;
  correlation_id_value: string;
  created_at: string;
}

export interface MigrationEntitySchema extends Record<string, unknown> {
  id: number;
  bulk_import_id: number;
  status: string;
  source_full_path: string;
  destination_name: string;
  destination_namespace: string;
  parent_id?: number;
  namespace_id: number;
  project_id?: string | number;
  created_at: string;
  updated_at: string;
  failures?: MigrationEntityFailure[];
}

export interface MigrationStatusSchema extends Record<string, unknown> {
  id: number;
  status: string;
  source_type: string;
  created_at: string;
  updated_at: string;
}

export type MigrationEntityOptions = {
  sourceType: string;
  sourceFullPath: string;
  destinationSlug: string;
  destinationNamespace: string;
};

export class Migrations<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      status?: MigrationStatus;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MigrationStatusSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MigrationStatusSchema[]>()(this, 'bulk_imports', {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  create<E extends boolean = false>(
    configuration: { url: string; access_token: string },
    entities: MigrationEntityOptions[],
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MigrationStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MigrationStatusSchema>()(this, 'bulk_imports', {
      sudo,
      showExpanded,
      body: {
        ...body,
        configuration,
        entities,
      },
    });
  }

  allEntities<E extends boolean = false>({
    bulkImportId,
    sudo,
    showExpanded,
    maxPages,
    ...searchParams
  }: {
    status?: MigrationStatus;
    bulkImportId?: number;
  } & BaseRequestSearchParams &
    PaginationRequestOptions<'offset'> &
    ShowExpanded<E> &
    Sudo = {}): Promise<GitlabAPIResponse<MigrationEntitySchema[], C, E, 'offset'>> {
    const url = bulkImportId
      ? endpoint`bulk_imports/${bulkImportId}/entities`
      : 'bulk_imports/entities';

    return RequestHelper.get<MigrationEntitySchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  show<E extends boolean = false>(
    bulkImportId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MigrationStatusSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MigrationStatusSchema>()(this, `bulk_imports/${bulkImportId}`, {
      sudo,
      showExpanded,
    });
  }

  showEntity<E extends boolean = false>(
    bulkImportId: number,
    entityId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MigrationEntitySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MigrationEntitySchema>()(
      this,
      `bulk_imports/${bulkImportId}/entities/${entityId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
