import { BaseService, RequestHelper } from '../infrastructure';

class Snippets extends BaseService {
  all(options = {}) {
    return RequestHelper.get(this, `snippets`, options);
  }

  allPublic(options = {}) {
    return RequestHelper.get(this, `snippets/public`, options);
  }

  content(snippetId) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}/raw`);
  }

  create(title, fileName, content, visibility, options = {}) {
    return RequestHelper.post(this, `snippets`, {
      title,
      fileName,
      content,
      visibility,
      ...options,
    });
  }

  edit(snippetId, options) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.put(this, `snippets/${sId}`, options);
  }

  remove(snippetId) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.delete(this, `snippets/${sId}`);
  }

  show(snippetId) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}`);
  }

  userAgentDetails(snippetId) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get(this, `snippets/${sId}/user_agent_detail`);
  }
}

export default Snippets;
