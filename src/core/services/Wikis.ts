import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class Wikis extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/wikis`, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/wikis`, options);
  }

  edit(projectId: string | number, slug: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/wikis/${slug}`, options);
  }

  show(projectId: string | number, slug: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/wikis/${slug}`, options);
  }

  remove(projectId: string | number, slug: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/wikis/${slug}`, options);
  }
}
