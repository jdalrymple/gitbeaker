import { BaseService } from '@gitbeaker/requester-utils';

import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { ReleaseSchema } from '../models/ReleaseSchema';

// TODO: Add missing functions
export class Releases<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ReleaseSchema[]>()(this, `projects/${pId}/releases`, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ReleaseSchema>()(this, `projects/${pId}/releases`, options);
  }

  edit(projectId: string | number, tagName: string, options?: BaseRequestOptions) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.put<ReleaseSchema>()(this, `projects/${pId}/releases/${tId}`, options);
  }

  remove(projectId: string | number, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/releases/${tId}`, options);
  }

  show(projectId: string | number, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get<ReleaseSchema>()(this, `projects/${pId}/releases/${tId}`, options);
  }
}
