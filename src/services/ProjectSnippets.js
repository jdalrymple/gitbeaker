import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

const VISIBILITY_LEVELS = {
  PRIVATE: 'private',
  INTERNAL: 'internal',
  PUBLIC: 'public',
};

@cls()
class ProjectSnippets extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/snippets`, options);
  }

  @api('<projectId>', '<snippetId>', { options: true, method: 'GET' })
  content(projectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/raw`);
  }

  @api('<projectId>', '<title>', '<fileName>', '<code>', '<visibility>', { options: true, method: 'POST' })
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

  @api('<projectId>', '<snippetId>', { options: true, method: 'PUT' })
  edit(projectId, snippetId, options) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/snippets/${sId}`, options);
  }

  @api('<projectId>', '<snippetId>', { method: 'DELETE' })
  remove(projectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/snippets/${sId}`);
  }

  @api('<projectId>', '<snippetId>', { method: 'GET' })
  show(projectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}`);
  }

  @api('<projectId>', '<snippetId>', { method: 'GET' })
  userAgentDetails(projectId, snippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/user_agent_detail`);
  }
}

export default ProjectSnippets;
export { VISIBILITY_LEVELS };
