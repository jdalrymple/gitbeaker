import FormData from 'form-data';
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
    { sudo, ...options }: BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);
    const form = new FormData();

    form.append('ref', ref);
    form.append('token', token);

    Object.entries(options).forEach(([k, v]) => {
      form.append(`variables[${k}]`, v);
    });

    return RequestHelper.post(this, `projects/${pId}/trigger/pipeline`, { sudo, form });
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
