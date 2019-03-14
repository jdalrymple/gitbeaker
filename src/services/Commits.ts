import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

export interface CommitAction {
  /** The action to perform */
  action: 'create' | 'delete' | 'move' | 'update';
  /** Full path to the file. Ex. lib/class.rb */
  file_path: string;
  /** Original full path to the file being moved.Ex.lib / class1.rb */
  previous_path?: string;
  /** File content, required for all except delete. Optional for move */
  content?: string;
  /** text or base64. text is default. */
  encoding?: string;
  /** Last known file commit id. Will be only considered in update, move and delete actions. */
  last_commit_id?: string;
}

class Commits extends BaseService {
  all(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits`, options);
  }

  cherryPick(projectId: ProjectId, sha: string, branch: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/cherry_pick`, { branch });
  }

  comments(projectId: ProjectId, sha: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/comments`);
  }

  create(
    projectId: ProjectId,
    branch: string,
    message: string,
    actions: CommitAction[] = [],
    options: RequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits`, {
      branch,
      commitMessage: message,
      actions,
      ...options,
    });
  }

  createComment(projectId: ProjectId, sha: string, note: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/comments`, {
      note,
      ...options,
    });
  }

  diff(projectId: ProjectId, sha: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/diff`);
  }

  editStatus(projectId: ProjectId, sha: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, options);
  }

  references(projectId: ProjectId, sha: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/refs`);
  }

  show(projectId: ProjectId, sha: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}`, options);
  }

  status(projectId: ProjectId, sha: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/statuses`, options);
  }

  mergeRequests(projectId: ProjectId, sha: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/merge_requests`, options);
  }
}

export default Commits;
