import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions, Sudo } from '../infrastructure';

export class PushRules extends BaseService {
  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/push_rule`, options);
  }

  edit(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/push_rule`, options);
  }

  remove(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/push_rule`, options);
  }

  show(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/push_rule`, options);
  }
}
