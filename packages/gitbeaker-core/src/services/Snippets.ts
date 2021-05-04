import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export type SnippetVisibility = 'private' | 'public' | 'internal';

export interface SnippetSchema extends Record<string, unknown> {
  id: number;
  title: string;
  file_name: string;
  description?: string;
  visibility: string;
  author: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
  updated_at: string;
  created_at: string;
  project_id?: null;
  web_url: string;
  raw_url: string;
}

export interface FileSchema {
  path: string;
  raw_url: string;
}

export interface SnippetExpandedSchema extends SnippetSchema {
  expires_at?: null;
  ssh_url_to_repo: string,
  http_url_to_repo: string,
  files?: FileSchema[]
}

export interface UserAgentDetailSchema extends Record<string, unknown> {
  user_agent: string;
  ip_address: string;
  akismet_submitted: boolean;
}

export class Snippets<C extends boolean = false> extends BaseService<C> {
  all({ public: p, ...options }: { public?: boolean } & PaginatedRequestOptions = {}) {
    const url = p ? 'snippets/public' : 'snippets';

    return RequestHelper.get<SnippetSchema[]>()(this, url, options);
  }

  content(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get()(this, `snippets/${sId}/raw`, options);
  }

  create(
    title: string,
    fileName: string,
    content: string,
    visibility: SnippetVisibility,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<SnippetExpandedSchema>()(this, 'snippets', {
      title,
      fileName,
      content,
      visibility,
      ...options,
    });
  }

  edit(snippetId: number, options?: BaseRequestOptions) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.put<SnippetExpandedSchema>()(this, `snippets/${sId}`, options);
  }

  remove(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.del()(this, `snippets/${sId}`, options);
  }

  show(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get<SnippetSchema>()(this, `snippets/${sId}`, options);
  }

  userAgentDetails(snippetId: number, options?: Sudo) {
    const sId = encodeURIComponent(snippetId);

    return RequestHelper.get<UserAgentDetailSchema>()(this, `snippets/${sId}/user_agent_detail`, options);
  }
}
