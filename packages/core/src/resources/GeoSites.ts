import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface GeoSiteSchema extends Record<string, unknown> {
  id: number;
  name: string;
  url: string;
  internal_url: string;
  primary: boolean;
  enabled: boolean;
  current: boolean;
  files_max_capacity: number;
  repos_max_capacity: number;
  verification_max_capacity: number;
  selective_sync_type: string;
  selective_sync_shards?: string[];
  selective_sync_namespace_ids?: number[];
  minimum_reverification_interval: number;
  sync_object_storage: boolean;
  web_edit_url: string;
  web_geo_projects_url: string;
  _links: {
    self: string;
    status: string;
    repair: string;
  };
}

export interface GeoSiteStatusSchema extends Record<string, unknown> {
  geo_node_id: number;
  repository_verification_enabled: boolean;
  repositories_replication_enabled?: boolean;
  repositories_synced_count: number | null;
  repositories_failed_count: number | null;
  repositories_verified_count: number | null;
  repositories_verification_failed_count: number | null;
  repositories_verification_total_count: number | null;
  job_artifacts_synced_missing_on_primary_count: number | null;
  repositories_checksummed_count: number | null;
  repositories_checksum_failed_count: number | null;
  repositories_checksum_mismatch_count: number | null;
  repositories_checksum_total_count: number | null;
  repositories_retrying_verification_count: number | null;
  projects_count: number | null;
  container_repositories_replication_enabled: boolean | null;
  lfs_objects_count: number;
  lfs_objects_checksum_total_count: number;
  lfs_objects_checksummed_count: number;
  lfs_objects_checksum_failed_count: number;
  lfs_objects_synced_count: number | null;
  lfs_objects_failed_count: number | null;
  lfs_objects_registry_count: number | null;
  lfs_objects_verification_total_count: number | null;
  lfs_objects_verified_count: number | null;
  lfs_objects_verification_failed_count?: number | null;
  merge_request_diffs_count: number;
  merge_request_diffs_checksum_total_count: number;
  merge_request_diffs_checksummed_count: number;
  merge_request_diffs_checksum_failed_count: number;
  merge_request_diffs_synced_count: number | null;
  merge_request_diffs_failed_count: number | null;
  merge_request_diffs_registry_count: number | null;
  merge_request_diffs_verification_total_count: number | null;
  merge_request_diffs_verified_count: number | null;
  merge_request_diffs_verification_failed_count: number | null;
  package_files_count: number;
  package_files_checksum_total_count: number;
  package_files_checksummed_count: number;
  package_files_checksum_failed_count: number;
  package_files_synced_count: number | null;
  package_files_failed_count: number | null;
  package_files_registry_count: number | null;
  package_files_verification_total_count: number | null;
  package_files_verified_count: number | null;
  package_files_verification_failed_count: number | null;
  terraform_state_versions_count: number;
  terraform_state_versions_checksum_total_count: number;
  terraform_state_versions_checksummed_count: number;
  terraform_state_versions_checksum_failed_count: number;
  terraform_state_versions_synced_count: number | null;
  terraform_state_versions_failed_count: number | null;
  terraform_state_versions_registry_count: number | null;
  terraform_state_versions_verification_total_count: number | null;
  terraform_state_versions_verified_count: number | null;
  terraform_state_versions_verification_failed_count: number | null;
  snippet_repositories_count: number;
  snippet_repositories_checksum_total_count: number;
  snippet_repositories_checksummed_count: number;
  snippet_repositories_checksum_failed_count: number;
  snippet_repositories_synced_count: number | null;
  snippet_repositories_failed_count: number | null;
  snippet_repositories_registry_count: number | null;
  snippet_repositories_verification_total_count: number | null;
  snippet_repositories_verified_count: number | null;
  snippet_repositories_verification_failed_count: number | null;
  group_wiki_repositories_count: number;
  group_wiki_repositories_checksum_total_count: number | null;
  group_wiki_repositories_checksummed_count: number | null;
  group_wiki_repositories_checksum_failed_count: number | null;
  group_wiki_repositories_synced_count: number | null;
  group_wiki_repositories_failed_count: number | null;
  group_wiki_repositories_registry_count: number | null;
  group_wiki_repositories_verification_total_count: number | null;
  group_wiki_repositories_verified_count: number | null;
  group_wiki_repositories_verification_failed_count: number | null;
  pipeline_artifacts_count: number;
  pipeline_artifacts_checksum_total_count: number;
  pipeline_artifacts_checksummed_count: number;
  pipeline_artifacts_checksum_failed_count: number;
  pipeline_artifacts_synced_count: number | null;
  pipeline_artifacts_failed_count: number | null;
  pipeline_artifacts_registry_count: number | null;
  pipeline_artifacts_verification_total_count: number | null;
  pipeline_artifacts_verified_count: number | null;
  pipeline_artifacts_verification_failed_count: number | null;
  pages_deployments_count: number;
  pages_deployments_checksum_total_count: number;
  pages_deployments_checksummed_count: number;
  pages_deployments_checksum_failed_count: number;
  pages_deployments_synced_count: number | null;
  pages_deployments_failed_count: number | null;
  pages_deployments_registry_count: number | null;
  pages_deployments_verification_total_count: number | null;
  pages_deployments_verified_count: number | null;
  pages_deployments_verification_failed_count: number | null;
  uploads_count: number;
  uploads_checksum_total_count: number;
  uploads_checksummed_count: number;
  uploads_checksum_failed_count: number;
  uploads_synced_count: number | null;
  uploads_failed_count: number | null;
  uploads_registry_count: number | null;
  uploads_verification_total_count: number | null;
  uploads_verified_count: number | null;
  uploads_verification_failed_count: number | null;
  job_artifacts_count: number;
  job_artifacts_checksum_total_count: number;
  job_artifacts_checksummed_count: number;
  job_artifacts_checksum_failed_count: number;
  job_artifacts_synced_count: number | null;
  job_artifacts_failed_count: number | null;
  job_artifacts_registry_count: number | null;
  job_artifacts_verification_total_count: number | null;
  job_artifacts_verified_count: number | null;
  job_artifacts_verification_failed_count: number | null;
  ci_secure_files_count: number;
  ci_secure_files_checksum_total_count: number;
  ci_secure_files_checksummed_count: number;
  ci_secure_files_checksum_failed_count: number;
  ci_secure_files_synced_count: number | null;
  ci_secure_files_failed_count: number | null;
  ci_secure_files_registry_count: number | null;
  ci_secure_files_verification_total_count: number | null;
  ci_secure_files_verified_count: number | null;
  ci_secure_files_verification_failed_count: number | null;
  container_repositories_count: number;
  container_repositories_checksum_total_count: number;
  container_repositories_checksummed_count: number;
  container_repositories_checksum_failed_count: number;
  container_repositories_synced_count: number | null;
  container_repositories_failed_count: number | null;
  container_repositories_registry_count: number | null;
  container_repositories_verification_total_count: number | null;
  container_repositories_verified_count: number | null;
  container_repositories_verification_failed_count: number | null;
  dependency_proxy_blobs_count: number;
  dependency_proxy_blobs_checksum_total_count: number;
  dependency_proxy_blobs_checksummed_count: number;
  dependency_proxy_blobs_checksum_failed_count: number;
  dependency_proxy_blobs_synced_count: number | null;
  dependency_proxy_blobs_failed_count: number | null;
  dependency_proxy_blobs_registry_count: number | null;
  dependency_proxy_blobs_verification_total_count: number | null;
  dependency_proxy_blobs_verified_count: number | null;
  dependency_proxy_blobs_verification_failed_count: number | null;
  dependency_proxy_manifests_count: number;
  dependency_proxy_manifests_checksum_total_count: number;
  dependency_proxy_manifests_checksummed_count: number;
  dependency_proxy_manifests_checksum_failed_count: number;
  dependency_proxy_manifests_synced_count: number | null;
  dependency_proxy_manifests_failed_count: number | null;
  dependency_proxy_manifests_registry_count: number | null;
  dependency_proxy_manifests_verification_total_count: number | null;
  dependency_proxy_manifests_verified_count: number | null;
  dependency_proxy_manifests_verification_failed_count: number | null;
  project_wiki_repositories_count: number;
  project_wiki_repositories_checksum_total_count: number;
  project_wiki_repositories_checksummed_count: number;
  project_wiki_repositories_checksum_failed_count: number;
  project_wiki_repositories_synced_count: number | null;
  project_wiki_repositories_failed_count: number | null;
  project_wiki_repositories_registry_count: number | null;
  project_wiki_repositories_verification_total_count: number | null;
  project_wiki_repositories_verified_count: number | null;
  project_wiki_repositories_verification_failed_count: number | null;
  git_fetch_event_count_weekly: number | null;
  git_push_event_count_weekly: number | null;
  proxy_remote_requests_event_count_weekly: number | null;
  proxy_local_requests_event_count_weekly: number | null;
  repositories_synced_in_percentage: string;
  repositories_checksummed_in_percentage: string;
  repositories_verified_in_percentage: string;
  repositories_checked_in_percentage: string;
  replication_slots_used_in_percentage: string;
  lfs_objects_synced_in_percentage: string;
  lfs_objects_verified_in_percentage: string;
  merge_request_diffs_synced_in_percentage: string;
  merge_request_diffs_verified_in_percentage: string;
  package_files_synced_in_percentage: string;
  package_files_verified_in_percentage: string;
  terraform_state_versions_synced_in_percentage: string;
  terraform_state_versions_verified_in_percentage: string;
  snippet_repositories_synced_in_percentage: string;
  snippet_repositories_verified_in_percentage: string;
  group_wiki_repositories_synced_in_percentage: string;
  group_wiki_repositories_verified_in_percentage: string;
  pipeline_artifacts_synced_in_percentage: string;
  pipeline_artifacts_verified_in_percentage: string;
  pages_deployments_synced_in_percentage: string;
  pages_deployments_verified_in_percentage: string;
  uploads_synced_in_percentage: string;
  uploads_verified_in_percentage: string;
  job_artifacts_synced_in_percentage: string;
  job_artifacts_verified_in_percentage: string;
  ci_secure_files_synced_in_percentage: string;
  ci_secure_files_verified_in_percentage: string;
  container_repositories_synced_in_percentage: string;
  container_repositories_verified_in_percentage: string;
  dependency_proxy_blobs_synced_in_percentage: string;
  dependency_proxy_blobs_verified_in_percentage: string;
  dependency_proxy_manifests_synced_in_percentage: string;
  dependency_proxy_manifests_verified_in_percentage: string;
  project_wiki_repositories_synced_in_percentage: string;
  project_wiki_repositories_verified_in_percentage: string;
  repositories_count: number;
  replication_slots_count: number;
  replication_slots_used_count: number;
  healthy: boolean;
  health: string;
  health_status: string;
  missing_oauth_application: boolean;
  db_replication_lag_seconds: number | null;
  replication_slots_max_retained_wal_bytes: number;
  repositories_checked_count: number | null;
  repositories_checked_failed_count: number | null;
  last_event_id: number;
  last_event_timestamp: number;
  cursor_last_event_id: number | null;
  cursor_last_event_timestamp: number;
  last_successful_status_check_timestamp: number;
  version: string;
  revision: string;
  selective_sync_type: string | null;
  namespaces: string[] | null;
  updated_at: string;
  storage_shards_match: boolean;
  _links: {
    self: string;
    site: string;
  };
}

