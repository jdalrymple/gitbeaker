import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

import { SnippetVisibility } from './Snippets';

export class ProjectSnippets extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/snippets`, options);
  }

  content(projectId: string | number, snippetId: number, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/raw`, options);
  }

  create(
    projectId: string | number,
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

  edit(projectId: string | number, snippetId: number, options?: BaseRequestOptions) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/snippets/${sId}`, options);
  }

  remove(projectId: string | number, snippetId: number, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/snippets/${sId}`, options);
  }

  show(projectId: string | number, snippetId: number, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}`, options);
  }

  userAgentDetails(projectId: string | number, snippetId: number, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/snippets/${sId}/user_agent_detail`, options);
  }
}
