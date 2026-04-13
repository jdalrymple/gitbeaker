import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  ShowExpanded,
  Sudo,
  UserAgentDetailSchema,
} from '../infrastructure';
import type { SimpleUserSchema } from './Users';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export type SnippetVisibility = 'private' | 'public' | 'internal';

export interface SimpleSnippetSchema extends Record<string, unknown> {
  id: number;
  title: string;
  file_name: string;
  description?: string;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
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

export type CreateSnippetOptions = {
  description?: string;
  visibility?: SnippetVisibility;
  files?: { content: string; filePath: string }[];
};

export type EditSnippetOptions = {
  description?: string;
  visibility?: SnippetVisibility;
  files?: {
    content?: string;
    filePath?: string;
    previousPath?: string;
    action: 'create' | 'update' | 'delete' | 'move';
  }[];
};

export class Snippets<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>({
    public: ppublic,
    ...options
  }: {
    public?: boolean;
    createdAfter?: string;
    createdBefore?: string;
  } & BaseRequestSearchParams &
    PaginationRequestOptions<'offset'> &
    ShowExpanded<E> &
    Sudo = {}): Promise<GitlabAPIResponse<SnippetSchema[], C, E, 'offset'>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options;

    const url = getPrefixedUrl('', { snippets: true, public: ppublic });

    return RequestHelper.get<SnippetSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<'offset'>,
    });
  }

  create<E extends boolean = false>(
    title: string,
    options?: CreateSnippetOptions & ShowExpanded<E> & Sudo,
  ) {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedSnippetSchema>()(this, 'snippets', {
      sudo,
      showExpanded,
      body: {
        title,
        ...body,
      },
    });
  }

  edit<E extends boolean = false>(
    snippetId: number,
    options?: EditSnippetOptions & ShowExpanded<E> & Sudo,
  ) {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedSnippetSchema>()(this, `snippets/${snippetId}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  remove<E extends boolean = false>(snippetId: number, options?: ShowExpanded<E> & Sudo) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, `snippets/${snippetId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    snippetId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SnippetSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<SnippetSchema>()(this, `snippets/${snippetId}`, {
      sudo,
      showExpanded,
    });
  }

  showContent<E extends boolean = false>(
    snippetId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(this, `snippets/${snippetId}/raw`, {
      sudo,
      showExpanded,
    });
  }

  showRepositoryFileContent<E extends boolean = false>(
    snippetId: number,
    ref: string,
    filePath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`snippets/${snippetId}/files/${ref}/${filePath}/raw`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showUserAgentDetails<E extends boolean = false>(
    snippetId: number,
    options?: ShowExpanded<E> & Sudo,
  ) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UserAgentDetailSchema>()(
      this,
      `snippets/${snippetId}/user_agent_detail`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
