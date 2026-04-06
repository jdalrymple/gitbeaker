import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
  UserAgentDetailSchema,
} from '../infrastructure';
import type {
  CreateSnippetOptions,
  EditSnippetOptions,
  ExpandedSnippetSchema,
  SnippetSchema,
} from './Snippets';

export class ProjectSnippets<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<SnippetSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<SnippetSchema[]>()(this, endpoint`projects/${projectId}/snippets`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P>,
    });
  }

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    options?: CreateSnippetOptions & Sudo & ShowExpanded<E>,
  ) {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          title,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: EditSnippetOptions & Sudo & ShowExpanded<E>,
  ) {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      { sudo, showExpanded, body },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/snippets/${snippetId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SnippetSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<SnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      { sudo, showExpanded },
    );
  }

  showContent<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/raw`,
      { sudo, showExpanded },
    );
  }

  showRepositoryFileContent<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    ref: string,
    filePath: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/files/${ref}/${filePath}/raw`,
      { sudo, showExpanded },
    );
  }

  showUserAgentDetails<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UserAgentDetailSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/user_agent_detail`,
      { sudo, showExpanded },
    );
  }
}
