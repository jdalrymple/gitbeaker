import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  AsStream,
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitDiffSchema, CommitSchema, CondensedCommitSchema } from './Commits';

export type ArchiveType = 'tar.gz' | 'tar.bz2' | 'tbz' | 'tbz2' | 'tb2' | 'bz2' | 'tar' | 'zip';

export interface RepositoryChangelogSchema extends Record<string, unknown> {
  notes: string;
}

export interface RepositoryCompareSchema extends Record<string, unknown> {
  commit: Omit<CondensedCommitSchema, 'message'>;
  commits?: Omit<CondensedCommitSchema, 'message'>[];
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

export interface RepositoryBlobSchema extends Record<string, unknown> {
  size: number;
  encoding: string;
  content: string;
  sha: string;
}

export class Repositories<C extends boolean = false> extends BaseResource<C> {
  compare<E extends boolean = false>(
    projectId: string | number,
    from: string,
    to: string,
    options?: { fromProjectId?: string | number; straight?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryCompareSchema, C, E, void>> {
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

  allContributors<E extends boolean = false>(
    projectId: string | number,
    options?: { orderBy?: string; sort?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryContributorSchema[], C, E, void>> {
    return RequestHelper.get<RepositoryContributorSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/contributors`,
      options,
    );
  }

  editChangelog<E extends boolean = false>(
    projectId: string | number,
    version: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<RepositoryChangelogSchema, C, E, void>> {
    return RequestHelper.post<RepositoryChangelogSchema>()(
      this,
      endpoint`projects/${projectId}/repository/changelog`,
      { version, ...options },
    );
  }

  mergeBase<E extends boolean = false>(
    projectId: string | number,
    refs: string[],
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitSchema, C, E, void>> {
    return RequestHelper.get<CommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/merge_base`,
      {
        refs,
        ...options,
      },
    );
  }

  showArchive<E extends boolean = false>(
    projectId: string | number,
    options: { fileType?: ArchiveType; sha?: string; path?: string; asStream: true } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ReadableStream, void, E, void>>;

  showArchive<E extends boolean = false>(
    projectId: string | number,
    options?: { fileType?: ArchiveType; sha?: string; path?: string; asStream?: boolean } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>>;

  showArchive<E extends boolean = false>(
    projectId: string | number,
    {
      fileType = 'tar.gz',
      ...options
    }: { fileType?: ArchiveType; sha?: string; path?: string } & AsStream &
      ShowExpanded<E> &
      Sudo = {} as { fileType: ArchiveType },
  ): Promise<any> {
    return RequestHelper.get<Blob | ReadableStream>()(
      this,
      endpoint`projects/${projectId}/repository/archive.${fileType}`,
      options as { sha?: string; path?: string } & AsStream & ShowExpanded<E> & Sudo,
    );
  }

  showBlob<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryBlobSchema, void, E, void>> {
    return RequestHelper.get<RepositoryBlobSchema>()(
      this,
      endpoint`projects/${projectId}/repository/blobs/${sha}`,
      options,
    );
  }

  showBlobRaw<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/repository/blobs/${sha}/raw`,
      options,
    );
  }

  showChangelog<E extends boolean = false>(
    projectId: string | number,
    version: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<RepositoryChangelogSchema, C, E, void>> {
    return RequestHelper.get<RepositoryChangelogSchema>()(
      this,
      endpoint`projects/${projectId}/repository/changelog`,
      { version, ...options },
    );
  }

  allRepositoryTrees<E extends boolean = false>(
    projectId: string | number,
    options?: PaginationRequestOptions<'keyset'> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<RepositoryTreeSchema[], C, E, 'keyset'>> {
    return RequestHelper.get<RepositoryTreeSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/tree`,
      options,
    );
  }
}
