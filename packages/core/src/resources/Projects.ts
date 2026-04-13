import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  SomeOf,
  Sudo,
} from '../infrastructure';
import type { CustomAttributeSchema } from '../templates/ResourceCustomAttributes';
import type { SimpleGroupSchema } from './Groups';
import type { CondensedNamespaceSchema } from './Namespaces';
import type { ProjectRemoteMirrorSchema } from './ProjectRemoteMirrors';
import type { SimpleUserSchema } from './Users';
import { BaseResource } from '@gitbeaker/requester-utils';
import { AccessLevel } from '../constants';
import { RequestHelper, createFormData, endpoint, getPrefixedUrl } from '../infrastructure';

export type AccessLevelSettingState = 'disabled' | 'enabled' | 'private';

export interface ProjectStarrerSchema extends Record<string, unknown> {
  starred_since: string;
  user: MappedOmit<SimpleUserSchema, 'created_at'>;
}

export interface ProjectStoragePath extends Record<string, unknown> {
  project_id: string | number;
  disk_path: string;
  created_at: string;
  repository_storage: string;
}

export interface ProjectStatisticsSchema {
  commit_count: number;
  storage_size: number;
  repository_size: number;
  wiki_size: number;
  lfs_objects_size: number;
  job_artifacts_size: number;
  pipeline_artifacts_size: number;
  packages_size: number;
  snippets_size: number;
  uploads_size: number;
}

export interface ProjectLicenseSchema {
  key: string;
  name: string;
  nickname: string;
  html_url: string;
  source_url: string;
}

export interface CondensedProjectSchema extends Record<string, unknown> {
  id: number;
  web_url: string;
  name: string;
  path: string;
}

export interface SimpleProjectSchema extends CondensedProjectSchema {
  description: string | null;
  name_with_namespace: string;
  path_with_namespace: string;
  created_at: string;
  default_branch: string;
  topics: string[] | null;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  readme_url: string | null;
  forks_count: number;
  avatar_url: string | null;
  star_count: number;
  last_activity_at: string;
  namespace: CondensedNamespaceSchema;
}

export interface ProjectSchema extends SimpleProjectSchema {
  description_html: string;
  visibility: 'public' | 'internal' | 'private';
  merge_requests_template?: string;
  empty_repo: boolean;
  issues_template?: string;
  owner: Pick<SimpleUserSchema, 'id' | 'name' | 'created_at'>;
  issues_enabled: boolean;
  open_issues_count: number;
  merge_requests_enabled: boolean;
  jobs_enabled: boolean;
  wiki_enabled: boolean;
  snippets_enabled: boolean;
  can_create_merge_request_in: boolean;
  resolve_outdated_diff_discussions: boolean;
  container_registry_access_level: string;
  security_and_compliance_access_level: string;
  container_expiration_policy: {
    cadence: string;
    enabled: boolean;
    keep_n: number | null;
    older_than: string | null;
    name_regex_delete: string | null;
    name_regex_keep: string | null;
    next_run_at: string;
  };
  updated_at: string;
  creator_id: number;
  import_url: string | null;
  import_type: string | null;
  import_status: string;
  import_error: string | null;
  permissions: {
    project_access: {
      access_level: number;
      notification_level: number;
    };
    group_access: {
      access_level: number;
      notification_level: number;
    };
  };
  archived: boolean;
  license_url: string;
  license: ProjectLicenseSchema;
  shared_runners_enabled: boolean;
  group_runners_enabled: boolean;
  runners_token: string;
  ci_default_git_depth: number;
  ci_forward_deployment_enabled: boolean;
  ci_forward_deployment_rollback_allowed: boolean;
  ci_allow_fork_pipelines_to_run_in_parent_project: boolean;
  ci_separated_caches: boolean;
  ci_restrict_pipeline_cancellation_role: string;
  public_jobs: boolean;
  shared_with_groups:
    | {
        group_id: number;
        group_name: string;
        group_full_path: string;
        group_access_level: number;
      }[]
    | null;
  repository_storage: string;
  only_allow_merge_if_pipeline_succeeds: boolean;
  allow_merge_on_skipped_pipeline: boolean;
  ci_pipeline_variables_minimum_override_role: boolean;
  only_allow_merge_if_all_discussions_are_resolved: boolean;
  remove_source_branch_after_merge: boolean;
  printing_merge_requests_link_enabled: boolean;
  request_access_enabled: boolean;
  merge_method: string;
  squash_option: string;
  auto_devops_enabled: boolean;
  auto_devops_deploy_strategy: string;
  mirror: boolean;
  mirror_user_id: number;
  mirror_trigger_builds: boolean;
  only_mirror_protected_branches: boolean;
  mirror_overwrites_diverged_branches: boolean;
  external_authorization_classification_label: string | null;
  packages_enabled: boolean;
  service_desk_enabled: boolean;
  service_desk_address: string | null;
  autoclose_referenced_issues: boolean;
  suggestion_commit_message: string | null;
  enforce_auth_checks_on_uploads: boolean;
  merge_commit_template: string | null;
  squash_commit_template: string | null;
  issue_branch_template: string;
  marked_for_deletion_on: string;
  compliance_frameworks: string[] | null;
  warn_about_potentially_unwanted_characters: boolean;
  container_registry_image_prefix: string;
  _links: {
    self: string;
    issues: string;
    merge_requests: string;
    repo_branches: string;
    labels: string;
    events: string;
    members: string;
    cluster_agents: string;
  };
}

