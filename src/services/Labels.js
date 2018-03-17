import { BaseService, RequestHelper } from '../infrastructure';

class Labels extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/labels`, options);
  }

  create(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/labels`, options);
  }

  edit(projectId, labelName, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(
      this,
      `projects/${pId}/labels`,
      Object.assign({ name: labelName }, options),
    );
  }

  remove(projectId, labelName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/labels`, {
      name: labelName,
    });
  }

  subscribe(projectId, labelId, options = {}) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/issues/${lId}/subscribe`,
      options,
    );
  }

  unsubscribe(projectId, labelId) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);

    return RequestHelper.delete(
      this,
      `projects/${pId}/issues/${lId}/unsubscribe`,
    );
  }
}

export default Labels;
