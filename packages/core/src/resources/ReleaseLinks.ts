import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ReleaseLinkSchema extends Record<string, unknown> {
  id: number;
  name: string;
  url: string;
  external: boolean;
  link_type: string;
}

export class ReleaseLinks<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<ReleaseLinkSchema[], C, E, P>> {
    return RequestHelper.get<ReleaseLinkSchema[]>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    name: string,
    url: string,
    options?: Sudo & { filePath?: string; linkType?: string },
  ): Promise<GitlabAPIResponse<ReleaseLinkSchema, C, E, void>> {
    return RequestHelper.post<ReleaseLinkSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links`,
      {
        name,
        url,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    linkId: number,
    options?: Sudo &
      ShowExpanded<E> & { name?: string; url?: string; filePath?: string; linkType?: string },
  ): Promise<GitlabAPIResponse<ReleaseLinkSchema, C, E, void>> {
    return RequestHelper.put<ReleaseLinkSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    linkId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    linkId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<ReleaseLinkSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      options,
    );
  }
}