export interface ProjectFileUploadSchema extends Record<string, unknown> {
  alt: string;
  url: string;
  full_path: string;
  markdown: string;
}

export type AllProjectsOptions = {
  userId?: string;
  archived?: boolean;
  idAfter?: number;
  idBefore?: number;
  imported?: boolean;
  includeHidden?: boolean;
  includePendingDelete?: boolean;
  lastActivityAfter?: string;
  lastActivityBefore?: string;
  membership?: boolean;
  minAccessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
  orderBy?:
    | 'id'
    | 'name'
    | 'path'
    | 'created_at'
    | 'updated_at'
    | 'last_activity_at'
    | 'similarity'
    | 'repository_size'
    | 'storage_size'
    | 'packages_size'
    | 'wiki_size';
  owned?: boolean;
  repositoryChecksumFailed?: boolean;
  repositoryStorage?: string;
  searchNamespaces?: boolean;
  search?: string;
  simple?: boolean;
  sort?: 'asc' | 'desc';
  starred?: boolean;
  statistics?: boolean;
  topic?: string;
  topicId?: number;
  visibility?: 'public' | 'internal' | 'private';
  wikiChecksumFailed?: boolean;
  withCustomAttributes?: boolean;
  withIssuesEnabled?: boolean;
  withMergeRequestsEnabled?: boolean;
  withProgrammingLanguage?: string;
  updatedBefore?: string;
  updatedAfter?: string;
  markedForDeletionOn?: string;
  active?: boolean;
};

export type CreateProjectOptions = {
  userId?: number;
  avatar?: { content: Blob; filename: string };
  allowMergeOnSkippedPipeline?: boolean;
  onlyAllowMergeIfAllStatusChecksPassed?: boolean;
  analyticsAccessLevel?: AccessLevelSettingState;
  approvalsBeforeMerge?: number;
  autoCancelPendingPipelines?: string;
  autoDevopsDeployStrategy?: 'continuous' | 'manual' | 'timed_incremental';
  autoDevopsEnabled?: boolean;
  autocloseReferencedIssues?: boolean;
  buildGitStrategy?: string;
  buildTimeout?: number;
  buildsAccessLevel?: AccessLevelSettingState;
  ciConfigPath?: string;
  ciDeletePipelinesInSeconds?: number;
  containerExpirationPolicyAttributes?: Record<string, string>;
  containerRegistryAccessLevel?: AccessLevelSettingState;
  defaultBranch?: string;
  description?: string;
  emailsDisabled?: boolean;
  externalAuthorizationClassificationLabel?: string;
  forkingAccessLevel?: AccessLevelSettingState;
  groupWithProjectTemplatesId?: number;
  importUrl?: string;
  initializeWithReadme?: boolean;
  issuesAccessLevel?: AccessLevelSettingState;
  lfsEnabled?: boolean;
  mergeMethod?: string;
  mergePipelinesEnabled?: boolean;
  mergeRequestsAccessLevel?: AccessLevelSettingState;
  mergeTrainsEnabled?: boolean;
  mirrorTriggerBuilds?: boolean;
  mirror?: boolean;
  namespaceId?: number;
  onlyAllowMergeIfAllDiscussionsAreResolved?: boolean;
  onlyAllowMergeIfPipelineSucceeds?: boolean;
  packagesEnabled?: boolean;
  pagesAccessLevel?: AccessLevelSettingState | 'public';
  printingMergeRequestLinkEnabled?: boolean;
  publicBuilds?: boolean;
  releasesAccessLevel?: AccessLevelSettingState;
  environmentsAccessLevel?: AccessLevelSettingState;
  featureFlagsAccessLevel?: AccessLevelSettingState;
  infrastructureAccessLevel?: AccessLevelSettingState;
  monitorAccessLevel?: AccessLevelSettingState;
  removeSourceBranchAfterMerge?: boolean;
  repositoryAccessLevel?: AccessLevelSettingState;
  repositoryStorage?: string;
  requestAccessEnabled?: boolean;
  requirementsAccessLevel?: AccessLevelSettingState;
  resolveOutdatedDiffDiscussions?: boolean;
  securityAndComplianceAccessLevel?: AccessLevelSettingState;
  sharedRunnersEnabled?: boolean;
  groupRunnersEnabled?: boolean;
  snippetsAccessLevel?: AccessLevelSettingState;
  squashOption?: 'never' | 'always' | 'default_on' | 'default_off';
  templateName?: string;
  templateProjectId?: number;
  topics?: string[];
  useCustomTemplate?: boolean;
  visibility?: 'public' | 'internal' | 'private';
  wikiAccessLevel?: AccessLevelSettingState;
};

