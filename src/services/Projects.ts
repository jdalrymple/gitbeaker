import FormData from 'form-data';
import randomstring from 'randomstring';
import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  EventOptions,
  Sudo,
  ProjectId,
  UserId,
  GroupId,
  NamespaceId,
  ProjectUploadMetadata,
} from '../../types/types';

class Projects extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'projects', options);
  }

  archive(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/archive`, options);
  }

  create({ userId, ...options }: { userId?: UserId } & BaseRequestOptions) {
    const url = userId ? `projects/user/${encodeURIComponent(userId)}` : 'projects';

    return RequestHelper.post(this, url, options);
  }

  edit(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}`, options);
  }

  events(projectId: ProjectId, options?: BaseRequestOptions & EventOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/events`, options);
  }

  fork(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/fork`, options);
  }

  forks(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/forks`, options);
  }

  languages(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/languages`, options);
  }

  mirrorPull(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/mirror/pull`, options);
  }

  remove(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}`, options);
  }

  removeFork(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/fork`);
  }

  search(projectName: string) {
    return RequestHelper.get(this, 'projects', { search: projectName });
  }

  share(projectId: ProjectId, groupId: GroupId, groupAccess: number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/share`, { groupId, groupAccess, ...options });
  }

  show(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}`, options);
  }

  star(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/star`, options);
  }

  statuses(projectId: ProjectId, sha: string, state: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, { state, ...options });
  }

  transfer(projectId: ProjectId, namespaceId: NamespaceId) {
    const pId = encodeURIComponent(projectId);
    return RequestHelper.put(this, `projects/${pId}/transfer`, { namespace: namespaceId });
  }

  unarchive(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/unarchive`, options);
  }

  unshare(projectId: ProjectId, groupId: GroupId, options?: Sudo) {
    const [pId, gId] = [projectId, groupId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/share/${gId}`, options);
  }

  unstar(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/unstar`, options);
  }

  updatePushRule(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/push_rule`, options);
  }

  upload(projectId, content, metadata: ProjectUploadMetadata = {}, options?: Sudo) {
    const pId = encodeURIComponent(projectId);
    const form = new FormData();

    const defaultMetadata: ProjectUploadMetadata = {
      filename: randomstring.generate(8),
      contentType: 'application/octet-stream',
    };

    form.append('file', content, Object.assign(defaultMetadata, metadata));

    return RequestHelper.post(this, `projects/${pId}/uploads`, { ...options, form });
  }
}

export default Projects;
