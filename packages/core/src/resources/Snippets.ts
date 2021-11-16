import { BaseResource } from '@gitbeaker/requester-utils';
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
  project_id?: string | number;
  web_url: string;
  raw_url: string;
}

export interface SnippetExtendedSchema extends SnippetSchema {
  expires_at?: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  files?: {
    path: string;
    raw_url: string;
  }[];
}

export interface UserAgentDetailSchema extends Record<string, unknown> {
  user_agent: string;
  ip_address: string;
  akismet_submitted: boolean;
}

export class Snippets<C extends boolean = false> extends BaseResource<C> {
  all({ public: p, ...options }: { public?: boolean } & PaginatedRequestOptions = {}) {
    const url = p ? 'snippets/public' : 'snippets';

    return RequestHelper.get<SnippetSchema[]>()(this, url, options);
  }

  content(snippetId: number, options?: Sudo) {
    return RequestHelper.get()(this, `snippets/${snippetId}/raw`, options);
  }

  create(
    title: string,
    fileName: string,
    content: string,
    visibility: SnippetVisibility,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.post<SnippetExtendedSchema>()(this, 'snippets', {
      title,
      fileName,
      content,
      visibility,
      ...options,
    });
  }

  edit(snippetId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<SnippetExtendedSchema>()(this, `snippets/${snippetId}`, options);
  }

  remove(snippetId: number, options?: Sudo) {
    return RequestHelper.del()(this, `snippets/${snippetId}`, options);
  }

  show(snippetId: number, options?: Sudo) {
    return RequestHelper.get<SnippetSchema>()(this, `snippets/${snippetId}`, options);
  }

  userAgentDetails(snippetId: number, options?: Sudo) {
    return RequestHelper.get<UserAgentDetailSchema>()(
      this,
      `snippets/${snippetId}/user_agent_detail`,
      options,
    );
  }
}
