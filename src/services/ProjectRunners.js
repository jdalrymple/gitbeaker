import { BaseService, RequestHelper } from '../infrastructure';

class ProjectRunners extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/runners`, options);
  }

  enable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/runners`, {
      runner_id: rId,
    });
  }

  disable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/runners/${rId}`);
  }
}

export default ProjectRunners;
