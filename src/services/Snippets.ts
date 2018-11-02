import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type SnippetId = string | number;

class Snippets extends BaseService {
  all(options = { public: false }) {
    const url = options.public ? 'snippets/public' : 'snippets';
    return RequestHelper.get(this, url, options);
  }

  content(snippetId: SnippetId) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}/raw`);
  }

  create(title: string, fileName: string, content: string, visibility: string, options = {}) {
    return RequestHelper.post(this, 'snippets', {
      title,
      fileName,
      content,
      visibility,
      ...options,
    });
  }

  edit(snippetId: SnippetId, options: RequestOptions) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.put(this, `snippets/${sId}`, options);
  }

  remove(snippetId: SnippetId) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.delete(this, `snippets/${sId}`);
  }

  show(snippetId: SnippetId) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}`);
  }

  userAgentDetails(snippetId: SnippetId) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}/user_agent_detail`);
  }
}

export default Snippets;
