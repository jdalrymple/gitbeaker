import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class ProtectedTags<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/protected_tags`, options);
  }

  protect(projectId: string | number, tagName: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post()(this, `projects/${pId}/protected_tags`, {
      name: tagName,
      ...options,
    });
  }

  show(projectId: string | number, tagName: string, options?: Sudo) {
    const [pId, tName] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get()(this, `projects/${pId}/protected_tags/${tName}`, options);
  }

  unprotect(projectId: string | number, tagName: string, options?: Sudo) {
    const [pId, tName] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/protected_tags/${tName}`, options);
  }
}
