import FormData from 'form-data';
import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { EventOptions } from './Events';
import { GroupSchema } from './Groups';
import { UploadMetadata } from './ProjectImportExport';
import { UserSchema } from './Users';

// ref: https://docs.gitlab.com/12.6/ee/api/namespaces.html#list-namespaces
export interface NamespaceInfoSchema {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  parent_id?: number;
  avatar_url: string;
  web_url: string;
}

// Ref: https://docs.gitlab.com/12.6/ee/api/projects.html#list-all-projects
export interface ProjectSchema {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: Date;
  default_branch: string;
  tag_list: string[];
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  avatar_url: string;
  star_count: number;
  forks_count: number;
  last_activity_at: Date;
  empty_repo: boolean;
  archived: boolean;
  visibility: string;
  resolve_outdated_diff_discussions: boolean;
  container_registry_enabled: boolean;
  issues_enabled: boolean;
  merge_requests_enabled: boolean;
  wiki_enabled: boolean;
  jobs_enabled: boolean;
  snippets_enabled: boolean;
  issues_access_level: string;
  repository_access_level: string;
  merge_requests_access_level: string;
  wiki_access_level: string;
  builds_access_level: string;
  snippets_access_level: string;
  shared_runners_enabled: boolean;
  lfs_enabled: boolean;
  creator_id: number;
  import_status: string;
  open_issues_count: number;
  ci_default_git_depth: number;
  build_timeout: number;
  public_jobs: boolean;
  auto_cancel_pending_pipelines?: string;
  build_coverage_regex?: string;
  ci_config_path?: string;
  shared_with_groups: GroupSchema[];
  only_allow_merge_if_pipeline_succeeds: boolean;
  request_access_enabled: boolean;
  only_allow_merge_if_all_discussions_are_resolved: boolean;
  remove_source_branch_after_merge: boolean;
  printing_merge_request_link_enabled: boolean;
  merge_method: string;
  auto_devops_enabled: boolean;
  auto_devops_deploy_strategy: string;
  namespace: NamespaceInfoSchema;
  owner: UserSchema;
}

export class Projects extends BaseService {
  all(options?: PaginatedRequestOptions): Promise<ProjectSchema[]> {
    return RequestHelper.get(this, 'projects', options) as Promise<ProjectSchema[]>;
  }

  archive(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/archive`, options);
  }

  create({ userId, ...options }: { userId?: number } & BaseRequestOptions) {
    const url = userId ? `projects/user/${encodeURIComponent(userId)}` : 'projects';

    return RequestHelper.post(this, url, options);
  }

  edit(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}`, options);
  }

  events(projectId: string | number, options?: BaseRequestOptions & EventOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/events`, options);
  }

  fork(
    projectId: string | number,
    { forkedFromId, ...options }: { forkedFromId?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);
    let url = `projects/${pId}/fork`;

    if (forkedFromId) url += `/${encodeURIComponent(forkedFromId)}`;

    return RequestHelper.post(this, url, options);
  }

  forks(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/forks`, options);
  }

  languages(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/languages`, options);
  }

  mirrorPull(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/mirror/pull`, options);
  }

  remove(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}`, options);
  }

  removeFork(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/fork`, options);
  }

  search(projectName: string) {
    return RequestHelper.get(this, 'projects', { search: projectName });
  }

  share(
    projectId: string | number,
    groupId: string | number,
    groupAccess: number,
    options?: BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/share`, { groupId, groupAccess, ...options });
  }

  show(projectId: string | number, options?: BaseRequestOptions): Promise<ProjectSchema> {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}`, options) as Promise<ProjectSchema>;
  }

  star(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/star`, options);
  }

  statuses(projectId: string | number, sha: string, state: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, { state, ...options });
  }

  transfer(projectId: string | number, namespaceId: string | number) {
    const pId = encodeURIComponent(projectId);
    return RequestHelper.put(this, `projects/${pId}/transfer`, { namespace: namespaceId });
  }

  unarchive(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/unarchive`, options);
  }

  unshare(projectId: string | number, groupId: string | number, options?: Sudo) {
    const [pId, gId] = [projectId, groupId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/share/${gId}`, options);
  }

  unstar(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/unstar`, options);
  }

  upload(projectId, content, { metadata, sudo }: { metadata?: UploadMetadata } & Sudo = {}) {
    const pId = encodeURIComponent(projectId);
    const form = new FormData();

    const defaultMetadata: UploadMetadata = {
      filename: Date.now().toString(),
      contentType: 'application/octet-stream',
    };

    form.append('file', content, Object.assign(defaultMetadata, metadata));

    return RequestHelper.post(this, `projects/${pId}/uploads`, { sudo, form });
  }
}
