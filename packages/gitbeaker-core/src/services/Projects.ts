import { BaseService } from '@gitbeaker/requester-utils';

import { defaultMetadata } from './ProjectImportExport';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import {
  ProjectSchema,
  ProjectExtendedSchema,
  ProjectFileUploadSchema,
  UploadMetadata,
} from '../models';

export class Projects<C extends boolean = false> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<ProjectSchema[]>()(this, 'projects', options);
  }

  archive(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ProjectExtendedSchema>()(this, `projects/${pId}/archive`, options);
  }

  create({
    userId,
    ...options
  }: ({ name: string } | { path: string }) & { userId?: number } & BaseRequestOptions) {
    const url = userId ? `projects/user/${encodeURIComponent(userId)}` : 'projects';

    return RequestHelper.post<ProjectExtendedSchema>()(this, url, options);
  }

  edit(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put<ProjectExtendedSchema>()(this, `projects/${pId}`, options);
  }

  fork(
    projectId: string | number,
    { forkedFromId, ...options }: { forkedFromId?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);
    let url = `projects/${pId}/fork`;

    if (forkedFromId) url += `/${encodeURIComponent(forkedFromId)}`;

    return RequestHelper.post<ProjectExtendedSchema>()(this, url, options);
  }

  forks(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ProjectExtendedSchema[]>()(this, `projects/${pId}/forks`, options);
  }

  languages(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<{ [name: string]: number }>()(
      this,
      `projects/${pId}/languages`,
      options,
    );
  }

  mirrorPull(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post()(this, `projects/${pId}/mirror/pull`, options);
  }

  remove(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del()(this, `projects/${pId}`, options);
  }

  removeFork(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del()(this, `projects/${pId}/fork`, options);
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
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post()(this, `projects/${pId}/share`, {
      groupId,
      groupAccess,
      ...options,
    });
  }

  show(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ProjectExtendedSchema>()(this, `projects/${pId}`, options);
  }

  star(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ProjectExtendedSchema>()(this, `projects/${pId}/star`, options);
  }

  transfer(projectId: string | number, namespaceId: string | number) {
    const pId = encodeURIComponent(projectId);
    return RequestHelper.put<ProjectExtendedSchema>()(this, `projects/${pId}/transfer`, {
      namespace: namespaceId,
    });
  }

  unarchive(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ProjectExtendedSchema>()(this, `projects/${pId}/unarchive`, options);
  }

  unshare(projectId: string | number, groupId: string | number, options?: Sudo) {
    const [pId, gId] = [projectId, groupId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/share/${gId}`, options);
  }

  unstar(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ProjectExtendedSchema>()(this, `projects/${pId}/unstar`, options);
  }

  upload(
    projectId: string | number,
    content: string,
    { metadata, ...options }: { metadata?: UploadMetadata } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ProjectFileUploadSchema>()(this, `projects/${pId}/uploads`, {
      isForm: true,
      file: [content, { ...defaultMetadata, ...metadata }],
      ...options,
    });
  }
}
