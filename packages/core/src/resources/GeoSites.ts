import { BaseResource } from '@gitbeaker/requester-utils';

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

import { endpoint, RequestHelper } from '../infrastructure';

export interface GeoSiteCreateOptions {
  primary?: boolean;
  enabled?: boolean;
  name: string;
  url: string;
  internal_url?: string;
  files_max_capacity?: number;
  repos_max_capacity?: number;
  verification_max_capacity?: number;
  container_repositories_max_capacity?: number;
  sync_object_storage?: boolean;
  selective_sync_type?: 'namespaces' | 'shards' | null;
  selective_sync_shards?: string[];
  selective_sync_namespace_ids?: number[];
  minimum_reverification_interval?: number;
  blob_download_timeout?: number;
}

export interface GeoSiteUpdateOptions {
  enabled?: boolean;
  name?: string;
  url?: string;
  internal_url?: string;
  files_max_capacity?: number;
  repos_max_capacity?: number;
  verification_max_capacity?: number;
  container_repositories_max_capacity?: number;
  selective_sync_type?: 'namespaces' | 'shards' | null;
  selective_sync_shards?: string[];
  selective_sync_namespace_ids?: number[];
  minimum_reverification_interval?: number;
  blob_download_timeout?: number;
}

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
  container_repositories_max_capacity: number;
  selective_sync_type: 'namespaces' | 'shards' | null;
  selective_sync_shards: string[];
  selective_sync_namespace_ids: number[];
  minimum_reverification_interval: number;
  sync_object_storage?: boolean;
  blob_download_timeout?: number;
  web_edit_url: string;
  web_geo_replication_details_url?: string;
  _links: {
    self: string;
    status: string;
    repair: string;
  };
}

