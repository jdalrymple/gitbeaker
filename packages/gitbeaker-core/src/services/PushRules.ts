import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions, Sudo } from '../infrastructure';

export class PushRules<C extends boolean = false> extends BaseService<C> {
  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/push_rule`, options);
  }

  edit(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put<C>(this, `projects/${pId}/push_rule`, options);
  }

  remove(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del<C>(this, `projects/${pId}/push_rule`, options);
  }

  show(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C>(this, `projects/${pId}/push_rule`, options);
  }
}
