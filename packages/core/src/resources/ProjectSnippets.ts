import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
  UserAgentDetailSchema,
} from '../infrastructure';
import type { ExpandedSnippetSchema, SnippetSchema } from './Snippets';

export class ProjectSnippets<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<SnippetSchema[], C, E, P>> {
    return RequestHelper.get<SnippetSchema[]>()(
      this,
      endpoint`projects/${projectId}/snippets`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    options?: BaseRequestOptions<E>,
  ) {
    return RequestHelper.post<ExpandedSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets`,
      {
        title,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: BaseRequestOptions<E>,
  ) {
    return RequestHelper.put<ExpandedSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SnippetSchema, C, E, void>> {
    return RequestHelper.get<SnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  showContent<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/raw`,
      options,
    );
  }

  showRepositoryFileContent<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    ref: string,
    filePath: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/files/${ref}/${filePath}/raw`,
      options,
    );
  }

  showUserAgentDetails<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<UserAgentDetailSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/user_agent_detail`,
      options,
    );
  }
}
