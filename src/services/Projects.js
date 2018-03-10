import Fs from 'fs';
import Path from 'path';
import { BaseService, RequestHelper } from '../infrastructure';
import { validateEventOptions } from './Events';

export class Projects extends BaseService {
  all(options = {}) {
    return RequestHelper.get(this, 'projects', options);
  }

  create(options = {}) {
    if (options.userId) {
      const uId = encodeURIComponent(options.userId);

      return RequestHelper.post(this, `projects/user/${uId}`, options);
    }

    return RequestHelper.post(this, 'projects', options);
  }

  edit(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}`, options);
  }

  events(projectId, options) {
    validateEventOptions(options.action, options.targetType);

    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/events`, options);
  }

  fork(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/fork`, options);
  }

  remove(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}`);
  }

  search(projectName) {
    return RequestHelper.get(this, 'projects', { search: projectName });
  }

  share(projectId, groupId, groupAccess, options) {
    const pId = encodeURIComponent(projectId);

    if (!groupId || !groupAccess) throw new Error('Missing required arguments');

    options.group_id = groupId;
    options.group_access = groupAccess;

    return RequestHelper.post(this, `projects/${pId}/share`, options);
  }

  show(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}`);
  }

  star(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/star`);
  }

  statuses(projectId, sha, state, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(
      this,
      `projects/${pId}/statuses/${sha}`,
      Object.assign({ state }, options),
    );
  }

  unshare(projectId, groupId) {
    const [pId, gId] = [projectId, groupId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/share${gId}`);
  }

  unstar(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/unstar`);
  }

  upload(projectId, filePath, { fileName = Path.basename(filePath) } = {}) {
    const pId = encodeURIComponent(projectId);
    const file = Fs.readFileSync(filePath);

    return RequestHelper.post(
      this,
      `projects/${pId}/uploads`,
      {
        file: {
          value: file,
          options: {
            filename: fileName,
            contentType: 'application/octet-stream',
          },
        },
      },
      true,
    );
  }

  // Variables
  createVariable(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/variables`, options);
  }

  editVariable(projectId, keyId, options) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/variables/${kId}`, options);
  }

  variables(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/variables`);
  }

  showVariable(projectId, keyId) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/variables/${kId}`);
  }

  removeVariable(projectId, keyId) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/variables/${kId}`);
  }
}

export default Projects;
