import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ReleaseLinkSchema extends Record<string, unknown> {
  id: number;
  name: string;
  url: string;
  external: boolean;
  link_type: string;
}

export class ReleaseLinks<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, tagName: string, options?: PaginatedRequestOptions) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get<ReleaseLinkSchema[]>()(
      this,
      `projects/${pId}/releases/${tId}/assets/links`,
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
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.post<ReleaseLinkSchema>()(
      this,
      `projects/${pId}/releases/${tId}/assets/links`,
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
    const [pId, tId, lId] = [projectId, tagName, linkId].map(encodeURIComponent);

    return RequestHelper.put<ReleaseLinkSchema>()(
      this,
      `projects/${pId}/releases/${tId}/assets/links/${lId}`,
      options,
    );
  }

  remove(projectId: string | number, tagName: string, linkId: number, options?: Sudo) {
    const [pId, tId, lId] = [projectId, tagName, linkId].map(encodeURIComponent);

    return RequestHelper.del()(
      this,
      `projects/${pId}/releases/${tId}/assets/links/${lId}`,
      options,
    );
  }

  show(projectId: string | number, tagName: string, linkId: number, options?: Sudo) {
    const [pId, tId, lId] = [projectId, tagName, linkId].map(encodeURIComponent);

    return RequestHelper.get<ReleaseLinkSchema>()(
      this,
      `projects/${pId}/releases/${tId}/assets/links/${lId}`,
      options,
    );
  }
}
