import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  SnippetId,
  SnippetVisibility,
} from '@src/types';

class Snippets extends BaseService {
  all({ public: p, ...options }: { public: boolean } & PaginatedRequestOptions) {
    const url = p ? 'snippets/public' : 'snippets';

    return RequestHelper.get(this, url, options);
  }

  content(snippetId: SnippetId, options?: Sudo) {
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

  edit(snippetId: SnippetId, options?: BaseRequestOptions) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.put(this, `snippets/${sId}`, options);
  }

  remove(snippetId: SnippetId, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.delete(this, `snippets/${sId}`, options);
  }

  show(snippetId: SnippetId, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}`, options);
  }

  userAgentDetails(snippetId: SnippetId, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}/user_agent_detail`, options);
  }
}

export default Snippets;
