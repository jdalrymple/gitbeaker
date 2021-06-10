import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

export interface ApplicationSettingsSchema extends Record<string, unknown> {
  default_projects_limit: number;
  signup_enabled: boolean;
  id: number;
  default_branch_protection: number;
  restricted_visibility_levels?: string[];
  password_authentication_enabled_for_web: boolean;
  after_sign_out_path?: string;
  max_attachment_size: number;
  max_import_size: number;
  user_oauth_applications: boolean;
  updated_at: string;
  session_expire_delay: number;
  home_page_url?: string;
  default_snippet_visibility: string;
  outbound_local_requests_whitelist?: string[];
  domain_allowlist?: string[];
  domain_denylist_enabled: boolean;
  domain_denylist?: string[];
  created_at: string;
  default_ci_config_path?: string;
  default_project_visibility: string;
  default_group_visibility: string;
  gravatar_enabled: boolean;
  sign_in_text?: string;
  container_expiration_policies_enable_historic_entries: boolean;
  container_registry_token_expire_delay: number;
  repository_storages_weighted: {
    [name: string]: number;
  };
  plantuml_enabled: boolean;
  plantuml_url?: string;
  kroki_enabled: boolean;
  kroki_url?: string;
  terminal_max_session_time: number;
  polling_interval_multiplier: number;
  rsa_key_restriction: number;
  dsa_key_restriction: number;
  ecdsa_key_restriction: number;
  ed25519_key_restriction: number;
  first_day_of_week: number;
  enforce_terms: boolean;
  terms: string;
  performance_bar_allowed_group_id: number;
  user_show_add_ssh_key_message: boolean;
  local_markdown_version: number;
  allow_local_requests_from_hooks_and_services: boolean;
  allow_local_requests_from_web_hooks_and_services: boolean;
  allow_local_requests_from_system_hooks: boolean;
  asset_proxy_enabled: boolean;
  asset_proxy_url: string;
  asset_proxy_whitelist?: string[];
  asset_proxy_allowlist?: string[];
  npm_package_requests_forwarding: boolean;
  snippet_size_limit: number;
  issues_create_limit: number;
  raw_blob_request_limit: number;
  wiki_page_max_content_bytes: number;
  require_admin_approval_after_user_signup: boolean;
  personal_access_token_prefix: string;
  rate_limiting_response_text?: string;
  keep_latest_artifact: boolean;
}

export class ApplicationSettings<C extends boolean = false> extends BaseResource<C> {
  all(options?: Sudo) {
    return RequestHelper.get<ApplicationSettingsSchema>()(this, 'application/settings', options);
  }

  edit(options?: BaseRequestOptions) {
    return RequestHelper.put<ApplicationSettingsSchema>()(this, 'application/settings', options);
  }
}
