import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export type DataModelName =
  | 'ci_job_artifacts'
  | 'ci_pipeline_artifacts'
  | 'ci_secure_files'
  | 'container_repositories'
  | 'dependency_proxy_blobs'
  | 'dependency_proxy_manifests'
  | 'design_management_repositories'
  | 'group_wiki_repositories'
  | 'lfs_objects'
  | 'merge_request_diffs'
  | 'packages_nuget_symbols'
  | 'packages_package_files'
  | 'pages_deployments'
  | 'projects'
  | 'projects_wiki_repositories'
  | 'snippet_repositories'
  | 'supply_chain_attestations'
  | 'terraform_state_versions'
  | 'uploads';

export type ChecksumState = 'pending' | 'started' | 'succeeded' | 'failed' | 'disabled';

export interface ChecksumInformationSchema extends Record<string, unknown> {
  checksum?: string;
  last_checksum?: string;
  checksum_state: ChecksumState;
  checksum_retry_count: number;
  checksum_retry_at?: string | null;
  checksum_failure?: string | null;
}

export interface DataModelRecordSchema extends Record<string, unknown> {
  record_identifier: string | number;
  model_class: string;
  created_at?: string;
  file_size?: number | null;
  checksum_information?: ChecksumInformationSchema;
}

export interface ChecksumOperationResultSchema extends Record<string, unknown> {
  status: 'success' | 'error';
  message: string;
}

export class DataManagement<C extends boolean = false> extends BaseResource<C> {
  allRecords<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    modelName: DataModelName,
    options?: {
      checksumState?: ChecksumState;
      identifiers?: (string | number)[];
      sort?: 'asc' | 'desc';
    } & PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<DataModelRecordSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<DataModelRecordSchema[]>()(
      this,
      endpoint`admin/data_management/${modelName}`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams
      },
    );
  }

  recalculateChecksums<E extends boolean = false>(
    modelName: DataModelName,
    options?: {
      checksumState?: ChecksumState;
      identifiers?: (string | number)[];
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ChecksumOperationResultSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ChecksumOperationResultSchema>()(
      this,
      endpoint`admin/data_management/${modelName}/checksum`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  showRecord<E extends boolean = false>(
    modelName: DataModelName,
    recordIdentifier: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DataModelRecordSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<DataModelRecordSchema>()(
      this,
      endpoint`admin/data_management/${modelName}/${recordIdentifier}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  recalculateRecordChecksum<E extends boolean = false>(
    modelName: DataModelName,
    recordIdentifier: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DataModelRecordSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<DataModelRecordSchema>()(
      this,
      endpoint`admin/data_management/${modelName}/${recordIdentifier}/checksum`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}