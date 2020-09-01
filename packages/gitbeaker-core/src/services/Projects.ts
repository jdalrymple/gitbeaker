import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { EventOptions } from './Events';
import { UploadMetadata, defaultMetadata } from './ProjectImportExport';

export interface NamespaceInfoSchemaDefault {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
}

export interface NamespaceInfoSchemaCamelize {
  id: number;
  name: string;
  path: string;
  kind: string;
  fullPath: string;
}

export interface ProjectSchemaDefault {
  id: number;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  namespace: NamespaceInfoSchemaDefault;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  archived: boolean;
}

export interface ProjectSchemaCamelized {
  id: number;
  name: string;
  nameWithNamespace: string;
  path: string;
  pathWithNamespace: string;
  namespace: NamespaceInfoSchemaCamelize;
  sshUrlToRepo: string;
  httpUrlToRepo: string;
  archived: boolean;
}

export type ProjectSchema = ProjectSchemaDefault | ProjectSchemaCamelized;

export class Projects extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'projects', options) as Promise<ProjectSchema[]>;
  }

  archive(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/archive`, options);
  }

  create({
    userId,
    ...options
  }: ({ name: string } | { path: string }) & { userId?: number } & BaseRequestOptions) {
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

  search(projectName: string, options?: BaseRequestOptions) {
    return RequestHelper.get(this, 'projects', { search: projectName, ...options }) as Promise<
      ProjectSchema[]
    >;
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

  show(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}`, options);
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

  upload(
    projectId,
    content,
    { metadata, ...options }: { metadata?: UploadMetadata } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/uploads`, {
      isForm: true,
      file: [content, { ...defaultMetadata, ...metadata }],
      ...options,
    });
  }
}
