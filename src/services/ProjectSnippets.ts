import { BaseService, RequestHelper } from '../infrastructure';

const VISIBILITY_LEVELS = {
  PRIVATE: 'private',
  INTERNAL: 'internal',
  PUBLIC: 'public',
};

class ProjectSnippets extends BaseService {
  all(projectId: ProjectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/snippets`, options);
  }

  content(projectId: ProjectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/raw`);
  }

  create(projectId: ProjectId, title, fileName, code, visibility, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/snippets`, {
      title,
      fileName,
      code,
      visibility,
      ...options,
    });
  }

  edit(projectId: ProjectId, snippetId, options) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/snippets/${sId}`, options);
  }

  remove(projectId: ProjectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/snippets/${sId}`);
  }

  show(projectId: ProjectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}`);
  }

  userAgentDetails(projectId: ProjectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/user_agent_detail`);
  }
}

export default ProjectSnippets;
export { VISIBILITY_LEVELS };
