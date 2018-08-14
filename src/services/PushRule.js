import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class PushRule extends BaseService {
  @api('<projectId>', { options: true, method: 'POST' })
  create(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/push_rule`, options);
  }

  @api('<projectId>', '<upsert>', { options: true, method: 'PUT' })
  async edit(projectId, upsert, options) {
    const pId = encodeURIComponent(projectId);

    if (upsert) {
      const pushRule = await this.show(projectId);

      if (!pushRule) return this.create(projectId, options);
    }

    return RequestHelper.put(this, `projects/${pId}/push_rule`, {
      upsert,
      ...options,
    });
  }

  @api('<projectId>', { method: 'DELETE' })
  remove(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/push_rule`);
  }

  @api('<projectId>', { method: 'GET' })
  show(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/push_rule`);
  }
}

export default PushRule;
