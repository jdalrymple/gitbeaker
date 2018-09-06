import { BaseService, RequestHelper } from '../infrastructure';

class Triggers extends BaseService {
  add(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/triggers`, options);
  }

  all(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/triggers`);
  }

  edit(projectId: ProjectId, triggerId, options) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/triggers/${tId}`, options);
  }

  remove(projectId: ProjectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/triggers/${tId}`);
  }

  show(projectId: ProjectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/triggers/${tId}`);
  }
}

export default Triggers;
