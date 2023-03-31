import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { CommitSchema } from './Commits';

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

export class RepositoryFiles<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    branch: string,
    content: Blob,
    commitMessage: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<RepositoryFileSchema, C, E, void>> {
    return RequestHelper.post<RepositoryFileSchema>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}`,
      {
        branch,
        content,
        commitMessage,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    branch: string,
    content: Blob,
    commitMessage: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<RepositoryFileSchema, C, E, void>> {
    return RequestHelper.put<RepositoryFileSchema>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}`,
      {
        branch,
        content,
        commitMessage,
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    branch: string,
    commitMessage: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/repository/files/${filePath}`, {
      branch,
      commitMessage,
      ...options,
    });
  }

  show<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    ref: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryFileExpandedSchema, C, E, void>> {
    return RequestHelper.get<RepositoryFileExpandedSchema>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}`,
      {
        ref,
        ...options,
      },
    );
  }

  allFileBlames<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    ref: string,
    options?: { range?: { start: number; end: number } } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositoryFileBlameSchema[], C, E, void>> {
    return RequestHelper.get<RepositoryFileBlameSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}/blame`,
      {
        ref,
        ...options,
      },
    );
  }

  showRaw<E extends boolean = false>(
    projectId: string | number,
    filePath: string,
    ref: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}/raw`,
      {
        ref,
        ...options,
      },
    );
  }
}
