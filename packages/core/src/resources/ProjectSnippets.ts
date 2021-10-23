import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
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

export class ProjectSnippets<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<ProjectSnippetSchema[]>()(
      this,
      endpoint`projects/${projectId}/snippets`,
      options,
    );
  }

  content(projectId: string | number, snippetId: number, options?: Sudo) {
    return RequestHelper.get()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/raw`,
      options,
    );
  }

  create(
    projectId: string | number,
    title: string,
    fileName: string,
    code: string,
    visibility: SnippetVisibility,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<ProjectSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets`,
      {
        title,
        fileName,
        code,
        visibility,
        ...options,
      },
    );
  }

  edit(projectId: string | number, snippetId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<ProjectSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  remove(projectId: string | number, snippetId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  show(projectId: string | number, snippetId: number, options?: Sudo) {
    return RequestHelper.get<ProjectSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  userAgentDetails(projectId: string | number, snippetId: number, options?: Sudo) {
    return RequestHelper.get<{
      user_agent: string;
      ip_address: string;
      akismet_submitted: boolean;
    }>()(this, endpoint`projects/${projectId}/snippets/${snippetId}/user_agent_detail`, options);
  }
}