export interface GeoSiteStatusSchema extends Record<string, unknown> {
  geo_node_id: number;
  projects_count: number | null;
  container_repositories_replication_enabled: boolean | null;
  ci_secure_files_count: number;
  ci_secure_files_checksum_total_count: number | null;
  ci_secure_files_checksummed_count: number | null;
  ci_secure_files_checksum_failed_count: number | null;
  ci_secure_files_synced_count: number | null;
  ci_secure_files_failed_count: number | null;
  ci_secure_files_registry_count: number | null;
  ci_secure_files_verification_total_count: number | null;
  ci_secure_files_verified_count: number | null;
  ci_secure_files_verification_failed_count: number | null;
  container_repositories_count: number;
  container_repositories_checksum_total_count: number | null;
  container_repositories_checksummed_count: number | null;
  container_repositories_checksum_failed_count: number | null;
  container_repositories_synced_count: number | null;
  container_repositories_failed_count: number | null;
  container_repositories_registry_count: number | null;
  container_repositories_verification_total_count: number | null;
  container_repositories_verified_count: number | null;
  container_repositories_verification_failed_count: number | null;
  dependency_proxy_blobs_count: number;
  dependency_proxy_blobs_checksum_total_count: number | null;
  dependency_proxy_blobs_checksummed_count: number | null;
  dependency_proxy_blobs_checksum_failed_count: number | null;
  dependency_proxy_blobs_synced_count: number | null;
  dependency_proxy_blobs_failed_count: number | null;
  dependency_proxy_blobs_registry_count: number | null;
  dependency_proxy_blobs_verification_total_count: number | null;
  dependency_proxy_blobs_verified_count: number | null;
  dependency_proxy_blobs_verification_failed_count: number | null;
  dependency_proxy_manifests_count: number;
  dependency_proxy_manifests_checksum_total_count: number | null;
  dependency_proxy_manifests_checksummed_count: number | null;
  dependency_proxy_manifests_checksum_failed_count: number | null;
  dependency_proxy_manifests_synced_count: number | null;
  dependency_proxy_manifests_failed_count: number | null;
  dependency_proxy_manifests_registry_count: number | null;
  dependency_proxy_manifests_verification_total_count: number | null;
  dependency_proxy_manifests_verified_count: number | null;
  dependency_proxy_manifests_verification_failed_count: number | null;
  design_management_repositories_count: number;
  design_management_repositories_checksum_total_count: number | null;
  design_management_repositories_checksummed_count: number | null;
  design_management_repositories_checksum_failed_count: number | null;
  design_management_repositories_synced_count: number | null;
  design_management_repositories_failed_count: number | null;
  design_management_repositories_registry_count: number | null;
  design_management_repositories_verification_total_count: number | null;
  design_management_repositories_verified_count: number | null;
  design_management_repositories_verification_failed_count: number | null;
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
  job_artifacts_count: number;
  job_artifacts_checksum_total_count: number | null;
  job_artifacts_checksummed_count: number | null;
  job_artifacts_checksum_failed_count: number | null;
  job_artifacts_synced_count: number | null;
  job_artifacts_failed_count: number | null;
  job_artifacts_registry_count: number | null;
  job_artifacts_verification_total_count: number | null;
  job_artifacts_verified_count: number | null;
  job_artifacts_verification_failed_count: number | null;
  lfs_objects_count: number;
  lfs_objects_checksum_total_count: number | null;
  lfs_objects_checksummed_count: number | null;
  lfs_objects_checksum_failed_count: number | null;
  lfs_objects_synced_count: number | null;
  lfs_objects_failed_count: number | null;
  lfs_objects_registry_count: number | null;
  lfs_objects_verification_total_count: number | null;
  lfs_objects_verified_count: number | null;
  lfs_objects_verification_failed_count: number | null;
  merge_request_diffs_count: number;
  merge_request_diffs_checksum_total_count: number | null;
  merge_request_diffs_checksummed_count: number | null;
  merge_request_diffs_checksum_failed_count: number | null;
  merge_request_diffs_synced_count: number | null;
  merge_request_diffs_failed_count: number | null;
  merge_request_diffs_registry_count: number | null;
  merge_request_diffs_verification_total_count: number | null;
  merge_request_diffs_verified_count: number | null;
  merge_request_diffs_verification_failed_count: number | null;
  package_files_count: number;
  package_files_checksum_total_count: number | null;
  package_files_checksummed_count: number | null;
  package_files_checksum_failed_count: number | null;
  package_files_synced_count: number | null;
  package_files_failed_count: number | null;
  package_files_registry_count: number | null;
  package_files_verification_total_count: number | null;
  package_files_verified_count: number | null;
  package_files_verification_failed_count: number | null;
  pages_deployments_count: number;
  pages_deployments_checksum_total_count: number | null;
  pages_deployments_checksummed_count: number | null;
  pages_deployments_checksum_failed_count: number | null;
  pages_deployments_synced_count: number | null;
  pages_deployments_failed_count: number | null;
  pages_deployments_registry_count: number | null;
  pages_deployments_verification_total_count: number | null;
  pages_deployments_verified_count: number | null;
  pages_deployments_verification_failed_count: number | null;
  pipeline_artifacts_count: number;
  pipeline_artifacts_checksum_total_count: number | null;
  pipeline_artifacts_checksummed_count: number | null;
  pipeline_artifacts_checksum_failed_count: number | null;
  pipeline_artifacts_synced_count: number | null;
  pipeline_artifacts_failed_count: number | null;
  pipeline_artifacts_registry_count: number | null;
  pipeline_artifacts_verification_total_count: number | null;
  pipeline_artifacts_verified_count: number | null;
  pipeline_artifacts_verification_failed_count: number | null;
  project_repositories_count: number;
  project_repositories_checksum_total_count: number | null;
  project_repositories_checksummed_count: number | null;
  project_repositories_checksum_failed_count: number | null;
  project_repositories_synced_count: number | null;
  project_repositories_failed_count: number | null;
  project_repositories_registry_count: number | null;
  project_repositories_verification_total_count: number | null;
  project_repositories_verified_count: number | null;
  project_repositories_verification_failed_count: number | null;
  project_wiki_repositories_count: number;
  project_wiki_repositories_checksum_total_count: number | null;
  project_wiki_repositories_checksummed_count: number | null;
  project_wiki_repositories_checksum_failed_count: number | null;
  project_wiki_repositories_synced_count: number | null;
  project_wiki_repositories_failed_count: number | null;
  project_wiki_repositories_registry_count: number | null;
  project_wiki_repositories_verification_total_count: number | null;
  project_wiki_repositories_verified_count: number | null;
  project_wiki_repositories_verification_failed_count: number | null;
  snippet_repositories_count: number;
  snippet_repositories_checksum_total_count: number | null;
  snippet_repositories_checksummed_count: number | null;
  snippet_repositories_checksum_failed_count: number | null;
  snippet_repositories_synced_count: number | null;
  snippet_repositories_failed_count: number | null;
  snippet_repositories_registry_count: number | null;
  snippet_repositories_verification_total_count: number | null;
  snippet_repositories_verified_count: number | null;
  snippet_repositories_verification_failed_count: number | null;
  terraform_state_versions_count: number;
  terraform_state_versions_checksum_total_count: number | null;
  terraform_state_versions_checksummed_count: number | null;
  terraform_state_versions_checksum_failed_count: number | null;
  terraform_state_versions_synced_count: number | null;
  terraform_state_versions_failed_count: number | null;
  terraform_state_versions_registry_count: number | null;
  terraform_state_versions_verification_total_count: number | null;
  terraform_state_versions_verified_count: number | null;
  terraform_state_versions_verification_failed_count: number | null;
  uploads_count: number;
  uploads_checksum_total_count: number | null;
  uploads_checksummed_count: number | null;
  uploads_checksum_failed_count: number | null;
  uploads_synced_count: number | null;
  uploads_failed_count: number | null;
  uploads_registry_count: number | null;
  uploads_verification_total_count: number | null;
  uploads_verified_count: number | null;
  uploads_verification_failed_count: number | null;
  abuse_report_uploads_count: number;
  abuse_report_uploads_checksum_total_count: number;
  abuse_report_uploads_checksummed_count: number;
  abuse_report_uploads_checksum_failed_count: number;
  abuse_report_uploads_synced_count: number | null;
  abuse_report_uploads_failed_count: number | null;
  abuse_report_uploads_registry_count: number | null;
  abuse_report_uploads_verification_total_count: number | null;
  abuse_report_uploads_verified_count: number | null;
  abuse_report_uploads_verification_failed_count: number | null;
  abuse_report_uploads_synced_in_percentage: string;
  abuse_report_uploads_verified_in_percentage: string;
  project_uploads_count: number;
  project_uploads_checksum_total_count: number;
  project_uploads_checksummed_count: number;
  project_uploads_checksum_failed_count: number;
  project_uploads_synced_count: number | null;
  project_uploads_failed_count: number | null;
  project_uploads_registry_count: number | null;
  project_uploads_verification_total_count: number | null;
  project_uploads_verified_count: number | null;
  project_uploads_verification_failed_count: number | null;
  project_uploads_synced_in_percentage: string;
  project_uploads_verified_in_percentage: string;
  group_uploads_count: number;
  group_uploads_checksum_total_count: number;
  group_uploads_checksummed_count: number;
  group_uploads_checksum_failed_count: number;
  group_uploads_synced_count: number | null;
  group_uploads_failed_count: number | null;
  group_uploads_registry_count: number | null;
  group_uploads_verification_total_count: number | null;
  group_uploads_verified_count: number | null;
  group_uploads_verification_failed_count: number | null;
  group_uploads_synced_in_percentage: string;
  group_uploads_verified_in_percentage: string;
  user_uploads_count: number;
  user_uploads_checksum_total_count: number;
  user_uploads_checksummed_count: number;
  user_uploads_checksum_failed_count: number;
  user_uploads_synced_count: number | null;
  user_uploads_failed_count: number | null;
  user_uploads_registry_count: number | null;
  user_uploads_verification_total_count: number | null;
  user_uploads_verified_count: number | null;
  user_uploads_verification_failed_count: number | null;
  user_uploads_synced_in_percentage: string;
  user_uploads_verified_in_percentage: string;
  design_management_action_uploads_count: number;
  design_management_action_uploads_checksum_total_count: number;
  design_management_action_uploads_checksummed_count: number;
  design_management_action_uploads_checksum_failed_count: number;
  design_management_action_uploads_synced_count: number | null;
  design_management_action_uploads_failed_count: number | null;
  design_management_action_uploads_registry_count: number | null;
  design_management_action_uploads_verification_total_count: number | null;
  design_management_action_uploads_verified_count: number | null;
  design_management_action_uploads_verification_failed_count: number | null;
  design_management_action_uploads_synced_in_percentage: string;
  design_management_action_uploads_verified_in_percentage: string;
  bulk_import_export_upload_uploads_count: number;
  bulk_import_export_upload_uploads_checksum_total_count: number;
  bulk_import_export_upload_uploads_checksummed_count: number;
  bulk_import_export_upload_uploads_checksum_failed_count: number;
  bulk_import_export_upload_uploads_synced_count: number | null;
  bulk_import_export_upload_uploads_failed_count: number | null;
  bulk_import_export_upload_uploads_registry_count: number | null;
  bulk_import_export_upload_uploads_verification_total_count: number | null;
  bulk_import_export_upload_uploads_verified_count: number | null;
  bulk_import_export_upload_uploads_verification_failed_count: number | null;
  bulk_import_export_upload_uploads_synced_in_percentage: string;
  bulk_import_export_upload_uploads_verified_in_percentage: string;
  achievement_uploads_count: number;
  achievement_uploads_checksum_total_count: number;
  achievement_uploads_checksummed_count: number;
  achievement_uploads_checksum_failed_count: number;
  achievement_uploads_synced_count: number | null;
  achievement_uploads_failed_count: number | null;
  achievement_uploads_registry_count: number | null;
  achievement_uploads_verification_total_count: number | null;
  achievement_uploads_verified_count: number | null;
  achievement_uploads_verification_failed_count: number | null;
  achievement_uploads_synced_in_percentage: string;
  achievement_uploads_verified_in_percentage: string;
  ai_vectorizable_file_uploads_count: number;
  ai_vectorizable_file_uploads_checksum_total_count: number;
  ai_vectorizable_file_uploads_checksummed_count: number;
  ai_vectorizable_file_uploads_checksum_failed_count: number;
  ai_vectorizable_file_uploads_synced_count: number | null;
  ai_vectorizable_file_uploads_failed_count: number | null;
  ai_vectorizable_file_uploads_registry_count: number | null;
  ai_vectorizable_file_uploads_verification_total_count: number | null;
  ai_vectorizable_file_uploads_verified_count: number | null;
  ai_vectorizable_file_uploads_verification_failed_count: number | null;
  ai_vectorizable_file_uploads_synced_in_percentage: string;
  ai_vectorizable_file_uploads_verified_in_percentage: string;
  import_export_upload_uploads_count: number;
  import_export_upload_uploads_checksum_total_count: number;
  import_export_upload_uploads_checksummed_count: number;
  import_export_upload_uploads_checksum_failed_count: number;
  import_export_upload_uploads_synced_count: number | null;
  import_export_upload_uploads_failed_count: number | null;
  import_export_upload_uploads_registry_count: number | null;
  import_export_upload_uploads_verification_total_count: number | null;
  import_export_upload_uploads_verified_count: number | null;
  import_export_upload_uploads_verification_failed_count: number | null;
  import_export_upload_uploads_synced_in_percentage: string;
  import_export_upload_uploads_verified_in_percentage: string;
  git_fetch_event_count_weekly: number | null;
  git_push_event_count_weekly: number | null;
  proxy_remote_requests_event_count_weekly: number | null;
  proxy_local_requests_event_count_weekly: number | null;
  repositories_checked_in_percentage: string;
  replication_slots_used_in_percentage: string;
  ci_secure_files_synced_in_percentage: string;
  ci_secure_files_verified_in_percentage: string;
  container_repositories_synced_in_percentage: string;
  container_repositories_verified_in_percentage: string;
  dependency_proxy_blobs_synced_in_percentage: string;
  dependency_proxy_blobs_verified_in_percentage: string;
  dependency_proxy_manifests_synced_in_percentage: string;
  dependency_proxy_manifests_verified_in_percentage: string;
  design_management_repositories_synced_in_percentage: string;
  design_management_repositories_verified_in_percentage: string;
  group_wiki_repositories_synced_in_percentage: string;
  group_wiki_repositories_verified_in_percentage: string;
  job_artifacts_synced_in_percentage: string;
  job_artifacts_verified_in_percentage: string;
  lfs_objects_synced_in_percentage: string;
  lfs_objects_verified_in_percentage: string;
  merge_request_diffs_synced_in_percentage: string;
  merge_request_diffs_verified_in_percentage: string;
  package_files_synced_in_percentage: string;
  package_files_verified_in_percentage: string;
  pages_deployments_synced_in_percentage: string;
  pages_deployments_verified_in_percentage: string;
  pipeline_artifacts_synced_in_percentage: string;
  pipeline_artifacts_verified_in_percentage: string;
  project_repositories_synced_in_percentage: string;
  project_repositories_verified_in_percentage: string;
  project_wiki_repositories_synced_in_percentage: string;
  project_wiki_repositories_verified_in_percentage: string;
  snippet_repositories_synced_in_percentage: string;
  snippet_repositories_verified_in_percentage: string;
  terraform_state_versions_synced_in_percentage: string;
  terraform_state_versions_verified_in_percentage: string;
  uploads_synced_in_percentage: string;
  uploads_verified_in_percentage: string;
  repositories_count: number;
  replication_slots_count: number | null;
  replication_slots_used_count: number | null;
  healthy: boolean;
  health: string;
  health_status: string;
  missing_oauth_application: boolean;
  db_replication_lag_seconds: number | null;
  replication_slots_max_retained_wal_bytes: number | null;
  repositories_checked_count: number | null;
  repositories_checked_failed_count: number | null;
  last_event_id: number;
  last_event_timestamp: number;
  cursor_last_event_id: number | null;
  cursor_last_event_timestamp: number;
  last_successful_status_check_timestamp: number;
  version: string;
  revision: string;
  selective_sync_type: 'namespaces' | 'shards' | null;
  namespaces: unknown[];
  updated_at: string;
  storage_shards_match: boolean;
  _links: {
    self: string;
    site: string;
  };
}

