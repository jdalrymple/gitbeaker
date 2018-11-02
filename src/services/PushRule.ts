import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class PushRule extends BaseService {
  create(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/push_rule`, options);
  }

  async edit(projectId: ProjectId, { upsert = false, ...options } = {}) {
    const pId = encodeURIComponent(projectId);

    if (upsert) {
      const pushRule = await this.show(projectId);

      if (!pushRule) return this.create(projectId, options);
    }

    return RequestHelper.put(this, `projects/${pId}/push_rule`, options);
  }

  remove(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/push_rule`);
  }

  show(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/push_rule`);
  }
}

export default PushRule;
