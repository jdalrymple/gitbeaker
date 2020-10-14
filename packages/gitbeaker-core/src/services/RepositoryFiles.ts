import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions, Sudo } from '../infrastructure';

export interface RepositoryFileSchemaDefault {
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

export interface RepositoryFileSchemaCamelized {
  fileName: string;
  filePath: string;
  size: number;
  encoding: string;
  content: string;
  contentSha256: string;
  ref: string;
  blobId: string;
  commitId: string;
  lastCommitId: string;
}

export type RepositoryFileSchema<C = true> = C extends true
  ? RepositoryFileSchemaDefault
  : RepositoryFileSchemaCamelized;

export class RepositoryFiles<C = false> extends BaseService {
  create(
    projectId: string | number,
    filePath: string,
    branch: string,
    content: string,
    commitMessage: string,
    options?: BaseRequestOptions,
  ) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      content,
      commitMessage,
      ...options,
    });
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

    return RequestHelper.put(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      content,
      commitMessage,
      ...options,
    });
  }

  remove(
    projectId: string | number,
    filePath: string,
    branch: string,
    commitMessage: string,
    options?: BaseRequestOptions,
  ) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      commitMessage,
      ...options,
    });
  }

  show(projectId: string | number, filePath: string, ref: string, options?: Sudo) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}`, {
      ref,
      ...options,
    }) as Promise<RepositoryFileSchema<C>>;
  }

  showBlame(projectId: string | number, filePath: string, options?: Sudo) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}/blame`, options);
  }

  showRaw(projectId: string | number, filePath: string, ref: string, options?: Sudo) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}/raw`, {
      ref,
      ...options,
    });
  }
}
