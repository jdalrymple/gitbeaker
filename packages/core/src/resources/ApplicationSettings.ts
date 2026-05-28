import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestBodyRecordOptions,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface ApplicationSettingsSchema extends Record<string, unknown> {
  // Core settings
  id?: number;
  created_at?: string;
  updated_at?: string;

  // Authentication & security
  admin_mode?: boolean;
  admin_notification_email?: string;
  abuse_notification_email?: string;
  after_sign_out_path?: string;
  after_sign_up_text?: string;
  akismet_api_key?: string;
  akismet_enabled?: boolean;
  allow_account_deletion?: boolean;
  allow_group_owners_to_manage_ldap?: boolean;
  allow_local_requests_from_hooks_and_services?: boolean;
  allow_local_requests_from_system_hooks?: boolean;
  allow_local_requests_from_web_hooks_and_services?: boolean;
  allow_project_creation_for_guest_and_below?: boolean;
  allow_runner_registration_token?: boolean;
  authorized_keys_enabled?: boolean;

  // Asset proxy settings
  asset_proxy_enabled?: boolean;
  asset_proxy_secret_key?: string;
  asset_proxy_url?: string;
  asset_proxy_whitelist?: string | string[];
  asset_proxy_allowlist?: string | string[];

  // Archive and timeout settings
  archive_builds_in_human_readable?: string;
  authn_data_retention_cleanup_enabled?: boolean;

  // Auto DevOps
  auto_devops_domain?: string;
  auto_devops_enabled?: boolean;
  automatic_purchased_storage_allocation?: boolean;

  // Rate limiting and API limits
  autocomplete_users?: number;
  autocomplete_users_unauthenticated?: number;

  // Import/Export settings
  bulk_import_enabled?: boolean;
  bulk_import_max_download_file_size?: number;
  bulk_import_concurrent_pipeline_batch_limit?: number;

  // User management
  allow_bypass_placeholder_confirmation?: boolean;
  allow_s3_compatible_storage_for_offline_transfer?: boolean;
  can_create_group?: boolean;
  check_namespace_plan?: boolean;

  // CI/CD settings
  ci_delete_pipelines_in_seconds_limit_human_readable?: string;
  ci_job_live_trace_enabled?: boolean;
  git_push_pipeline_limit?: number;
  ci_max_total_yaml_size_bytes?: number;
  ci_max_includes?: number;
  ci_partitions_in_seconds_limit?: number;

  // Import job limits
  concurrent_github_import_jobs_limit?: number;
  concurrent_bitbucket_import_jobs_limit?: number;
  concurrent_bitbucket_server_import_jobs_limit?: number;
  concurrent_relation_batch_export_limit?: number;

  // Email settings
  commit_email_hostname?: string;
  email_additional_text?: string;
  email_author_in_body?: boolean;
  email_confirmation_setting?: string;
  email_restrictions_enabled?: boolean;
  email_restrictions?: string;

  // Container registry
  container_expiration_policies_enable_historic_entries?: boolean;
  container_registry_cleanup_tags_service_max_list_size?: number;
  container_registry_delete_tags_service_timeout?: number;
  container_registry_expiration_policies_caching?: boolean;
  container_registry_expiration_policies_worker_capacity?: number;
  container_registry_token_expire_delay?: number;
  package_registry_cleanup_policies_worker_capacity?: number;

  // HTTP settings
  custom_http_clone_url_root?: string;

  // User deactivation
  deactivate_dormant_users?: boolean;
  deactivate_dormant_users_period?: number;

  // Archive decompression
  decompress_archive_file_timeout?: number;

  // Default settings
  default_artifacts_expire_in?: string;
  default_branch_name?: string;
  default_branch_protection?: number;
  default_branch_protection_defaults?: {
    allowed_to_push?: Array<{ access_level?: number }>;
    allow_force_push?: boolean;
    allowed_to_merge?: Array<{ access_level?: number }>;
  };
  default_ci_config_path?: string;
  default_group_visibility?: string;
  default_preferred_language?: string;
  default_project_creation?: number;
  default_project_visibility?: string;
  default_projects_limit?: number;
  default_snippet_visibility?: string;
  default_syntax_highlighting_theme?: number;
  default_dark_syntax_highlighting_theme?: number;
  default_project_deletion_protection?: boolean;

  // User deletion settings
  delete_unconfirmed_users?: boolean;
  deletion_adjourned_period?: number;

  // Content size limits
  description_and_note_max_size?: number;

  // Diagrams.net integration
  diagramsnet_enabled?: boolean;
  diagramsnet_url?: string;

  // Diff limits
  diff_max_patch_bytes?: number;
  diff_max_files?: number;
  diff_max_lines?: number;
  diff_max_versions?: number;
  diff_max_commits?: number;

  // OAuth and access control
  disable_admin_oauth_scopes?: boolean;
  disable_feed_token?: boolean;
  disable_personal_access_tokens?: boolean;
  disabled_oauth_sign_in_sources?: string[];
  disable_password_authentication_for_users_with_sso_identities?: boolean;

  // DNS and domain settings
  dns_rebinding_protection_enabled?: boolean;
  domain_denylist_enabled?: boolean;
  domain_denylist?: string[];
  domain_allowlist?: string[];
  downstream_pipeline_trigger_limit_per_project_user_sha?: number;

  // Key restrictions
  dsa_key_restriction?: number;
  ecdsa_key_restriction?: number;
  ecdsa_sk_key_restriction?: number;
  ed25519_key_restriction?: number;
  ed25519_sk_key_restriction?: number;

  // AWS EKS integration
  eks_access_key_id?: string;
  eks_account_id?: string;
  eks_integration_enabled?: boolean;
  eks_secret_access_key?: string;

  // Elasticsearch settings
  elasticsearch_aws_access_key?: string;
  elasticsearch_aws_region?: string;
  elasticsearch_aws_secret_access_key?: string;
  elasticsearch_aws?: boolean;
  elasticsearch_client_adapter?: string;
  elasticsearch_indexed_field_length_limit?: number;
  elasticsearch_indexed_file_size_limit_kb?: number;
  elasticsearch_indexing?: boolean;
  elasticsearch_requeue_workers?: boolean;
  elasticsearch_limit_indexing?: boolean;
  elasticsearch_max_bulk_concurrency?: number;
  elasticsearch_max_code_indexing_concurrency?: number;
  elasticsearch_worker_number_of_shards?: number;
  elasticsearch_max_bulk_size_mb?: number;
  elasticsearch_namespace_ids?: number[];
  elasticsearch_project_ids?: number[];
  elasticsearch_search?: boolean;
  elasticsearch_url?: string | string[];
  elasticsearch_username?: string;
  elasticsearch_password?: string;
  elasticsearch_prefix?: string;
  elasticsearch_retry_on_failure?: number;
  elasticsearch_shards?: number | Record<string, number>;
  elasticsearch_replicas?: number | Record<string, number>;
  elasticsearch_index_settings?: Array<{
    alias_name?: string;
    number_of_shards?: number;
    number_of_replicas?: number;
  }>;

  // Protocol and access settings
  enabled_git_access_protocol?: string;
  enforce_namespace_storage_limit?: boolean;
  enforce_terms?: boolean;

  // External authorization
  external_auth_client_cert?: string;
  external_auth_client_key_pass?: string;
  external_auth_client_key?: string;
  external_authorization_service_default_label?: string;
  external_authorization_service_enabled?: boolean;
  external_authorization_service_timeout?: number;
  external_authorization_service_url?: string;

  // Pipeline validation
  external_pipeline_validation_service_url?: string;
  external_pipeline_validation_service_token?: string;
  external_pipeline_validation_service_timeout?: number;

  // Static objects storage
  static_objects_external_storage_url?: string;
  static_objects_external_storage_auth_token?: string;

  // Security settings
  failed_login_attempts_unlock_period_in_minutes?: number;
  file_template_project_id?: number;
  first_day_of_week?: number;
  floc_enabled?: boolean;

  // IP allowlists
  globally_allowed_ips?: string;
  geo_node_allowed_ips?: string;
  geo_status_timeout?: number;

  // Two-factor authentication for Git
  git_two_factor_session_expiry?: number;

  // Gitaly timeouts
  gitaly_timeout_default?: number;
  gitaly_timeout_fast?: number;
  gitaly_timeout_medium?: number;

  // Instance identification
  gitlab_dedicated_instance?: boolean;
  gitlab_environment_toolkit_instance?: boolean;
  gitlab_shell_operation_limit?: number;

  // Grafana integration
  grafana_enabled?: boolean;
  grafana_url?: string;
  gravatar_enabled?: boolean;
  group_owners_can_manage_default_branch_protection?: boolean;

  // Storage settings
  hashed_storage_enabled?: boolean;

  // Help page settings
  help_page_hide_commercial_content?: boolean;
  help_page_support_url?: string;
  help_page_documentation_base_url?: string;
  help_page_text?: string;
  hide_third_party_offers?: boolean;
  home_page_url?: string;

  // Git housekeeping
  housekeeping_bitmaps_enabled?: boolean;
  housekeeping_enabled?: boolean;
  housekeeping_full_repack_period?: number;
  housekeeping_gc_period?: number;
  housekeeping_incremental_repack_period?: number;
  housekeeping_optimize_repository_period?: number;
  html_emails_enabled?: boolean;

  // Import sources
  import_sources?: string[];

  // CAPTCHA settings
  invisible_captcha_enabled?: boolean;

  // Rate limits
  issues_create_limit?: number;

  // Jira integration
  jira_connect_application_key?: string;
  jira_connect_public_key_storage_enabled?: boolean;
  jira_connect_proxy_url?: string;
  jira_connect_additional_audience_url?: string;

  // Artifact settings
  keep_latest_artifact?: boolean;

  // Kroki integration
  kroki_enabled?: boolean;
  kroki_url?: string;
  kroki_formats?: Record<string, boolean>;
  kroki_diagram_proxy_enabled?: boolean;

  // Markdown settings
  local_markdown_version?: number;

  // SAML membership locking
  lock_memberships_to_saml?: boolean;

  // Mailgun integration
  mailgun_signing_key?: string;
  mailgun_events_enabled?: boolean;

  // Maintenance mode
  maintenance_mode_message?: string;
  maintenance_mode?: boolean;

  // Size limits
  max_artifacts_size?: number;
  max_attachment_size?: number;
  max_decompressed_archive_size?: number;
  max_export_size?: number;
  max_github_response_size_limit?: number;
  max_github_response_json_value_count?: number;
  max_http_decompressed_size?: number;
  max_http_response_json_depth?: number;
  max_http_response_json_structural_chars?: number;
  max_http_response_xml_structural_chars?: number;
  max_http_response_csv_structural_chars?: number;
  max_http_response_size_limit?: number;
  max_import_size?: number;
  max_import_remote_file_size?: number;
  max_login_attempts?: number;
  max_pages_size?: number;
  max_personal_access_token_lifetime?: number;
  max_ssh_key_lifetime?: number;
  max_terraform_state_size_bytes?: number;

  // Performance metrics
  metrics_method_call_threshold?: number;

  // Repository download limits
  max_number_of_repository_downloads?: number;
  max_number_of_repository_downloads_within_time_period?: number;

  // YAML limits
  max_yaml_depth?: number;
  max_yaml_size_bytes?: number;

  // Git rate limiting
  git_rate_limit_users_allowlist?: string[];
  git_rate_limit_users_alertlist?: number[];
  auto_ban_user_on_excessive_projects_download?: boolean;

  // Repository mirroring
  mirror_available?: boolean;
  mirror_capacity_threshold?: number;
  mirror_max_capacity?: number;
  mirror_max_delay?: number;

  // Package forwarding
  maven_package_requests_forwarding?: boolean;
  npm_package_requests_forwarding?: boolean;
  pypi_package_requests_forwarding?: boolean;

  // Local request allowlists
  outbound_local_requests_whitelist?: string[];

  // Package registry settings
  package_registry_allow_anyone_to_pull_option?: boolean;
  package_metadata_purl_types?: number[];

  // Pages settings
  pages_domain_verification_enabled?: boolean;
  pages_unique_domain_default_enabled?: boolean;

  // Password authentication
  password_authentication_enabled_for_git?: boolean;
  password_authentication_enabled_for_web?: boolean;

  // Password requirements
  minimum_password_length?: number;
  password_number_required?: boolean;
  password_symbol_required?: boolean;
  password_uppercase_required?: boolean;
  password_lowercase_required?: boolean;

  // Performance bar
  performance_bar_allowed_group_id?: string;
  performance_bar_allowed_group_path?: string;
  performance_bar_enabled?: boolean;

  // Access tokens
  personal_access_token_prefix?: string;

  // Pipeline limits
  pipeline_limit_per_project_user_sha?: number;
  pipeline_limit_per_user?: number;

  // Gitpod integration
  gitpod_enabled?: boolean;
  gitpod_url?: string;

  // Token settings
  inactive_resource_access_tokens_delete_after_days?: number;

  // PlantUML integration
  plantuml_enabled?: boolean;
  plantuml_url?: string;
  plantuml_diagram_proxy_enabled?: boolean;

  // Polling settings
  polling_interval_multiplier?: number;

  // Project settings
  project_export_enabled?: boolean;
  project_jobs_api_rate_limit?: number;
  projects_api_rate_limit_unauthenticated?: number;

  // Runner API rate limits
  runner_jobs_request_api_limit?: number;
  runner_jobs_patch_trace_api_limit?: number;
  runner_jobs_endpoints_api_limit?: number;

  // User API rate limits
  users_api_limit_following?: number;
  users_api_limit_followers?: number;
  users_api_limit_status?: number;
  users_api_limit_keys?: number;
  users_api_limit_key?: number;
  users_api_limit_gpg_keys?: number;
  users_api_limit_gpg_key?: number;

  // Virtual registries
  virtual_registries_endpoints_api_limit?: number;

  // Secrets limits
  project_secrets_limit?: number;
  group_secrets_limit?: number;

  // Prometheus settings
  prometheus_metrics_enabled?: boolean;
  protected_ci_variables?: boolean;

  // Approval settings
  disable_overriding_approvers_per_merge_request?: boolean;
  prevent_merge_requests_author_approval?: boolean;
  prevent_merge_requests_committers_approval?: boolean;

  // Event limits
  push_event_activities_limit?: number;
  push_event_hooks_limit?: number;

  // Rate limiting response
  rate_limiting_response_text?: string;

  // Raw blob limits
  raw_blob_request_limit?: number;
  raw_blob_request_limit_unauthenticated?: number;

  // Search rate limits
  search_rate_limit?: number;
  search_rate_limit_unauthenticated?: number;

  // reCAPTCHA settings
  recaptcha_enabled?: boolean;
  login_recaptcha_protection_enabled?: boolean;
  recaptcha_private_key?: string;
  recaptcha_site_key?: string;

  // Receptive cluster agents
  receptive_cluster_agents_enabled?: boolean;

  // Repository settings
  receive_max_input_size?: number;
  relation_export_batch_size?: number;
  remember_me_enabled?: boolean;
  repository_checks_enabled?: boolean;
  repository_size_limit?: number;
  repository_storages_weighted?: Record<string, number>;

  // User signup and approval
  require_admin_approval_after_user_signup?: boolean;
  require_email_verification_on_account_locked?: boolean;
  require_personal_access_token_expiry?: boolean;
  require_two_factor_authentication?: boolean;

  // Resource limits
  resource_usage_limits?: Record<string, unknown>;
  restricted_visibility_levels?: string[];
  rsa_key_restriction?: number;

  // Session settings
  session_expire_delay?: number;
  session_expire_from_init?: boolean;

  // Security policies
  security_policy_global_group_approvers_enabled?: boolean;
  security_approval_policies_limit?: number;
  scan_execution_policies_action_limit?: number;
  scan_execution_policies_schedule_limit?: number;

  // Security settings
  security_txt_content?: string;
  security_mr_report_cache_lifetime_minutes?: number;
  security_scan_stale_after_days?: number;

  // Service access tokens
  service_access_tokens_expiration_enforced?: boolean;

  // Shared runners
  shared_runners_enabled?: boolean;
  shared_runners_minutes?: number;
  shared_runners_text?: string;

  // Runner token expiration
  runner_token_expiration_interval?: number;
  group_runner_token_expiration_interval?: number;
  project_runner_token_expiration_interval?: number;

  // Sidekiq settings
  sidekiq_job_limiter_mode?: string;
  sidekiq_job_limiter_compression_threshold_bytes?: number;
  sidekiq_job_limiter_limit_bytes?: number;

  // Sign-in settings
  signin_enabled?: string;
  sign_in_restrictions?: Record<string, unknown>;
  signup_enabled?: boolean;
  silent_admin_exports_enabled?: boolean;
  silent_mode_enabled?: boolean;

  // Slack integration
  slack_app_enabled?: boolean;
  slack_app_id?: string;
  slack_app_secret?: string;
  slack_app_signing_secret?: string;
  slack_app_verification_token?: string;

  // Content size limits
  snippet_size_limit?: number;

  // Snowplow analytics
  snowplow_app_id?: string;
  snowplow_collector_hostname?: string;
  snowplow_database_collector_hostname?: string;
  snowplow_cookie_domain?: string;
  snowplow_enabled?: boolean;

  // Sourcegraph integration
  sourcegraph_enabled?: boolean;
  sourcegraph_public_only?: boolean;
  sourcegraph_url?: string;

  // Spam checking
  spam_check_endpoint_enabled?: boolean;
  spam_check_endpoint_url?: string;
  spam_check_api_key?: string;

  // Pipeline suggestions
  suggest_pipeline_enabled?: boolean;

  // External redirect warning
  enable_artifact_external_redirect_warning_page?: boolean;

  // Terminal settings
  terminal_max_session_time?: number;
  terms?: string;

  // Throttling settings - Authenticated API
  throttle_authenticated_api_enabled?: boolean;
  throttle_authenticated_api_period_in_seconds?: number;
  throttle_authenticated_api_requests_per_period?: number;

  // Throttling settings - Authenticated Git HTTP
  throttle_authenticated_git_http_enabled?: boolean;
  throttle_authenticated_git_http_period_in_seconds?: number;
  throttle_authenticated_git_http_requests_per_period?: number;

  // Throttling settings - Authenticated Packages API
  throttle_authenticated_packages_api_enabled?: boolean;
  throttle_authenticated_packages_api_period_in_seconds?: number;
  throttle_authenticated_packages_api_requests_per_period?: number;

  // Throttling settings - Authenticated Web
  throttle_authenticated_web_enabled?: boolean;
  throttle_authenticated_web_period_in_seconds?: number;
  throttle_authenticated_web_requests_per_period?: number;

  // Throttling settings - Unauthenticated (deprecated)
  throttle_unauthenticated_enabled?: boolean;
  throttle_unauthenticated_period_in_seconds?: number;
  throttle_unauthenticated_requests_per_period?: number;

  // Throttling settings - Unauthenticated API
  throttle_unauthenticated_api_enabled?: boolean;
  throttle_unauthenticated_api_period_in_seconds?: number;
  throttle_unauthenticated_api_requests_per_period?: number;

  // Throttling settings - Unauthenticated Git HTTP
  throttle_unauthenticated_git_http_enabled?: boolean;
  throttle_unauthenticated_git_http_period_in_seconds?: number;
  throttle_unauthenticated_git_http_requests_per_period?: number;

  // Throttling settings - Unauthenticated Packages API
  throttle_unauthenticated_packages_api_enabled?: boolean;
  throttle_unauthenticated_packages_api_period_in_seconds?: number;
  throttle_unauthenticated_packages_api_requests_per_period?: number;

  // Throttling settings - Unauthenticated Web
  throttle_unauthenticated_web_enabled?: boolean;
  throttle_unauthenticated_web_period_in_seconds?: number;
  throttle_unauthenticated_web_requests_per_period?: number;

  // Time tracking
  time_tracking_limit_to_hours?: boolean;

  // Group creation
  top_level_group_creation_enabled?: boolean;

  // Two-factor authentication
  two_factor_grace_period?: number;

  // User deletion settings
  unconfirmed_users_delete_after_days?: number;
  updating_name_disabled_for_users?: boolean;

  // IP limiting
  unique_ips_limit_enabled?: boolean;
  unique_ips_limit_per_user?: number;
  unique_ips_limit_time_window?: number;

  // Runner version updates
  update_runner_versions_enabled?: boolean;

  // Usage data
  usage_ping_enabled?: boolean;
  gitlab_product_usage_data_enabled?: boolean;
  gitlab_product_usage_data_source?: string;
  use_clickhouse_for_analytics?: boolean;
  include_optional_metrics_in_service_ping?: boolean;

  // User settings
  user_deactivation_emails_enabled?: boolean;
  user_default_external?: boolean;
  user_default_internal_regex?: string;
  user_defaults_to_private_profile?: boolean;
  user_oauth_applications?: boolean;
  user_show_add_ssh_key_message?: boolean;

  // Valid runner registrars
  valid_runner_registrars?: string[];

  // Version checking
  version_check_enabled?: boolean;

  // VS Code integration
  vscode_extension_marketplace?: Record<string, unknown>;

  // What's new feature
  whats_new_variant?: string;

  // Wiki settings
  wiki_page_max_content_bytes?: number;

  // Dormant project settings
  delete_inactive_projects?: boolean;
  inactive_projects_delete_after_months?: number;
  inactive_projects_min_size_mb?: number;
  inactive_projects_send_warning_email_after_months?: number;

  // AsciiDoc settings
  asciidoc_max_includes?: number;

  // GitLab Duo features
  duo_custom_agents_enabled?: boolean;
  duo_custom_flows_enabled?: boolean;
  duo_features_enabled?: boolean;
  lock_duo_custom_agents_enabled?: boolean;
  lock_duo_custom_flows_enabled?: boolean;
  lock_duo_features_enabled?: boolean;

  // NuGet settings
  nuget_skip_metadata_url_validation?: boolean;

  // Helm settings
  helm_max_packages_count?: number;

  // Admin two-factor authentication
  require_admin_two_factor_authentication?: boolean;

  // Secret push protection
  secret_push_protection_available?: boolean;

  // Member invitations
  disable_invite_members?: boolean;

  // PIPL compliance
  enforce_pipl_compliance?: boolean;

  // Additional notification settings
  notify_on_unknown_sign_in?: boolean;

  // Iframe rendering
  iframe_rendering_enabled?: boolean;
  iframe_rendering_allowlist?: string[];

  // Usage billing settings
  usage_billing?: Record<string, unknown>;

  // Model prompt cache
  model_prompt_cache_enabled?: boolean;
  lock_model_prompt_cache_enabled?: boolean;

  // Security scan dependencies
  dependency_scanning_sbom_scan_api_download_limit?: number;
  dependency_scanning_sbom_scan_api_upload_limit?: number;

  // Integration allowlists
  allow_all_integrations?: boolean;
  allowed_integrations?: string[];
}

export class ApplicationSettings<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ApplicationSettingsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ApplicationSettingsSchema>()(this, 'application/settings', {
      sudo,
      showExpanded,
    });
  }

  edit<E extends boolean = false>(
    options?: BaseRequestBodyRecordOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ApplicationSettingsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ApplicationSettingsSchema>()(this, 'application/settings', {
      sudo,
      showExpanded,
      body,
    });
  }
}
