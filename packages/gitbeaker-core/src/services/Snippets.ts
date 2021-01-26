import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export type SnippetVisibility = 'private' | 'public' | 'internal';

export class Snippets<C extends boolean = false> extends BaseService<C> {
  all({ public: p, ...options }: { public?: boolean } & PaginatedRequestOptions = {}) {
    const url = p ? 'snippets/public' : 'snippets';

    return RequestHelper.get<C>(this, url, options);
  }

  content(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get<C>(this, `snippets/${sId}/raw`, options);
  }

  create(
    title: string,
    fileName: string,
    content: string,
    visibility: SnippetVisibility,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<C>(this, 'snippets', {
      title,
      fileName,
      content,
      visibility,
      ...options,
    });
  }

  edit(snippetId: number, options?: BaseRequestOptions) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.put<C>(this, `snippets/${sId}`, options);
  }

  remove(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.del<C>(this, `snippets/${sId}`, options);
  }

  show(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get<C>(this, `snippets/${sId}`, options);
  }

  userAgentDetails(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get<C>(this, `snippets/${sId}/user_agent_detail`, options);
  }
}
