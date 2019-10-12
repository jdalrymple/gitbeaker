import FormData from 'form-data';
import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { ProjectId, TriggerId } from '.';

class Triggers extends BaseService {
  add(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/triggers`, options);
  }

  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/triggers`, options);
  }

  edit(projectId: ProjectId, triggerId: TriggerId, options?: BaseRequestOptions) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/triggers/${tId}`, options);
  }

  pipeline(
    projectId: ProjectId,
    ref: string,
    token: string,
    { sudo, ...options }?: BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);
    const form = new FormData();

    form.append('ref', ref);
    form.append('token', token);

    for (const o in options) {
      form.append(`variables[${o}]=${options[o]}`);
    }

    return RequestHelper.post(this, `projects/${pId}/trigger/pipeline`, { sudo, form });
  }

  remove(projectId: ProjectId, triggerId: TriggerId, options?: Sudo) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/triggers/${tId}`, options);
  }

  show(projectId: ProjectId, triggerId: TriggerId, options?: Sudo) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/triggers/${tId}`, options);
  }
}

export default Triggers;
