import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface WikiSchema extends Record<string, unknown> {
  content: string;
  format: string;
  slug: string;
  title: string;
}

export class Wikis<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<WikiSchema[]>()(this, `projects/${pId}/wikis`, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<WikiSchema>()(this, `projects/${pId}/wikis`, options);
  }

  edit(projectId: string | number, slug: string, options?: BaseRequestOptions) {
    const [pId, s] = [projectId, slug].map(encodeURIComponent);

    return RequestHelper.put<WikiSchema>()(this, `projects/${pId}/wikis/${s}`, options);
  }

  show(projectId: string | number, slug: string, options?: Sudo) {
    const [pId, s] = [projectId, slug].map(encodeURIComponent);

    return RequestHelper.get<WikiSchema>()(this, `projects/${pId}/wikis/${s}`, options);
  }

  remove(projectId: string | number, slug: string, options?: Sudo) {
    const [pId, s] = [projectId, slug].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/wikis/${s}`, options);
  }
}
