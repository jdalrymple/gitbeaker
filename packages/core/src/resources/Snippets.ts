import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
  UserAgentDetailSchema,
} from '../infrastructure';
import type { UserSchema } from './Users';

export type SnippetVisibility = 'private' | 'public' | 'internal';

export interface SimpleSnippetSchema extends Record<string, unknown> {
  id: number;
  title: string;
  file_name: string;
  description?: string;
  author: Omit<UserSchema, 'created_at'>;
  updated_at: string;
  created_at: string;
  project_id?: string | number;
  web_url: string;
}

export interface SnippetSchema extends SimpleSnippetSchema {
  visibility: SnippetVisibility;
  raw_url: string;
}

export interface ExpandedSnippetSchema extends SnippetSchema {
  expires_at?: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  files?: {
    path: string;
    raw_url: string;
  }[];
}

export class Snippets<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>({
    public: ppublic,
    ...options
  }: { public?: boolean } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<SnippetSchema[], C, E, void>
  > {
    const url = ppublic ? 'snippets/public' : 'snippets';

    return RequestHelper.get<SnippetSchema[]>()(this, url, options);
  }

  create<E extends boolean = false>(title: string, options?: BaseRequestOptions<E>) {
    return RequestHelper.post<ExpandedSnippetSchema>()(this, 'snippets', {
      title,
      ...options,
    });
  }

  edit<E extends boolean = false>(snippetId: number, options?: BaseRequestOptions<E>) {
    return RequestHelper.put<ExpandedSnippetSchema>()(this, `snippets/${snippetId}`, options);
  }

  remove<E extends boolean = false>(snippetId: number, options?: Sudo & ShowExpanded<E>) {
    return RequestHelper.del()(this, `snippets/${snippetId}`, options);
  }

  show<E extends boolean = false>(
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SnippetSchema, C, E, void>> {
    return RequestHelper.get<SnippetSchema>()(this, `snippets/${snippetId}`, options);
  }

  showContent<E extends boolean = false>(
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.get<string>()(this, `snippets/${snippetId}/raw`, options);
  }

  showRepositoryFileContent<E extends boolean = false>(
    snippetId: number,
    ref: string,
    filePath: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.get<string>()(
      this,
      endpoint`snippets/${snippetId}/files/${ref}/${filePath}/raw`,
      options,
    );
  }

  showUserAgentDetails<E extends boolean = false>(
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<UserAgentDetailSchema>()(
      this,
      `snippets/${snippetId}/user_agent_detail`,
      options,
    );
  }
}
