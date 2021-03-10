import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface GeoNodeSchema extends Record<string, unknown> {
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
  container_repositories_max_capacity: number;
  sync_object_storage: boolean;
  clone_protocol: string;
  web_edit_url: string;
  web_geo_projects_url: string;
  _links: {
    self: string;
    status: string;
    repair: string;
  };
}

export interface GeoNodeFailureSchema extends Record<string, unknown> {
  project_id: number;
  last_repository_synced_at: string;
  last_repository_successful_sync_at: string;
  last_wiki_synced_at: string;
  last_wiki_successful_sync_at: string;
  repository_retry_count?: number;
  wiki_retry_count: number;
  last_repository_sync_failure?: null;
  last_wiki_sync_failure: string;
  last_repository_verification_failure: string;
  last_wiki_verification_failure: string;
  repository_verification_checksum_sha: string;
  wiki_verification_checksum_sha: string;
  repository_checksum_mismatch: boolean;
  wiki_checksum_mismatch: boolean;
}

export interface GeoNodeStatusSchema extends Record<string, unknown> {
  geo_node_id: number;
  healthy: boolean;
  health: string;
  health_status: string;
  missing_oauth_application: boolean;
  attachments_count: number;
  attachments_synced_count?: number;
  attachments_failed_count?: number;
  attachments_synced_missing_on_primary_count: number;
  attachments_synced_in_percentage: string;
  db_replication_lag_seconds?: number;
  lfs_objects_count: number;
  lfs_objects_synced_count?: number;
  lfs_objects_failed_count?: number;
  lfs_objects_synced_missing_on_primary_count: number;
  lfs_objects_synced_in_percentage: string;
  job_artifacts_count: number;
  job_artifacts_synced_count?: number;
  job_artifacts_failed_count?: number;
  job_artifacts_synced_missing_on_primary_count: number;
  job_artifacts_synced_in_percentage: string;
  container_repositories_count: number;
  container_repositories_synced_count?: number;
  container_repositories_failed_count?: number;
  container_repositories_synced_in_percentage: string;
  design_repositories_count: number;
  design_repositories_synced_count?: number;
  design_repositories_failed_count?: number;
  design_repositories_synced_in_percentage: string;
  projects_count: number;
  repositories_count: number;
  repositories_failed_count?: number;
  repositories_synced_count?: number;
  repositories_synced_in_percentage: string;
  wikis_count: number;
  wikis_failed_count?: number;
  wikis_synced_count?: number;
  wikis_synced_in_percentage: string;
  replication_slots_count: number;
  replication_slots_used_count: number;
  replication_slots_used_in_percentage: string;
  replication_slots_max_retained_wal_bytes: number;
  repositories_checked_count: number;
  repositories_checked_failed_count: number;
  repositories_checked_in_percentage: string;
  repositories_checksummed_count: number;
  repositories_checksum_failed_count: number;
  repositories_checksummed_in_percentage: string;
  wikis_checksummed_count: number;
  wikis_checksum_failed_count: number;
  wikis_checksummed_in_percentage: string;
  repositories_verified_count: number;
  repositories_verification_failed_count: number;
  repositories_verified_in_percentage: string;
  repositories_checksum_mismatch_count: number;
  wikis_verified_count: number;
  wikis_verification_failed_count: number;
  wikis_verified_in_percentage: string;
  wikis_checksum_mismatch_count: number;
  repositories_retrying_verification_count: number;
  wikis_retrying_verification_count: number;
  last_event_id: number;
  last_event_timestamp: number;
  cursor_last_event_id?: number;
  cursor_last_event_timestamp: number;
  last_successful_status_check_timestamp: number;
  version: string;
  revision: string;
  package_files_count: number;
  package_files_checksummed_count: number;
  package_files_checksum_failed_count: number;
  package_files_registry_count: number;
  package_files_synced_count: number;
  package_files_failed_count: number;
  snippet_repositories_count: number;
  snippet_repositories_checksummed_count: number;
  snippet_repositories_checksum_failed_count: number;
  snippet_repositories_registry_count: number;
  snippet_repositories_synced_count: number;
  snippet_repositories_failed_count: number;
  group_wiki_repositories_checksummed_count: number;
  group_wiki_repositories_checksum_failed_count: number;
  group_wiki_repositories_registry_count: number;
  group_wiki_repositories_synced_count: number;
  group_wiki_repositories_failed_count: number;
}


export class GeoNodes<C extends boolean = false> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<GeoNodeSchema[]>()(this, 'geo_nodes', options);
  }

  create(geonodeId: number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.post<GeoNodeSchema>()(this, `geo_nodes/${gId}`, options);
  }

  edit(geonodeId: number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.put<GeoNodeSchema>()(this, `geo_nodes/${gId}`, options);
  }

  failures(options?: BaseRequestOptions) {
    return RequestHelper.get<GeoNodeFailureSchema[]>()(this, 'geo_nodes/current/failures', options);
  }

  repair(geonodeId: number, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.post<GeoNodeSchema>()(this, `geo_nodes/${gId}/repair`, options);
  }

  remove(geonodeId: number, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.del<GeoNodeSchema>()(this, `geo_nodes/${gId}`, options);
  }


  show(geonodeId: number, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get<GeoNodeSchema>()(this, `geo_nodes/${gId}`, options);
  }

  status(geonodeId: number, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get<GeoNodeStatusSchema>()(this, `geo_nodes/${gId}/status`, options);
  }

  statuses(options?: PaginatedRequestOptions) {
    return RequestHelper.get<GeoNodeStatusSchema[]>()(this, 'geo_nodes/statuses', options);
  }
}
