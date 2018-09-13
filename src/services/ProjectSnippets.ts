import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

const VISIBILITY_LEVELS = {
  PRIVATE: 'private',
  INTERNAL: 'internal',
  PUBLIC: 'public',
};

type SnippetId = string | number;
type VisibilityLevel = 'private' | 'public' | 'internal';
class ProjectSnippets extends BaseService {
  all(projectId: ProjectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/snippets`, options);
  }

  content(projectId: ProjectId, snippetId: SnippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/raw`);
  }

  create(
    projectId: ProjectId,
    title: string,
    fileName: string,
    code: string,
    visibility: VisibilityLevel,
    options: RequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/snippets`, {
      title,
      fileName,
      code,
      visibility,
      ...options,
    });
  }

  edit(projectId: ProjectId, snippetId: SnippetId, options: RequestOptions) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/snippets/${sId}`, options);
  }

  remove(projectId: ProjectId, snippetId: SnippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/snippets/${sId}`);
  }

  show(projectId: ProjectId, snippetId: SnippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}`);
  }

  userAgentDetails(projectId: ProjectId, snippetId: SnippetId) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/user_agent_detail`);
  }
}

export default ProjectSnippets;
export { VISIBILITY_LEVELS };