export type EditProjectOptions = {
  avatar?: { content: Blob; filename: string };
  allowMergeOnSkippedPipeline?: boolean;
  allowPipelineTriggerApproveDeployment?: boolean;
  onlyAllowMergeIfAllStatusChecksPassed?: boolean;
  analyticsAccessLevel?: AccessLevelSettingState;
  approvalsBeforeMerge?: number;
  autoCancelPendingPipelines?: string;
  autoDevopsDeployStrategy?: 'continuous' | 'manual' | 'timed_incremental';
  autoDevopsEnabled?: boolean;
  autocloseReferencedIssues?: boolean;
  buildGitStrategy?: string;
  buildTimeout?: number;
  buildsAccessLevel?: AccessLevelSettingState;
  ciConfigPath?: string;
  ciDefaultGitDepth?: number;
  ciForwardDeploymentEnabled?: boolean;
  ciAllowForkPipelinesToRunInParentProject?: boolean;
  ciSeparatedCaches?: boolean;
  ciDeletePipelinesInSeconds?: number;
  containerExpirationPolicyAttributes?: Record<string, string>;
  containerRegistryAccessLevel?: string;
  defaultBranch?: string;
  description?: string;
  emailsDisabled?: boolean;
  enforceAuthChecksOnUploads?: boolean;
  externalAuthorizationClassificationLabel?: string;
  forkingAccessLevel?: AccessLevelSettingState;
  importUrl?: string;
  issuesAccessLevel?: AccessLevelSettingState;
  issuesTemplate?: string;
  keepLatestArtifact?: boolean;
  lfsEnabled?: boolean;
  mergeCommitTemplate?: string;
  mergeMethod?: string;
  mergePipelinesEnabled?: boolean;
  mergeRequestsAccessLevel?: AccessLevelSettingState;
  mergeRequestsTemplate?: string;
  mergeTrainsEnabled?: boolean;
  mirrorOverwritesDivergedBranches?: boolean;
  mirrorTriggerBuilds?: boolean;
  mirrorUserId?: number;
  mirror?: boolean;
  mrDefaultTargetSelf?: boolean;
  name?: string;
  onlyAllowMergeIfAllDiscussionsAreResolved?: boolean;
  onlyAllowMergeIfPipelineSucceeds?: boolean;
  onlyMirrorProtectedBranches?: boolean;
  packagesEnabled?: boolean;
  pagesAccessLevel?: string;
  path?: string;
  printingMergeRequestLinkEnabled?: boolean;
  publicBuilds?: boolean;
  releasesAccessLevel?: AccessLevelSettingState;
  environmentsAccessLevel?: AccessLevelSettingState;
  featureFlagsAccessLevel?: AccessLevelSettingState;
  infrastructureAccessLevel?: AccessLevelSettingState;
  monitorAccessLevel?: AccessLevelSettingState;
  removeSourceBranchAfterMerge?: boolean;
  repositoryAccessLevel?: AccessLevelSettingState;
  repositoryStorage?: string;
  requestAccessEnabled?: boolean;
  requirementsAccessLevel?: AccessLevelSettingState;
  resolveOutdatedDiffDiscussions?: boolean;
  restrictUserDefinedVariables?: boolean;
  securityAndComplianceAccessLevel?: AccessLevelSettingState;
  serviceDeskEnabled?: boolean;
  sharedRunnersEnabled?: boolean;
  groupRunnersEnabled?: boolean;
  snippetsAccessLevel?: AccessLevelSettingState;
  issueBranchTemplate?: string;
  squashCommitTemplate?: string;
  squashOption?: 'never' | 'always' | 'default_on' | 'default_off';
  suggestionCommitMessage?: string;
  topics?: string[];
  visibility?: 'public' | 'internal' | 'private';
  wikiAccessLevel?: AccessLevelSettingState;
};

