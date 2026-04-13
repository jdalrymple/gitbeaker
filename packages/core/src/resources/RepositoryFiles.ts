import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitSchema } from './Commits';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface RepositoryFileExpandedSchema extends Record<string, unknown> {
  file_name: string;
  file_path: string;
  size: number;
  encoding: string;
  content: string;
  content_sha256: string;
  ref: string;
  blob_id: string;
  commit_id: string;
  last_commit_id: string;
}

export interface RepositoryFileBlameSchema extends Record<string, unknown> {
  commit: CommitSchema;
  lines?: string[];
}

export interface RepositoryFileSchema extends Record<string, unknown> {
  file_path: string;
  branch: string;
}

export type CreateRepositoryFileOptions = {
  authorEmail?: string;
  authorName?: string;
  encoding?: string;
  executeFilemode?: boolean;
  startBranch?: string;
};

export type EditRepositoryFileOptions = {
  authorEmail?: string;
  authorName?: string;
  encoding?: string;
  executeFilemode?: boolean;
  startBranch?: string;
  lastCommitId?: string;
};

export type RemoveRepositoryFileOptions = {
  authorEmail?: string;
  authorName?: string;
  startBranch?: string;
  lastCommitId?: string;
};

export class RepositoryFiles<C extends boolean = false> extends BaseResource<C> {
  allFileBlames<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    ref: string,
    options?: {
      range?: { start: number; end: number };
    } & BaseRequestSearchParams &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RepositoryFileBlameSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<RepositoryFileBlameSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}/blame`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ...searchParams,
          ref,
        },
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    branch: string,
    content: string,
    commitMessage: string,
    options?: BaseRequestSearchParams & CreateRepositoryFileOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RepositoryFileSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<RepositoryFileSchema>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          branch,
          content,
          commitMessage,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    branch: string,
    content: string,
    commitMessage: string,
    options?: BaseRequestSearchParams & EditRepositoryFileOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RepositoryFileSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<RepositoryFileSchema>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          branch,
          content,
          commitMessage,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    branch: string,
    commitMessage: string,
    options?: BaseRequestSearchParams & RemoveRepositoryFileOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/repository/files/${filePath}`, {
      sudo,
      showExpanded,
      searchParams: {
        ...searchParams,
        branch,
        commitMessage,
      },
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    ref: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RepositoryFileExpandedSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<RepositoryFileExpandedSchema>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ref,
        },
      },
    );
  }

  showRaw<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    ref: string,
    options?: {
      lfs?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<string | Blob, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<string | Blob>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}/raw`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ...searchParams,
          ref,
        },
      },
    );
  }
}