export interface GeoSiteFailureSchema extends Record<string, unknown> {
  project_id: number;
  last_repository_synced_at: string;
  last_repository_successful_sync_at: string;
  last_wiki_synced_at: string;
  last_wiki_successful_sync_at: string;
  repository_retry_count: number | null;
  wiki_retry_count: number;
  last_repository_sync_failure: string | null;
  last_wiki_sync_failure: string;
  last_repository_verification_failure: string;
  last_wiki_verification_failure: string;
  repository_verification_checksum_sha: string;
  wiki_verification_checksum_sha: string;
  repository_checksum_mismatch: boolean;
  wiki_checksum_mismatch: boolean;
}

export type CreateGeoSiteOptions = {
  primary?: boolean;
  enabled?: boolean;
  internalUrl?: string;
  filesMaxCapacity?: number;
  reposMaxCapacity?: number;
  verificationMaxCapacity?: number;
  containerRepositoriesMaxCapacity?: number;
  syncObjectStorage?: boolean;
  selectiveSyncType?: 'namespaces' | 'shards';
  selectiveSyncShards?: string[];
  selectiveSyncNamespaceIds?: number[];
  minimumReverificationInterval?: number;
};

export type EditGeoSiteOptions = CreateGeoSiteOptions;

export class GeoSites<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GeoSiteSchema[], C, E, P>> {
    return RequestHelper.get<GeoSiteSchema[]>()(this, 'geo_sites', options);
  }

  allStatuses<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GeoSiteStatusSchema[], C, E, P>> {
    return RequestHelper.get<GeoSiteStatusSchema[]>()(this, 'geo_sites/statuses', options);
  }

  allFailures<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GeoSiteFailureSchema[], C, E, P>> {
    return RequestHelper.get<GeoSiteFailureSchema[]>()(this, 'geo_sites/current/failures', options);
  }

  create<E extends boolean = false>(
    name: string,
    url: string,
    options?: CreateGeoSiteOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GeoSiteSchema, C, E, void>> {
    return RequestHelper.post<GeoSiteSchema>()(this, 'geo_sites', { name, url, ...options });
  }

  edit<E extends boolean = false>(
    geositeId: number,
    options?: EditGeoSiteOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GeoSiteSchema, C, E, void>> {
    return RequestHelper.put<GeoSiteSchema>()(this, `geo_sites/${geositeId}`, options);
  }

  repair<E extends boolean = false>(
    geositeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GeoSiteSchema, C, E, void>> {
    return RequestHelper.post<GeoSiteSchema>()(this, `geo_sites/${geositeId}/repair`, options);
  }

  remove<E extends boolean = false>(
    geositeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, `geo_sites/${geositeId}`, options);
  }

  show<E extends boolean = false>(
    geositeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GeoSiteSchema, C, E, void>> {
    return RequestHelper.get<GeoSiteSchema>()(this, `geo_sites/${geositeId}`, options);
  }

  showStatus<E extends boolean = false>(
    geositeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GeoSiteStatusSchema, C, E, void>> {
    return RequestHelper.get<GeoSiteStatusSchema>()(this, `geo_sites/${geositeId}/status`, options);
  }
}
