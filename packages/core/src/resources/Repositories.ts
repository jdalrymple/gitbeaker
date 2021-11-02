import { BaseResource } from '@gitbeaker/requester-utils';
import { CommitSchema, CommitDiffSchema } from './Commits';
import { RequestHelper, Sudo, BaseRequestOptions, endpoint } from '../infrastructure';

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

export class Repositories<C extends boolean = false> extends BaseResource<C> {
  compare(projectId: string | number, from: string, to: string, options?: Sudo) {
    return RequestHelper.get<RepositoryCompareSchema>()(
      this,
      endpoint`projects/${projectId}/repository/compare`,
      {
        from,
        to,
        ...options,
      },
    );
  }

  contributors(projectId: string | number, options?: Sudo) {
    return RequestHelper.get<RepositoryContributorSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/contributors`,
      options,
    );
  }

  mergeBase(projectId: string | number, refs: string[], options?: Sudo) {
    return RequestHelper.get<CommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/merge_base`,
      {
        refs,
        ...options,
      },
    );
  }

  showArchive(
    projectId: string | number,
    { fileType = 'tar.gz', ...options }: { fileType?: ArchiveType } & Sudo = {},
  ) {
    return RequestHelper.get()(
      this,
      endpoint`projects/${projectId}/repository/archive.${fileType}`,
      options as Record<string, unknown>,
    ) as unknown as Promise<string>;
  }

  showBlob(projectId: string | number, sha: string, options?: Sudo) {
    return RequestHelper.get()(
      this,
      endpoint`projects/${projectId}/repository/blobs/${sha}`,
      options,
    ) as unknown as Promise<Blob>;
  }

  showBlobRaw(projectId: string | number, sha: string, options?: Sudo) {
    return RequestHelper.get()(
      this,
      endpoint`projects/${projectId}/repository/blobs/${sha}/raw`,
      options,
    ) as unknown as Promise<Blob>;
  }

  tree(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.get<RepositoryTreeSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/tree`,
      options,
    );
  }
}
