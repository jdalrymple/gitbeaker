import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  AsStream,
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitDiffSchema, CommitSchema, CondensedCommitSchema } from './Commits';

export type ArchiveType = 'tar.gz' | 'tar.bz2' | 'tbz' | 'tbz2' | 'tb2' | 'bz2' | 'tar' | 'zip';

export interface RepositoryChangelogSchema extends Record<string, unknown> {
  notes: string;
}

export interface RepositoryCompareSchema extends Record<string, unknown> {
  commit: MappedOmit<CondensedCommitSchema, 'message'>;
  commits?: MappedOmit<CondensedCommitSchema, 'message'>[];
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

export type AllRepositoryTreesOptions = {
  pageToken?: string;
  path?: string;
  recursive?: boolean;
  ref?: string;
};

export type EditChangelogOptions = {
  branch?: string;
  configFile?: string;
  date?: string;
  file?: string;
  from?: string;
  message?: string;
  to?: string;
  trailer?: string;
};

export type ShowChangelogOptions = {
  configFile?: string;
  date?: string;
  from?: string;
  to?: string;
  trailer?: string;
};

export class Repositories<C extends boolean = false> extends BaseResource<C> {
  allContributors<E extends boolean = false>(
    projectId: string | number,
    options?: {
      orderBy?: string;
      sort?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryContributorSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<RepositoryContributorSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/contributors`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  allRepositoryTrees<E extends boolean = false>(
    projectId: string | number,
    options?: PaginationRequestOptions<'keyset'> &
      BaseRequestSearchParams &
      AllRepositoryTreesOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryTreeSchema[], C, E, 'keyset'>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<RepositoryTreeSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/tree`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<'keyset'> &
          BaseRequestSearchParams,
      },
    );
  }

  compare<E extends boolean = false>(
    projectId: string | number,
    from: string,
    to: string,
    options?: {
      fromProjectId?: string | number;
      straight?: boolean;
      unidiff?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryCompareSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<RepositoryCompareSchema>()(
      this,
      endpoint`projects/${projectId}/repository/compare`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ...searchParams,
          from,
          to,
        },
      },
    );
  }

  editChangelog<E extends boolean = false>(
    projectId: string | number,
    version: string,
    options?: EditChangelogOptions & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryChangelogSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RepositoryChangelogSchema>()(
      this,
      endpoint`projects/${projectId}/repository/changelog`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          version,
        },
      },
    );
  }

  mergeBase<E extends boolean = false>(
    projectId: string | number,
    refs: string[],
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<CommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/merge_base`,
      {
        sudo,
        showExpanded,
        searchParams: {
          refs,
        },
      },
    );
  }

  showArchive<E extends boolean = false>(
    projectId: string | number,
    options: {
      fileType?: ArchiveType;
      sha?: string;
      path?: string;
      asStream: true;
    } & BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ReadableStream, void, E, void>>;

  showArchive<E extends boolean = false>(
    projectId: string | number,
    options?: {
      fileType?: ArchiveType;
      sha?: string;
      path?: string;
      asStream?: boolean;
    } & BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>>;

  showArchive<E extends boolean = false>(
    projectId: string | number,
    {
      fileType = 'tar.gz',
      ...options
    }: { fileType?: ArchiveType; sha?: string; path?: string } & BaseRequestSearchParams &
      AsStream &
      ShowExpanded<E> &
      Sudo = {} as { fileType: ArchiveType },
  ): Promise<any> {
    const { sudo, showExpanded, asStream, ...searchParams } = options;

    return RequestHelper.get<Blob | ReadableStream>()(
      this,
      endpoint`projects/${projectId}/repository/archive.${fileType}`,
      {
        sudo,
        showExpanded,
        asStream,
        searchParams,
      },
    );
  }

  showBlob<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryBlobSchema, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<RepositoryBlobSchema>()(
      this,
      endpoint`projects/${projectId}/repository/blobs/${sha}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showBlobRaw<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/repository/blobs/${sha}/raw`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showChangelog<E extends boolean = false>(
    projectId: string | number,
    version: string,
    options?: ShowChangelogOptions & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryChangelogSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<RepositoryChangelogSchema>()(
      this,
      endpoint`projects/${projectId}/repository/changelog`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ...searchParams,
          version,
        },
      },
    );
  }
}
