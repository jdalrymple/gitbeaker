import { BaseService, RequestHelper, BaseRequestOptions, Sudo } from '../infrastructure';
import { ProjectId } from '.';

class PushRules extends BaseService {
  create(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/push_rule`, options);
  }

  edit(
    projectId: ProjectId,
    { upsert = false, ...options }: { upsert: boolean } & BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    try {
      return RequestHelper.put(this, `projects/${pId}/push_rule`, options);
    } catch (e) {
      if (e.message.includes('exist')) return this.create(projectId, options);

      throw e;
    }
  }

  remove(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/push_rule`, options);
  }

  show(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/push_rule`, options);
  }
}

export default PushRules;
