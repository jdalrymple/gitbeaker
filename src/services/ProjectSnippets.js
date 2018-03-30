import { BaseService, RequestHelper } from '../infrastructure';

const VISIBILITY_LEVELS = {
  PRIVATE: 'private',
  INTERNAL: 'internal',
  PUBLIC: 'public',
};

class ProjectSnippets extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/snippets`, options);
  }

  content(projectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/raw`);
  }

  create(projectId, title, fileName, code, visibility, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/snippets`, {
      title,
      fileName,
      code,
      visibility,
      ...options,
    });
  }

  edit(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/snippets`, options);
  }

  remove(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/snippets`);
  }

  show(projectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}`);
  }

  userAgentDetails(projectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/user_agent_detail`);
  }
}

export default ProjectSnippets;
export { VISIBILITY_LEVELS };
