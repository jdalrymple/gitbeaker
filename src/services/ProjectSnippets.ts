import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  ProjectId,
  SnippetId,
  SnippetVisibility,
} from '@typings';

class ProjectSnippets extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/snippets`, options);
  }

  content(projectId: ProjectId, snippetId: SnippetId, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/raw`, options);
  }

  create(
    projectId: ProjectId,
    title: string,
    fileName: string,
    code: string,
    visibility: SnippetVisibility,
    options?: BaseRequestOptions,
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

  edit(projectId: ProjectId, snippetId: SnippetId, options?: BaseRequestOptions) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/snippets/${sId}`, options);
  }

  remove(projectId: ProjectId, snippetId: SnippetId, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/snippets/${sId}`, options);
  }

  show(projectId: ProjectId, snippetId: SnippetId, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}`, options);
  }

  userAgentDetails(projectId: ProjectId, snippetId: SnippetId, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/user_agent_detail`, options);
  }
}

export default ProjectSnippets;
