import Fs from 'fs';
import Path from 'path';
import { BaseService, RequestHelper } from '../infrastructure';
import { validateEventOptions } from './Events';
import { api, cls } from '../cli/worker';

@cls()
class Projects extends BaseService {
  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, 'projects', options);
  }

  @api({ options: true, method: 'POST' })
  create(options) {
    const url = options.userId ? `projects/user/${encodeURIComponent(options.userId)}` : 'projects';

    return RequestHelper.post(this, url, options);
  }

  @api('<projectId>', { options: true, method: 'PUT' })
  edit(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}`, options);
  }

  @api('<projectId>', { options: true, method: 'GET' })
  events(projectId, options) {
    validateEventOptions(options.action, options.targetType);

    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/events`, options);
  }

  @api('<projectId>', { options: true, method: 'POST' })
  fork(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/fork`, options);
  }

  @api('<projectId>', { options: true, method: 'GET' })
  forks(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/forks`, options);
  }

  @api('<projectId>', { method: 'GET' })
  languages(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/languages`);
  }

  @api('<projectId>', { method: 'POST' })
  mirrorPull(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/mirror/pull`);
  }

  @api('<projectId>', { method: 'DELETE' })
  remove(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}`);
  }

  @api('<projectName>', { method: 'GET' })
  search(projectName) {
    return RequestHelper.get(this, 'projects', { search: projectName });
  }

  @api('<projectId>', '<groupId>', '<groupAccess>', { options: true, method: 'POST' })
  share(projectId, groupId, groupAccess, options) {
    const pId = encodeURIComponent(projectId);

    if (!groupId || !groupAccess) throw new Error('Missing required arguments');

    return RequestHelper.post(this, `projects/${pId}/share`, { groupId, groupAccess, ...options });
  }

  @api('<projectId>', { options: true, method: 'GET' })
  show(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}`, options);
  }

  @api('<projectId>', '<pipelineId>', { options: true, method: 'POST' })
  star(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/star`);
  }

  @api('<projectId>', '<sha>', '<state>', { options: true, method: 'POST' })
  statuses(projectId, sha, state, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, { state, ...options });
  }

  @api('<projectId>', '<namespace>', { method: 'PUT' })
  transfer(projectId, namespace) {
    const pId = encodeURIComponent(projectId);
    return RequestHelper.put(this, `projects/${pId}/transfer`, namespace);
  }

  @api('<projectId>', '<groupId>', { method: 'DELETE' })
  unshare(projectId, groupId) {
    const [pId, gId] = [projectId, groupId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/share${gId}`);
  }

  @api('<projectId>', { method: 'POST' })
  unstar(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/unstar`);
  }

  @api('<projectId>', { method: 'PUT' })
  updatePushRule(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/push_rule`, options);
  }

  @api('<projectId>', '<filePath>', { method: 'POST' })
  upload(projectId, filePath, fileName = Path.basename(filePath)) {
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
}

export default Projects;
