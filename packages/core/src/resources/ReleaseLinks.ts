import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

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
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseLinkSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ReleaseLinkSchema[]>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    name: string,
    url: string,
    options?: {
      filePath?: string;
      linkType?: string;
      directAssetPath?: string;
    } & BaseRequestSearchParams &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ReleaseLinkSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ReleaseLinkSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
          url,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    linkId: number,
    options?: {
      name?: string;
      url?: string;
      filePath?: string;
      linkType?: string;
      directAssetPath?: string;
    } & BaseRequestSearchParams &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ReleaseLinkSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ReleaseLinkSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    linkId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    linkId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReleaseLinkSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ReleaseLinkSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
