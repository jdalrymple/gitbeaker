import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export type SnippetVisibility = 'private' | 'public' | 'internal';

export class Snippets extends BaseService {
  all({ public: p, ...options }: { public: boolean } & PaginatedRequestOptions) {
    const url = p ? 'snippets/public' : 'snippets';

    return RequestHelper.get(this, url, options);
  }

  content(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}/raw`, options);
  }

  create(
    title: string,
    fileName: string,
    content: string,
    visibility: SnippetVisibility,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post(this, 'snippets', {
      title,
      fileName,
      content,
      visibility,
      ...options,
    });
  }

  edit(snippetId: number, options?: BaseRequestOptions) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.put(this, `snippets/${sId}`, options);
  }

  remove(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.del(this, `snippets/${sId}`, options);
  }

  show(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}`, options);
  }

  userAgentDetails(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}/user_agent_detail`, options);
  }
}
