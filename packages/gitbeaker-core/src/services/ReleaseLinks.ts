import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export class ReleaseLinks<C extends boolean> extends BaseService<C> {
  all(projectId: string | number, tagName: string, options?: PaginatedRequestOptions) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/releases/${tId}/assets/links`, options);
  }

  create(projectId: string | number, tagName: string, name: string, url: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/releases/${tId}/assets/links`, {
      name,
      url,
      ...options,
    });
  }

  edit(
    projectId: string | number,
    tagName: string,
    linkId: number,
    options?: Sudo & ({ name: string } | { url: string }),
  ) {
    const [pId, tId, lId] = [projectId, tagName, linkId].map(encodeURIComponent);

    return RequestHelper.put<C>(
      this,
      `projects/${pId}/releases/${tId}/assets/links/${lId}`,
      options,
    );
  }

  remove(projectId: string | number, tagName: string, linkId: number, options?: Sudo) {
    const [pId, tId, lId] = [projectId, tagName, linkId].map(encodeURIComponent);

    return RequestHelper.del<C>(
      this,
      `projects/${pId}/releases/${tId}/assets/links/${lId}`,
      options,
    );
  }

  show(projectId: string | number, tagName: string, linkId: number, options?: Sudo) {
    const [pId, tId, lId] = [projectId, tagName, linkId].map(encodeURIComponent);

    return RequestHelper.get<C>(
      this,
      `projects/${pId}/releases/${tId}/assets/links/${lId}`,
      options,
    );
  }
}
