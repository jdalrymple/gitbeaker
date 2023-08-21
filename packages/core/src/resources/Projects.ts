import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  MappedOmit,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ProjectRemoteMirrorSchema } from './ProjectRemoteMirrors';
import type { UserSchema } from './Users';
import type { CondensedNamespaceSchema } from './Namespaces';
import type { SimpleGroupSchema } from './Groups';
import type { AccessLevel } from '../templates/ResourceAccessRequests';
import type { CustomAttributeSchema } from '../templates/ResourceCustomAttributes';

export interface ProjectStarrerSchema extends Record<string, unknown> {
  starred_since: string;
  user: MappedOmit<UserSchema, 'created_at'>;
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

export interface CondensedProjectSchema extends Record<string, unknown> {
  id: number;
  web_url: string;
  name: string;
  path: string;
}

export interface SimpleProjectSchema extends CondensedProjectSchema {
  description: string;
  name_with_namespace: string;
  path_with_namespace: string;
  created_at: string;
  default_branch: string;
  topics?: string[];
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  readme_url: string;
  forks_count: number;
  avatar_url?: string;
  star_count: number;
  last_activity_at: string;
  namespace: CondensedNamespaceSchema;
}

export interface ProjectSchema extends SimpleProjectSchema {
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
  packages_enabled: boolean;
  empty_repo: boolean;
  archived: boolean;
  visibility: string;
  owner: Pick<UserSchema, 'id' | 'name' | 'created_at'>;
  resolve_outdated_diff_discussions: boolean;
  container_expiration_policy: {
    cadence: string;
    enabled: boolean;
    keep_n: number;
    older_than: string;
    name_regex: string;
    name_regex_keep?: null;
    next_run_at: string;
  };
  issues_enabled: boolean;
  merge_requests_enabled: boolean;
  wiki_enabled: boolean;
  jobs_enabled: boolean;
  snippets_enabled: boolean;
  container_registry_enabled: boolean;
  service_desk_enabled: boolean;
  can_create_merge_request_in: boolean;
  issues_access_level: string;
  repository_access_level: string;
  merge_requests_access_level: string;
  forking_access_level: string;
  wiki_access_level: string;
  builds_access_level: string;
  snippets_access_level: string;
  pages_access_level: string;
  analytics_access_level: string;
  container_registry_access_level: string;
  security_and_compliance_access_level: string;
  releases_access_level: string;
  environments_access_level: string;
  feature_flags_access_level: string;
  infrastructure_access_level: string;
  monitor_access_level: string;
  emails_disabled?: boolean;
  shared_runners_enabled: boolean;
  lfs_enabled: boolean;
  creator_id: number;
  import_status: string;
  open_issues_count: number;
  description_html: string;
  updated_at: string;
  ci_config_path: string;
  public_jobs: boolean;
  shared_with_groups?: string[];
  only_allow_merge_if_pipeline_succeeds: boolean;
  allow_merge_on_skipped_pipeline?: boolean;
  request_access_enabled: boolean;
  only_allow_merge_if_all_discussions_are_resolved: boolean;
  remove_source_branch_after_merge: boolean;
  printing_merge_request_link_enabled: boolean;
  merge_method: string;
  squash_option: string;
  enforce_auth_checks_on_uploads: boolean;
  suggestion_commit_message?: string;
  merge_commit_template?: string;
  squash_commit_template?: string;
  issue_branch_template?: string;
  autoclose_referenced_issues: boolean;
  external_authorization_classification_label: string;
  requirements_enabled: boolean;
  requirements_access_level: string;
  security_and_compliance_enabled: boolean;
  compliance_frameworks?: string[];
  permissions: {
    project_access?: null;
    group_access?: null;
  };
}

export interface ProjectFileUploadSchema extends Record<string, unknown> {
  alt: string;
  url: string;
  full_path: string;
  markdown: string;
}

export type AllProjectsOptions = {
  archived?: boolean;
  idAfter?: number;
  idBefore?: number;
  imported?: boolean;
  lastActivityAfter?: string;
  lastActivityBefore?: string;
  membership?: boolean;
  minAccessLevel?: number;
  orderBy?: 'id' | 'name' | 'path' | 'created_at' | 'updated_at' | 'last_activity_at';
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
};

export type CreateProjectOptions = {
  userId?: number;
  avatar?: { content: Blob; filename: string };
  allowMergeOnSkippedPipeline?: boolean;
  onlyAllowMergeIfAllStatusChecksPassed?: boolean;
  analyticsAccessLevel?: 'disabled' | 'private' | 'enabled';
  approvalsBeforeMerge?: number;
  autoCancelPendingPipelines?: string;
  autoDevopsDeployStrategy?: 'continuous' | 'manual' | 'timed_incremental';
  autoDevopsEnabled?: boolean;
  autocloseReferencedIssues?: boolean;
  buildGitStrategy?: string;
  buildTimeout?: number;
  buildsAccessLevel?: 'disabled' | 'private' | 'enabled';
  ciConfigPath?: string;
  containerExpirationPolicyAttributes?: Record<string, string>;
  containerRegistryAccessLevel?: 'disabled' | 'private' | 'enabled';
  defaultBranch?: string;
  description?: string;
  emailsDisabled?: boolean;
  externalAuthorizationClassificationLabel?: string;
  forkingAccessLevel?: 'disabled' | 'private' | 'enabled';
  groupWithProjectTemplatesId?: number;
  importUrl?: string;
  initializeWithReadme?: boolean;
  issuesAccessLevel?: 'disabled' | 'private' | 'enabled';
  lfsEnabled?: boolean;
  mergeMethod?: string;
  mergePipelinesEnabled?: boolean;
  mergeRequestsAccessLevel?: 'disabled' | 'private' | 'enabled';
  mergeTrainsEnabled?: boolean;
  mirrorTriggerBuilds?: boolean;
  mirror?: boolean;
  namespaceId?: number;
  onlyAllowMergeIfAllDiscussionsAreResolved?: boolean;
  onlyAllowMergeIfPipelineSucceeds?: boolean;
  packagesEnabled?: boolean;
  pagesAccessLevel?: 'disabled' | 'private' | 'enabled' | 'public';
  printingMergeRequestLinkEnabled?: boolean;
  publicBuilds?: boolean;
  releasesAccessLevel?: 'disabled' | 'private' | 'enabled';
  environmentsAccessLevel?: 'disabled' | 'private' | 'enabled';
  featureFlagsAccessLevel?: 'disabled' | 'private' | 'enabled';
  infrastructureAccessLevel?: 'disabled' | 'private' | 'enabled';
  monitorAccessLevel?: 'disabled' | 'private' | 'enabled';
  removeSourceBranchAfterMerge?: boolean;
  repositoryAccessLevel?: 'disabled' | 'private' | 'enabled';
  repositoryStorage?: string;
  requestAccessEnabled?: boolean;
  requirementsAccessLevel?: 'disabled' | 'private' | 'enabled';
  resolveOutdatedDiffDiscussions?: boolean;
  securityAndComplianceAccessLevel?: 'disabled' | 'private' | 'enabled';
  sharedRunnersEnabled?: boolean;
  groupRunnersEnabled?: boolean;
  snippetsAccessLevel?: 'disabled' | 'private' | 'enabled';
  squashOption?: 'never' | 'always' | 'default_on' | 'default_off';
  templateName?: string;
  templateProjectId?: number;
  topics?: string[];
  useCustomTemplate?: boolean;
  visibility?: 'public' | 'internal' | 'private';
  wikiAccessLevel?: 'disabled' | 'private' | 'enabled';
};

export type EditProjectOptions = {
  avatar?: { content: Blob; filename: string };
  allowMergeOnSkippedPipeline?: boolean;
  allowPipelineTriggerApproveDeployment?: boolean;
  onlyAllowMergeIfAllStatusChecksPassed?: boolean;
  analyticsAccessLevel?: 'disabled' | 'private' | 'enabled';
  approvalsBeforeMerge?: number;
  autoCancelPendingPipelines?: string;
  autoDevopsDeployStrategy?: 'continuous' | 'manual' | 'timed_incremental';
  autoDevopsEnabled?: boolean;
  autocloseReferencedIssues?: boolean;
  buildGitStrategy?: string;
  buildTimeout?: number;
  buildsAccessLevel?: 'disabled' | 'private' | 'enabled';
  ciConfigPath?: string;
  ciDefaultGitDepth?: number;
  ciForwardDeploymentEnabled?: boolean;
  ciAllowForkPipelinesToRunInParentProject?: boolean;
  ciSeparatedCaches?: boolean;
  containerExpirationPolicyAttributes?: Record<string, string>;
  containerRegistryAccessLevel?: string;
  defaultBranch?: string;
  description?: string;
  emailsDisabled?: boolean;
  enforceAuthChecksOnUploads?: boolean;
  externalAuthorizationClassificationLabel?: string;
  forkingAccessLevel?: 'disabled' | 'private' | 'enabled';
  importUrl?: string;
  issuesAccessLevel?: 'disabled' | 'private' | 'enabled';
  issuesTemplate?: string;
  keepLatestArtifact?: boolean;
  lfsEnabled?: boolean;
  mergeCommitTemplate?: string;
  mergeMethod?: string;
  mergePipelinesEnabled?: boolean;
  mergeRequestsAccessLevel?: 'disabled' | 'private' | 'enabled';
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
  releasesAccessLevel?: 'disabled' | 'private' | 'enabled';
  environmentsAccessLevel?: 'disabled' | 'private' | 'enabled';
  featureFlagsAccessLevel?: 'disabled' | 'private' | 'enabled';
  infrastructureAccessLevel?: 'disabled' | 'private' | 'enabled';
  monitorAccessLevel?: 'disabled' | 'private' | 'enabled';
  removeSourceBranchAfterMerge?: boolean;
  repositoryAccessLevel?: 'disabled' | 'private' | 'enabled';
  repositoryStorage?: string;
  requestAccessEnabled?: boolean;
  requirementsAccessLevel?: 'disabled' | 'private' | 'enabled';
  resolveOutdatedDiffDiscussions?: boolean;
  restrictUserDefinedVariables?: boolean;
  securityAndComplianceAccessLevel?: 'disabled' | 'private' | 'enabled';
  serviceDeskEnabled?: boolean;
  sharedRunnersEnabled?: boolean;
  groupRunnersEnabled?: boolean;
  snippetsAccessLevel?: 'disabled' | 'private' | 'enabled';
  issueBranchTemplate?: string;
  squashCommitTemplate?: string;
  squashOption?: 'never' | 'always' | 'default_on' | 'default_off';
  suggestionCommitMessage?: string;
  topics?: string[];
  visibility?: 'public' | 'internal' | 'private';
  wikiAccessLevel?: 'disabled' | 'private' | 'enabled';
};

export type ForkProjectOptions = {
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
  minAccessLevel?: 'disabled' | 'private' | 'enabled';
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
    options: PaginationRequestOptions<P> &
      AllProjectsOptions &
      Sudo &
      ShowExpanded<E> & { withCustomAttributes: true },
  ): Promise<
    GitlabAPIResponse<(ProjectSchema & { custom_attributes: CustomAttributeSchema[] })[], C, E, P>
  >;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: PaginationRequestOptions<P> &
      AllProjectsOptions &
      Sudo &
      ShowExpanded<E> & { simple: true },
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options: PaginationRequestOptions<P> &
      AllProjectsOptions &
      Sudo &
      ShowExpanded<E> & { statistics: true },
  ): Promise<
    GitlabAPIResponse<(ProjectSchema & { statistics: ProjectStatisticsSchema })[], C, E, P>
  >;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    options?: PaginationRequestOptions<P> & AllProjectsOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'keyset'>(
    {
      userId,
      starredOnly,
      ...options
    }: { userId?: number; starredOnly?: boolean } & AllProjectsOptions &
      PaginationRequestOptions<P> &
      BaseRequestOptions<E> = {} as any,
  ): Promise<GitlabAPIResponse<Record<string, unknown>[], C, E, P>> {
    let uri: string;

    if (userId && starredOnly) uri = endpoint`users/${userId}/starred_projects`;
    else if (userId) uri = endpoint`users/${userId}/projects`;
    else uri = 'projects';

    return RequestHelper.get<Record<string, unknown>[]>()(this, uri, options);
  }

  allTransferLocations<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { search?: string } & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, P>> {
    return RequestHelper.get<SimpleGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/transfer_locations`,
      options,
    );
  }

  allUsers<E extends boolean = false>(
    projectId: string | number,
    options?: { search?: string; skipUsers?: number[] } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MappedOmit<UserSchema, 'created_at'>[], C, E, void>> {
    return RequestHelper.get<MappedOmit<UserSchema, 'created_at'>[]>()(
      this,
      endpoint`projects/${projectId}/users`,
      options,
    );
  }

  allGroups<E extends boolean = false>(
    projectId: string | number,
    options?: {
      search?: string;
      skipGroups?: number[];
      withShared?: boolean;
      sharedMinAccessLevel?: AccessLevel;
      sharedVisibleOnly?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, void>> {
    return RequestHelper.get<SimpleGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/groups`,
      options,
    );
  }

  allSharableGroups<E extends boolean = false>(
    projectId: string | number,
    options?: {
      search?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleGroupSchema[], C, E, void>> {
    return RequestHelper.get<SimpleGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/share_locations`,
      options,
    );
  }

  allForks<E extends boolean = false>(
    projectId: string | number,
    options: AllForksOptions & Sudo & ShowExpanded<E> & { simple: true },
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, void>>;

  allForks<E extends boolean = false>(
    projectId: string | number,
    options: AllForksOptions & Sudo & ShowExpanded<E> & { statistics: true },
  ): Promise<
    GitlabAPIResponse<(ProjectSchema & { statistics: ProjectStatisticsSchema })[], C, E, void>
  >;

  allForks<E extends boolean = false>(
    projectId: string | number,
    options?: AllForksOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, void>>;

  allForks<E extends boolean = false>(
    projectId: string | number,
    options?: AllForksOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, unknown>[], C, E, void>> {
    return RequestHelper.get<Record<string, unknown>[]>()(
      this,
      endpoint`projects/${projectId}/forks`,
      options,
    );
  }

  allStarrers<E extends boolean = false>(
    projectId: string | number,
    options?: { search?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectStarrerSchema[], C, E, void>> {
    return RequestHelper.get<ProjectStarrerSchema[]>()(
      this,
      endpoint`projects/${projectId}/starrers`,
      options,
    );
  }

  allStoragePaths<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectStoragePath[], C, E, void>> {
    return RequestHelper.get<ProjectStoragePath[]>()(
      this,
      endpoint`projects/${projectId}/storage`,
      options,
    );
  }

  archive<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    return RequestHelper.post<ProjectSchema>()(
      this,
      endpoint`projects/${projectId}/archive`,
      options,
    );
  }

  create<E extends boolean = false>(
    {
      userId,
      avatar,
      ...options
    }: OneOf<{ name: string; path: string }> &
      CreateProjectOptions &
      Sudo &
      ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const url = userId ? `projects/user/${userId}` : 'projects';

    if (avatar) {
      return RequestHelper.post<ProjectSchema>()(this, url, {
        ...options,
        isForm: true,
        avatar: [avatar.content, avatar.filename],
      });
    }

    return RequestHelper.post<ProjectSchema>()(this, url, { ...options, avatar });
  }

  createForkRelationship<E extends boolean = false>(
    projectId: string | number,
    forkedFromId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/fork/${forkedFromId}`,
      options,
    );
  }

  // Helper method - Duplicated from ProjectRemoteMirrors
  createPullMirror<E extends boolean = false>(
    projectId: string | number,
    url: string,
    mirror: boolean,
    options?: {
      mirrorTriggerBuilds?: boolean;
      mirrorBranchRegex?: string;
      onlyProtectedBranches?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema, C, E, void>> {
    return RequestHelper.post<ProjectRemoteMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/mirror/pull`,
      {
        importUrl: url,
        mirror,
        ...options,
      },
    );
  }

  downloadSnapshot<E extends boolean = false>(
    projectId: string | number,
    options?: { wiki?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(this, endpoint`projects/${projectId}/snapshot`, options);
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    { avatar, ...options }: EditProjectOptions & Sudo & ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    const url = endpoint`projects/${projectId}`;

    if (avatar) {
      return RequestHelper.put<ProjectSchema>()(this, url, {
        ...options,
        isForm: true,
        avatar: [avatar.content, avatar.filename],
      });
    }

    return RequestHelper.put<ProjectSchema>()(this, url, { ...options, avatar });
  }

  fork<E extends boolean = false>(
    projectId: string | number,
    options?: ForkProjectOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    return RequestHelper.post<ProjectSchema>()(this, endpoint`projects/${projectId}/fork`, options);
  }

  housekeeping<E extends boolean = false>(
    projectId: string | number,
    options?: { task?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/housekeeping`, options);
  }

  importProjectMembers<E extends boolean = false>(
    projectId: string | number,
    sourceProjectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/import_project_members/${sourceProjectId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: { permanentlyRemove?: boolean; fullPath?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}`, options);
  }

  removeForkRelationship<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/fork`, options);
  }

  removeAvatar<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(this, endpoint`projects/${projectId}`, {
      ...options,
      avatar: '',
    });
  }

  restore<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/restore`, options);
  }

  search<E extends boolean = false>(
    projectName: string,
    options?: {
      sort?: 'asc' | 'desc';
      orderBy?: 'id' | 'name' | 'created_at' | 'last_activity_at';
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, void>> {
    return RequestHelper.get<ProjectSchema[]>()(this, 'projects', {
      search: projectName,
      ...options,
    });
  }

  share<E extends boolean = false>(
    projectId: string | number,
    groupId: string | number,
    groupAccess: number,
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/share`, {
      groupId,
      groupAccess,
      ...options,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    options?: { license?: boolean; statistics?: boolean; withCustomAttributes?: boolean } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    return RequestHelper.get<ProjectSchema>()(this, endpoint`projects/${projectId}`, options);
  }

  showLanguages<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ [name: string]: number }, C, E, void>> {
    return RequestHelper.get<{ [name: string]: number }>()(
      this,
      endpoint`projects/${projectId}/languages`,
      options,
    );
  }

  showPullMirror<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectRemoteMirrorSchema, C, E, void>> {
    return RequestHelper.get<ProjectRemoteMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/mirror/pull`,
      options,
    );
  }

  star<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    return RequestHelper.post<ProjectSchema>()(this, endpoint`projects/${projectId}/star`, options);
  }

  transfer<E extends boolean = false>(
    projectId: string | number,
    namespaceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.put<ProjectSchema>()(this, endpoint`projects/${projectId}/transfer`, {
      ...options,
      namespace: namespaceId,
    });
  }

  unarchive<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    return RequestHelper.post<ProjectSchema>()(
      this,
      endpoint`projects/${projectId}/unarchive`,
      options,
    );
  }

  unshare<E extends boolean = false>(
    projectId: string | number,
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/share/${groupId}`, options);
  }

  unstar<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema, C, E, void>> {
    return RequestHelper.post<ProjectSchema>()(
      this,
      endpoint`projects/${projectId}/unstar`,
      options,
    );
  }

  /* Upload file to be used a reference within an issue, merge request or
     comment
  */
  uploadForReference<E extends boolean = false>(
    projectId: string | number,
    file: { content: Blob; filename: string },
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProjectFileUploadSchema, C, E, void>> {
    return RequestHelper.post<ProjectFileUploadSchema>()(
      this,
      endpoint`projects/${projectId}/uploads`,
      {
        ...options,
        isForm: true,
        file: [file.content, file.filename],
      },
    );
  }

  uploadAvatar<E extends boolean = false>(
    projectId: string | number,
    avatar: { content: Blob; filename: string },
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ avatar_url: string }, C, E, void>> {
    return RequestHelper.put<{ avatar_url: string }>()(this, endpoint`projects/${projectId}`, {
      ...options,
      isForm: true,
      avatar: [avatar.content, avatar.filename],
    });
  }
}
