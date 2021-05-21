import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { SnippetVisibility } from './Snippets';
import { UserSchema } from './Users';

export interface ProjectSnippetSchema extends Record<string, unknown> {
  id: number;
  title: string;
  file_name: string;
  description: string;
  author: Pick<UserSchema, 'id' | 'username' | 'name' | 'state' | 'created_at'>;
  updated_at: string;
  created_at: string;
  project_id: number;
  web_url: string;
  raw_url: string;
}

export class ProjectSnippets extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ProjectSnippetSchema[]>()(this, `projects/${pId}/snippets`, options);
  }

  content(projectId: string | number, snippetId: number, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get()(this, `projects/${pId}/snippets/${sId}/raw`, options);
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

    return RequestHelper.post<ProjectSnippetSchema>()(this, `projects/${pId}/snippets`, {
      title,
      fileName,
      code,
      visibility,
      ...options,
    });
  }

  edit(projectId: string | number, snippetId: number, options?: BaseRequestOptions) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.put<ProjectSnippetSchema>()(
      this,
      `projects/${pId}/snippets/${sId}`,
      options,
    );
  }

  remove(projectId: string | number, snippetId: number, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/snippets/${sId}`, options);
  }

  show(projectId: string | number, snippetId: number, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get<ProjectSnippetSchema>()(
      this,
      `projects/${pId}/snippets/${sId}`,
      options,
    );
  }

  userAgentDetails(projectId: string | number, snippetId: number, options?: Sudo) {
    const [pId, sId] = [projectId, snippetId].map(encodeURIComponent);

    return RequestHelper.get<{
      user_agent: string;
      ip_address: string;
      akismet_submitted: boolean;
    }>()(this, `projects/${pId}/snippets/${sId}/user_agent_detail`, options);
  }
}