export type ForkProjectOptions = {
  branches?: string;
  description?: string;
  mrDefaultTargetSelf?: boolean;
  name?: string;
  namespaceId?: number;
  namespacePath?: string;
  namespace?: number | string;
  path?: string;
  visibility?: 'public' | 'internal' | 'private';
};

export type AllForksOptions = {
  archived?: boolean;
  membership?: boolean;
  minAccessLevel?: AccessLevelSettingState;
  orderBy?: 'id' | 'name' | 'path' | 'created_at' | 'updated_at' | 'last_activity_at';
  owned?: boolean;
  search?: string;
  simple?: boolean;
  sort?: 'asc' | 'desc';
  starred?: boolean;
  statistics?: boolean;
  visibility?: 'public' | 'internal' | 'private';
  withCustomAttributes?: boolean;
  withIssuesEnabled?: boolean;
  withMergeRequestsEnabled?: boolean;
  updatedBefore?: string;
  updatedAfter?: string;
};

export class Projects<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: { withCustomAttributes: true } & AllProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<
    GitlabAPIResponse<({ custom_attributes: CustomAttributeSchema[] } & ProjectSchema)[], C, E, P>
  >;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: { simple: true } & AllProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: { statistics: true } & AllProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<
    GitlabAPIResponse<({ statistics: ProjectStatisticsSchema } & ProjectSchema)[], C, E, P>
  >;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: { statistics: true; withCustomAttributes: true } & AllProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<
    GitlabAPIResponse<
      ({
        statistics: ProjectStatisticsSchema;
        custom_attributes: CustomAttributeSchema[];
      } & ProjectSchema)[],
      C,
      E,
      P
    >
  >;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: AllProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: AllProjectsOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<Record<string, unknown>[], C, E, P>> {
    const { userId, starredOnly, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    let uri: string;

    if (userId && starredOnly) uri = endpoint`users/${userId}/starred_projects`;
    else if (userId) uri = endpoint`users/${userId}/projects`;
    else uri = 'projects';

    return RequestHelper.get<Record<string, unknown>[]>()(this, uri, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  allTransferLocations<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { search?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SimpleGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/transfer_locations`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  allUsers<E extends boolean = false>(
    projectId: string | number,
    options?: { search?: string; skipUsers?: number[] } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MappedOmit<SimpleUserSchema, 'created_at'>[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<MappedOmit<SimpleUserSchema, 'created_at'>[]>()(
      this,
      endpoint`projects/${projectId}/users`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  allGroups<E extends boolean = false>(
    projectId: string | number,
    options?: {
      search?: string;
      skipGroups?: number[];
      withShared?: boolean;
      sharedMinAccessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
      sharedVisibleOnly?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<SimpleGroupSchema[]>()(this, endpoint`projects/${projectId}/groups`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  allInvitedGroups<E extends boolean = false>(
    projectId: string | number,
    options?: {
      search?: string;
      sharedMinAccessLevel?: Exclude<AccessLevel, AccessLevel.ADMIN>;
      relation?: 'direct' | 'inherited';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<SimpleGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/invited_groups`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  allSharableGroups<E extends boolean = false>(
    projectId: string | number,
    options?: {
      search?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<SimpleGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/share_locations`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  allForks<E extends boolean = false>(
    projectId: string | number,
    options: { simple: true } & AllForksOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, void>>;

  allForks<E extends boolean = false>(
    projectId: string | number,
    options: { statistics: true } & AllForksOptions & ShowExpanded<E> & Sudo,
  ): Promise<
    GitlabAPIResponse<({ statistics: ProjectStatisticsSchema } & ProjectSchema)[], C, E, void>
  >;

  allForks<E extends boolean = false>(
    projectId: string | number,
    options?: AllForksOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, void>>;

  allForks<E extends boolean = false>(
    projectId: string | number,
    options?: AllForksOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Record<string, unknown>[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<Record<string, unknown>[]>()(
      this,
      endpoint`projects/${projectId}/forks`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  allStarrers<E extends boolean = false>(
    projectId: string | number,
    options?: { search?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectStarrerSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<ProjectStarrerSchema[]>()(
      this,
      endpoint`projects/${projectId}/starrers`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  allStoragePaths<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectStoragePath[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ProjectStoragePath[]>()(
      this,
      endpoint`projects/${projectId}/storage`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  archive<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ProjectSchema>()(this, endpoint`projects/${projectId}/archive`, {
      sudo,
      showExpanded,
    });
  }

  create<E extends boolean = false>(
    {
      userId,
      avatar,
      ...options
    }: CreateProjectOptions &
      ShowExpanded<E> &
      SomeOf<{ name: string; path: string }> &
      Sudo = {} as any,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options;
    const url = getPrefixedUrl('', { projects: true, user: userId });

    return RequestHelper.post<ProjectSchema>()(this, url, {
      sudo,
      showExpanded,
      body: avatar
        ? createFormData({
            ...body,
            avatar: [avatar.content, avatar.filename],
          })
        : body,
    });
  }

  createForkRelationship<E extends boolean = false>(
    projectId: string | number,
    forkedFromId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/fork/${forkedFromId}`, {
      sudo,
      showExpanded,
    });
  }

  // Helper method - Duplicated from ProjectRemoteMirrors
  createPullMirror<E extends boolean = false>(
    projectId: string | number,
    importUrl: string,
    mirror: boolean,
    options?: {
      mirrorTriggerBuilds?: boolean;
      mirrorBranchRegex?: string;
      onlyProtectedBranches?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectRemoteMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/mirror/pull`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          importUrl,
          mirror,
        },
      },
    );
  }

  downloadSnapshot<E extends boolean = false>(
    projectId: string | number,
    options?: { wiki?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<Blob>()(this, endpoint`projects/${projectId}/snapshot`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    { avatar, ...options }: EditProjectOptions & ShowExpanded<E> & Sudo = {} as any,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options;
    const url = endpoint`projects/${projectId}`;

    return RequestHelper.put<ProjectSchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        sudo,
        showExpanded,
        body: avatar
          ? createFormData({
              ...body,
              avatar: [avatar.content, avatar.filename],
            })
          : body,
      },
    });
  }

  fork<E extends boolean = false>(
    projectId: string | number,
    options?: ForkProjectOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectSchema>()(this, endpoint`projects/${projectId}/fork`, {
      sudo,
      showExpanded,
      body,
    });
  }

  housekeeping<E extends boolean = false>(
    projectId: string | number,
    options?: { task?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/housekeeping`, {
      sudo,
      showExpanded,
      body,
    });
  }

  importProjectMembers<E extends boolean = false>(
    projectId: string | number,
    sourceProjectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/import_project_members/${sourceProjectId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: { permanentlyRemove?: boolean; fullPath?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  removeForkRelationship<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/fork`, {
      sudo,
      showExpanded,
    });
  }

  removeAvatar<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<void>()(this, endpoint`projects/${projectId}`, {
      sudo,
      showExpanded,
      body: {
        avatar: '',
      },
    });
  }

  restore<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/restore`, {
      sudo,
      showExpanded,
    });
  }

  search<E extends boolean = false>(
    projectName: string,
    options?: {
      sort?: 'asc' | 'desc';
      orderBy?: 'id' | 'name' | 'created_at' | 'last_activity_at';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<ProjectSchema[]>()(this, endpoint`projects`, {
      sudo,
      showExpanded,
      searchParams: {
        ...searchParams,
        search: projectName,
      },
    });
  }

  share<E extends boolean = false>(
    projectId: string | number,
    groupId: string | number,
    groupAccess: number,
    options?: { expiresAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/share`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        groupId,
        groupAccess,
      },
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    options: { license: true } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ license: ProjectLicenseSchema } & ProjectSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    options: { withCustomAttributes: true } & ShowExpanded<E> & Sudo,
  ): Promise<
    GitlabAPIResponse<{ custom_attributes: CustomAttributeSchema[] } & ProjectSchema, C, E, void>
  >;

  show<E extends boolean = false>(
    projectId: string | number,
    options: { statistics: true } & ShowExpanded<E> & Sudo,
  ): Promise<
    GitlabAPIResponse<{ statistics: ProjectStatisticsSchema } & ProjectSchema, C, E, void>
  >;

  show<E extends boolean = false>(
    projectId: string | number,
    options: { withCustomAttributes: true; license: true } & ShowExpanded<E> & Sudo,
  ): Promise<
    GitlabAPIResponse<
      { custom_attributes: CustomAttributeSchema[]; license: ProjectLicenseSchema } & ProjectSchema,
      C,
      E,
      void
    >
  >;

  show<E extends boolean = false>(
    projectId: string | number,
    options: { withCustomAttributes: true; statistics: true } & ShowExpanded<E> & Sudo,
  ): Promise<
    GitlabAPIResponse<
      {
        custom_attributes: CustomAttributeSchema[];
        statistics: ProjectStatisticsSchema;
      } & ProjectSchema,
      C,
      E,
      void
    >
  >;

  show<E extends boolean = false>(
    projectId: string | number,
    options: { license: true; statistics: true } & ShowExpanded<E> & Sudo,
  ): Promise<
    GitlabAPIResponse<
      { license: ProjectLicenseSchema; statistics: ProjectStatisticsSchema } & ProjectSchema,
      C,
      E,
      void
    >
  >;

  show<E extends boolean = false>(
    projectId: string | number,
    options: { withCustomAttributes: true; license: true; statistics: true } & ShowExpanded<E> &
      Sudo,
  ): Promise<
    GitlabAPIResponse<
      {
        custom_attributes: CustomAttributeSchema[];
        license: ProjectLicenseSchema;
        statistics: ProjectStatisticsSchema;
      } & ProjectSchema,
      C,
      E,
      void
    >
  >;

  show<E extends boolean = false>(
    projectId: string | number,
    options?: {
      license?: boolean;
      statistics?: boolean;
      withCustomAttributes?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    options?: {
      license?: boolean;
      statistics?: boolean;
      withCustomAttributes?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<ProjectSchema>()(this, endpoint`projects/${projectId}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  showLanguages<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ [name: string]: number }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<{ [name: string]: number }>()(
      this,
      endpoint`projects/${projectId}/languages`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showPullMirror<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ProjectRemoteMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/mirror/pull`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  star<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ProjectSchema>()(this, endpoint`projects/${projectId}/star`, {
      sudo,
      showExpanded,
    });
  }

  transfer<E extends boolean = false>(
    projectId: string | number,
    namespaceId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<ProjectSchema>()(this, endpoint`projects/${projectId}/transfer`, {
      sudo,
      showExpanded,
      body: {
        namespace: namespaceId,
      },
    });
  }

  unarchive<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ProjectSchema>()(this, endpoint`projects/${projectId}/unarchive`, {
      sudo,
      showExpanded,
    });
  }

  unshare<E extends boolean = false>(
    projectId: string | number,
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/share/${groupId}`, {
      sudo,
      showExpanded,
    });
  }

  unstar<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ProjectSchema>()(this, endpoint`projects/${projectId}/unstar`, {
      sudo,
      showExpanded,
    });
  }

  /* Upload file to be used a reference within an issue, merge request or
     comment
  */
  uploadForReference<E extends boolean = false>(
    projectId: string | number,
    file: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectFileUploadSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ProjectFileUploadSchema>()(
      this,
      endpoint`projects/${projectId}/uploads`,
      {
        sudo,
        showExpanded,
        body: createFormData({
          file: [file.content, file.filename],
        }),
      },
    );
  }

  uploadAvatar<E extends boolean = false>(
    projectId: string | number,
    avatar: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ avatar_url: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<{ avatar_url: string }>()(this, endpoint`projects/${projectId}`, {
      sudo,
      showExpanded,
      body: createFormData({
        avatar: [avatar.content, avatar.filename],
      }),
    });
  }
}
