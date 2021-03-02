import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

type ArchiveType = 'tar.gz' | 'tar.bz2' | 'tbz' | 'tbz2' | 'tb2' | 'bz2' | 'tar' | 'zip';

export class Repositories<C extends boolean = false> extends BaseService<C> {
  compare(projectId: string | number, from: string, to: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/repository/compare`, {
      from,
      to,
      ...options,
    });
  }

  contributors(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/repository/contributors`, options);
  }

  mergeBase(projectId: string | number, refs: string[], options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/repository/merge_base`, {
      refs,
      ...options,
    });
  }

  showArchive(
    projectId: string | number,
    { fileType = 'tar.gz', ...options }: { fileType?: ArchiveType } & Sudo = {},
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/repository/archive.${fileType}`, options);
  }

  showBlob(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/repository/blobs/${sha}`, options);
  }

  showBlobRaw(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/repository/blobs/${sha}/raw`, options);
  }

  tree(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/repository/tree`, options);
  }
}
