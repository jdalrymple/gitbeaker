import { BaseService } from '@gitbeaker/requester-utils';
import { CommitSchema } from './Commits';
import { RequestHelper, BaseRequestOptions, Sudo } from '../infrastructure';

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

export class RepositoryFiles<C extends boolean = false> extends BaseService<C> {
  create(
    projectId: string | number,
    filePath: string,
    branch: string,
    content: string,
    commitMessage: string,
    options?: BaseRequestOptions,
  ) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.post<RepositoryFileSchema>()(
      this,
      `projects/${pId}/repository/files/${path}`,
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
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.put<RepositoryFileSchema>()(
      this,
      `projects/${pId}/repository/files/${path}`,
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
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      commitMessage,
      ...options,
    });
  }

  show(projectId: string | number, filePath: string, ref: string, options?: Sudo) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get<RepositoryFileExtendedSchema>()(
      this,
      `projects/${pId}/repository/files/${path}`,
      {
        ref,
        ...options,
      },
    );
  }

  showBlame(projectId: string | number, filePath: string, options?: Sudo) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get<RepositoryFileBlameSchema[]>()(
      this,
      `projects/${pId}/repository/files/${path}/blame`,
      options,
    );
  }

  showRaw(projectId: string | number, filePath: string, ref: string, options?: Sudo) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return (RequestHelper.get()(this, `projects/${pId}/repository/files/${path}/raw`, {
      ref,
      ...options,
    }) as unknown) as Promise<Blob>;
  }
}
