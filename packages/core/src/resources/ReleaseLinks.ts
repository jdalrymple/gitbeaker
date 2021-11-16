import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo, endpoint } from '../infrastructure';

export interface ReleaseLinkSchema extends Record<string, unknown> {
  id: number;
  name: string;
  url: string;
  external: boolean;
  link_type: string;
}

export class ReleaseLinks<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, tagName: string, options?: PaginatedRequestOptions) {
    return RequestHelper.get<ReleaseLinkSchema[]>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links`,
      options,
    );
  }

  create(
    projectId: string | number,
    tagName: string,
    name: string,
    url: string,
    options?: Sudo & { filePath?: string; linkType?: string },
  ) {
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

  edit(
    projectId: string | number,
    tagName: string,
    linkId: number,
    options?: Sudo & { name?: string; url?: string; filePath?: string; linkType?: string },
  ) {
    return RequestHelper.put<ReleaseLinkSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      options,
    );
  }

  remove(projectId: string | number, tagName: string, linkId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      options,
    );
  }

  show(projectId: string | number, tagName: string, linkId: number, options?: Sudo) {
    return RequestHelper.get<ReleaseLinkSchema>()(
      this,
      endpoint`projects/${projectId}/releases/${tagName}/assets/links/${linkId}`,
      options,
    );
  }
}
