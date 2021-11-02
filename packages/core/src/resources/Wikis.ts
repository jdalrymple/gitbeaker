import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
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

export class Wikis<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<WikiSchema[]>()(this, endpoint`projects/${projectId}/wikis`, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.post<WikiSchema>()(this, endpoint`projects/${projectId}/wikis`, options);
  }

  edit(projectId: string | number, slug: string, options?: BaseRequestOptions) {
    return RequestHelper.put<WikiSchema>()(
      this,
      endpoint`projects/${projectId}/wikis/${slug}`,
      options,
    );
  }

  show(projectId: string | number, slug: string, options?: Sudo) {
    return RequestHelper.get<WikiSchema>()(
      this,
      endpoint`projects/${projectId}/wikis/${slug}`,
      options,
    );
  }

  remove(projectId: string | number, slug: string, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/wikis/${slug}`, options);
  }
}
