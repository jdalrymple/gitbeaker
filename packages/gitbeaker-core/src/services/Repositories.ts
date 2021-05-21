import { BaseService } from '@gitbeaker/requester-utils';
import { CommitSchema, CommitDiffSchema } from './Commits';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

type ArchiveType = 'tar.gz' | 'tar.bz2' | 'tbz' | 'tbz2' | 'tb2' | 'bz2' | 'tar' | 'zip';

export interface RepositoryCompareSchema extends Record<string, unknown> {
  commit: Pick<
    CommitSchema,
    'id' | 'short_id' | 'title' | 'author_name' | 'author_email' | 'created_at'
  >;
  commits?: Pick<
    CommitSchema,
    'id' | 'short_id' | 'title' | 'author_name' | 'author_email' | 'created_at'
  >[];
  diffs?: CommitDiffSchema[];
  compare_timeout: boolean;
  compare_same_ref: boolean;
}

export interface RepositoryContributorSchema extends Record<string, unknown> {
  name: string;
  email: string;
  commits: number;
  additions: number;
  deletions: number;
}

export interface RepositoryTreeSchema extends Record<string, unknown> {
  id: string;
  name: string;
  type: string;
  path: string;
  mode: string;
}

export class Repositories extends BaseService {
  compare(projectId: string | number, from: string, to: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<RepositoryCompareSchema>()(
      this,
      `projects/${pId}/repository/compare`,
      {
        from,
        to,
        ...options,
      },
    );
  }

  contributors(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<RepositoryContributorSchema[]>()(
      this,
      `projects/${pId}/repository/contributors`,
      options,
    );
  }

  mergeBase(projectId: string | number, refs: string[], options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<CommitSchema>()(this, `projects/${pId}/repository/merge_base`, {
      refs,
      ...options,
    });
  }

  showArchive(
    projectId: string | number,
    { fileType = 'tar.gz', ...options }: { fileType?: ArchiveType } & Sudo = {},
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(
      this,
      `projects/${pId}/repository/archive.${fileType}`,
      options as Record<string, unknown>,
    ) as unknown as Promise<void>;
  }

  showBlob(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(
      this,
      `projects/${pId}/repository/blobs/${sha}`,
      options,
    ) as unknown as Promise<Blob>;
  }

  showBlobRaw(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(
      this,
      `projects/${pId}/repository/blobs/${sha}/raw`,
      options,
    ) as unknown as Promise<Blob>;
  }

  tree(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<RepositoryTreeSchema[]>()(
      this,
      `projects/${pId}/repository/tree`,
      options,
    );
  }
}
