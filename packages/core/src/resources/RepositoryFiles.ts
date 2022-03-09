import { BaseResource } from '@gitbeaker/requester-utils';
import { CommitSchema } from './Commits';
import { RequestHelper, BaseRequestOptions, endpoint, Sudo } from '../infrastructure';

export interface RepositoryFileExtendedSchema extends Record<string, unknown> {
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
  create(
    projectId: string | number,
    filePath: string,
    branch: string,
    content: string,
    commitMessage: string,
    options?: BaseRequestOptions,
  ) {
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

  edit(
    projectId: string | number,
    filePath: string,
    branch: string,
    content: string,
    commitMessage: string,
    options?: BaseRequestOptions,
  ) {
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

  remove(
    projectId: string | number,
    filePath: string,
    branch: string,
    commitMessage: string,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/repository/files/${filePath}`, {
      branch,
      commitMessage,
      ...options,
    });
  }

  show(projectId: string | number, filePath: string, ref: string, options?: Sudo) {
    return RequestHelper.get<RepositoryFileExtendedSchema>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}`,
      {
        ref,
        ...options,
      },
    );
  }

  showBlame(projectId: string | number, filePath: string, options?: Sudo) {
    return RequestHelper.get<RepositoryFileBlameSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}/blame`,
      options,
    );
  }

  showRaw(projectId: string | number, filePath: string, options?: BaseRequestOptions) {
    return RequestHelper.get()(
      this,
      endpoint`projects/${projectId}/repository/files/${filePath}/raw`,
      options,
    ) as unknown as Promise<string>;
  }
}