export class GeoSites<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GeoSiteSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GeoSiteSchema[]>()(this, 'geo_sites', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    name: string,
    url: string,
    options?: GeoSiteCreateOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GeoSiteSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<GeoSiteSchema>()(this, 'geo_sites', {
      sudo,
      showExpanded,
      body: {
        ...body,
        name,
        url,
      },
    });
  }

  edit<E extends boolean = false>(
    siteId: string | number,
    options?: GeoSiteUpdateOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GeoSiteSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<GeoSiteSchema>()(this, endpoint`geo_sites/${siteId}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  repair<E extends boolean = false>(
    siteId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GeoSiteSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<GeoSiteSchema>()(this, endpoint`geo_sites/${siteId}/repair`, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    siteId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<void>()(this, endpoint`geo_sites/${siteId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    siteId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GeoSiteSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GeoSiteSchema>()(this, endpoint`geo_sites/${siteId}`, {
      sudo,
      showExpanded,
    });
  }

  allStatuses<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GeoSiteStatusSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GeoSiteStatusSchema[]>()(this, 'geo_sites/status', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
    });
  }

  showStatus<E extends boolean = false>(
    siteId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GeoSiteStatusSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GeoSiteStatusSchema>()(this, endpoint`geo_sites/${siteId}/status`, {
      sudo,
      showExpanded,
    });
  }
}
