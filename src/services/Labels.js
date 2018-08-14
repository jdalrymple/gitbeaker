import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Labels extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/labels`, options);
  }

  @api('<projectId>', { options: true, method: 'POST' })
  create(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/labels`, options);
  }

  @api('<projectId>', '<labelName>', { options: true, method: 'PUT' })
  edit(projectId, labelName, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/labels`, { name: labelName, ...options });
  }

  @api('<projectId>', '<labelName>', { method: 'DELETE' })
  remove(projectId, labelName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/labels`, { name: labelName });
  }

  @api('<projectId>', '<labelId>', { options: true, method: 'POST' })
  subscribe(projectId, labelId, options = {}) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${lId}/subscribe`, options);
  }

  @api('<projectId>', '<labelId>', { method: 'DELETE' })
  unsubscribe(projectId, labelId) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${lId}/unsubscribe`);
  }
}

export default Labels;
