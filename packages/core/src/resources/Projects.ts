import { BaseResource } from '@gitbeaker/requester-utils';
import { lookup as mimeLookup } from 'mime-types';
import { UserSchema } from './Users';
import { NamespaceSchema } from './Namespaces';
import { LicenseTemplateSchema } from './LicenseTemplates';
import { UploadMetadata, defaultMetadata } from './ProjectImportExport';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../templates/types';

// TODO add missing functions
export interface ProjectSchema extends Record<string, unknown> {
  id: number;
  description?: string;
  default_branch: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  tag_list?: string[];
  topics?: string[];
  name: string;
  name_with_namespace: string;
  namespace: Pick<
    NamespaceSchema,
    'id' | 'name' | 'path' | 'kind' | 'full_path' | 'avatar_url' | 'web_url'
  >;
  path: string;
  path_with_namespace: string;
  created_at: string;
  last_activity_at: string;
  forks_count: number;
  avatar_url: string;
  star_count: number;
}

export interface AccessSchema {
  access_level: AccessLevel;
  notification_level: number;
}

export interface SharedWithGroupSchema {
  group_id: number;
  group_name: string;
  group_full_path: string;
  group_access_level: number;
}

export interface ProjectExtendedSchema extends ProjectSchema {
  visibility: string;
  owner: Pick<UserSchema, 'id' | 'name' | 'created_at'>;
  issues_enabled: boolean;
  open_issues_count: number;
  merge_requests_enabled: boolean;
  jobs_enabled: boolean;
  wiki_enabled: boolean;
  snippets_enabled: boolean;
  can_create_merge_request_in: boolean;
  resolve_outdated_diff_discussions: boolean;
  container_registry_enabled: boolean;
  container_expiration_policy: {
    cadence: string;
    enabled: boolean;
    keep_n?: number;
    older_than?: string;
    name_regex_delete?: string;
    name_regex_keep?: string;
    next_run_at: string;
  };
  creator_id: number;
  import_status: string;
  import_error?: string;
  permissions: {
    project_access: AccessSchema;
    group_access: AccessSchema;
  };
  archived: boolean;
  license_url: string;
  license: Pick<LicenseTemplateSchema, 'key' | 'name' | 'nickname' | 'html_url' | 'source_url'>;
  shared_runners_enabled: boolean;
  runners_token: string;
  ci_default_git_depth: number;
  ci_forward_deployment_enabled: boolean;
  public_jobs: boolean;
  shared_with_groups?: SharedWithGroupSchema[];
  repository_storage: string;
  only_allow_merge_if_pipeline_succeeds: boolean;
  allow_merge_on_skipped_pipeline: boolean;
  restrict_user_defined_variables: boolean;
  only_allow_merge_if_all_discussions_are_resolved: boolean;
  remove_source_branch_after_merge: boolean;
  printing_merge_requests_link_enabled: boolean;
  request_access_enabled: boolean;
  merge_method: string;
  auto_devops_enabled: boolean;
  auto_devops_deploy_strategy: string;
  approvals_before_merge: number;
  mirror: boolean;
  mirror_user_id: number;
  mirror_trigger_builds: boolean;
  only_mirror_protected_branches: boolean;
  mirror_overwrites_diverged_branches: boolean;
  external_authorization_classification_label?: string;
  packages_enabled: boolean;
  service_desk_enabled: boolean;
  service_desk_address?: string;
  autoclose_referenced_issues: boolean;
  suggestion_commit_message?: string;
  marked_for_deletion_at: string;
  marked_for_deletion_on: string;
  compliance_frameworks?: string[];
  statistics: {
    commit_count: number;
    storage_size: number;
    repository_size: number;
    wiki_size: number;
    lfs_objects_size: number;
    job_artifacts_size: number;
    packages_size: number;
    snippets_size: number;
  };
  container_registry_image_prefix: string;
  _links: {
    self: string;
    issues: string;
    merge_requests: string;
    repo_branches: string;
    labels: string;
    events: string;
    members: string;
  };
}

export interface ProjectFileUploadSchema extends Record<string, unknown> {
  alt: string;
  url: string;
  full_path: string;
  markdown: string;
}

export class Projects<C extends boolean = false> extends BaseResource<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<ProjectSchema[]>()(this, 'projects', options);
  }

  archive(projectId: string | number, options?: Sudo) {
    return RequestHelper.post<ProjectExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/archive`,
      options,
    );
  }

  create({
    userId,
    ...options
  }: ({ name: string } | { path: string }) & { userId?: number } & BaseRequestOptions) {
    const url = userId ? `projects/user/${userId}` : 'projects';

    return RequestHelper.post<ProjectExtendedSchema>()(this, url, options);
  }

  edit(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.put<ProjectExtendedSchema>()(
      this,
      endpoint`projects/${projectId}`,
      options,
    );
  }

  fork(
    projectId: string | number,
    { forkedFromId, ...options }: { forkedFromId?: number } & BaseRequestOptions = {},
  ) {
    let url = endpoint`projects/${projectId}/fork`;

    if (forkedFromId) url += `/${encodeURIComponent(forkedFromId)}`;

    return RequestHelper.post<ProjectExtendedSchema>()(this, url, options);
  }

  forks(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.get<ProjectExtendedSchema[]>()(
      this,
      endpoint`projects/${projectId}/forks`,
      options,
    );
  }

  languages(projectId: string | number, options?: Sudo) {
    return RequestHelper.get<{ [name: string]: number }>()(
      this,
      endpoint`projects/${projectId}/languages`,
      options,
    );
  }

  mirrorPull(projectId: string | number, options?: Sudo) {
    return RequestHelper.post()(this, endpoint`projects/${projectId}/mirror/pull`, options);
  }

  remove(projectId: string | number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`projects/${projectId}`, options);
  }

  removeFork(projectId: string | number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/fork`, options);
  }

  search(projectName: string, options?: BaseRequestOptions) {
    return RequestHelper.get<ProjectSchema[]>()(this, 'projects', {
      search: projectName,
      ...options,
    });
  }

  share(
    projectId: string | number,
    groupId: string | number,
    groupAccess: number,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post()(this, endpoint`projects/${projectId}/share`, {
      groupId,
      groupAccess,
      ...options,
    });
  }

  show(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.get<ProjectExtendedSchema>()(
      this,
      endpoint`projects/${projectId}`,
      options,
    );
  }

  star(projectId: string | number, options?: Sudo) {
    return RequestHelper.post<ProjectExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/star`,
      options,
    );
  }

  transfer(projectId: string | number, namespaceId: string | number) {
    return RequestHelper.put<ProjectExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/transfer`,
      {
        namespace: namespaceId,
      },
    );
  }

  unarchive(projectId: string | number, options?: Sudo) {
    return RequestHelper.post<ProjectExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/unarchive`,
      options,
    );
  }

  unshare(projectId: string | number, groupId: string | number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/share/${groupId}`, options);
  }

  unstar(projectId: string | number, options?: Sudo) {
    return RequestHelper.post<ProjectExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/unstar`,
      options,
    );
  }

  upload(
    projectId: string | number,
    content: string,
    { metadata, ...options }: { metadata?: UploadMetadata } & BaseRequestOptions = {},
  ) {
    const meta = { ...defaultMetadata, ...metadata };

    if (!meta.contentType) meta.contentType = mimeLookup(meta.filename);

    return RequestHelper.post<ProjectFileUploadSchema>()(
      this,
      endpoint`projects/${projectId}/uploads`,
      {
        isForm: true,
        file: [content, meta],
        ...options,
      },
    );
  }
}
