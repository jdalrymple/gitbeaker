import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class Triggers extends BaseService {
  add(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/triggers`, options);
  }

  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/triggers`, options);
  }

  edit(projectId: string | number, triggerId: number, options?: BaseRequestOptions) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/triggers/${tId}`, options);
  }

  pipeline(
    projectId: string | number,
    ref: string,
    token: string,
    { variables }: { variables?: Record<string, string> } = {},
  ) {
    const pId = encodeURIComponent(projectId);
    const hapiVariables = {};

    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        hapiVariables[`variables[${k}]`] = v;
      });
    }

    return RequestHelper.post(this, `projects/${pId}/trigger/pipeline`, {
      isForm: true,
      ref,
      token,
      ...hapiVariables,
    });
  }

  remove(projectId: string | number, triggerId: number, options?: Sudo) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/triggers/${tId}`, options);
  }

  show(projectId: string | number, triggerId: number, options?: Sudo) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/triggers/${tId}`, options);
  }
}
