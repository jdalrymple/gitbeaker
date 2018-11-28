import FormData from 'form-data';
import randomstring from 'randomstring';
import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  BaseServiceOptions,
  EventOptions,
  Sudo,
  ProjectId,
  UserId,
  GroupId,
  NamespaceId,
} from '@typings';

class Projects extends BaseService {
  private requestHandler: RequestHelper;

  constructor(options: BaseServiceOptions & { requestHandler?: RequestHelper }) {
    super(options);
    this.requestHandler = options.requestHandler || new RequestHelper();
  }

  all(options?: PaginatedRequestOptions) {
    return this.requestHandler.get(this, 'projects', options);
  }

  archive(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.post(this, `projects/${pId}/archive`, options);
  }

  create({ userId, ...options }: { userId?: UserId } & BaseRequestOptions) {
    const url = userId ? `projects/user/${encodeURIComponent(userId)}` : 'projects';

    return this.requestHandler.post(this, url, options);
  }

  edit(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.put(this, `projects/${pId}`, options);
  }

  events(projectId: ProjectId, options?: BaseRequestOptions & EventOptions) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.get(this, `projects/${pId}/events`, options);
  }

  fork(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.post(this, `projects/${pId}/fork`, options);
  }

  forks(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.get(this, `projects/${pId}/forks`, options);
  }

  languages(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.get(this, `projects/${pId}/languages`, options);
  }

  mirrorPull(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.post(this, `projects/${pId}/mirror/pull`, options);
  }

  remove(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.delete(this, `projects/${pId}`, options);
  }

  search(projectName: string) {
    return this.requestHandler.get(this, 'projects', { search: projectName });
  }

  share(projectId: ProjectId, groupId: GroupId, groupAccess: number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.post(this, `projects/${pId}/share`, { groupId, groupAccess, ...options });
  }

  show(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.get(this, `projects/${pId}`, options);
  }

  star(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.post(this, `projects/${pId}/star`, options);
  }

  statuses(projectId: ProjectId, sha: string, state: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.post(this, `projects/${pId}/statuses/${sha}`, { state, ...options });
  }

  transfer(projectId: ProjectId, namespaceId: NamespaceId) {
    const pId = encodeURIComponent(projectId);
    return this.requestHandler.put(this, `projects/${pId}/transfer`, { namespace: namespaceId });
  }

  unarchive(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.post(this, `projects/${pId}/unarchive`, options);
  }

  unshare(projectId: ProjectId, groupId: GroupId, options?: Sudo) {
    const [pId, gId] = [projectId, groupId].map(encodeURIComponent);

    return this.requestHandler.delete(this, `projects/${pId}/share${gId}`, options);
  }

  unstar(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.post(this, `projects/${pId}/unstar`, options);
  }

  updatePushRule(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return this.requestHandler.put(this, `projects/${pId}/push_rule`, options);
  }

  upload(projectId, content, { fileName = randomstring(8) }: { fileName?: string }) {
    const pId = encodeURIComponent(projectId);
    const form = new FormData();

    form.append(fileName, {
      file: {
        value: content,
        options: {
          filename: fileName,
          contentType: 'application/octet-stream',
        },
      },
    });

    return this.requestHandler.post(this, `projects/${pId}/uploads`, form);
  }
}

export default Projects;
