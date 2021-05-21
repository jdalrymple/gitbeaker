import { BaseService } from '@gitbeaker/requester-utils';
import {
  CommentSchema,
  CommitSchema,
  CommitAction,
  CommitDiffSchema,
  CommitExtendedSchema,
  CommitReferenceSchema,
  CommitSignatureSchema,
  CommitStatusSchema,
  MergeRequestSchema,
} from '../models';

import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class Commits<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<CommitSchema[]>()(this, `projects/${pId}/repository/commits`, options);
  }

  cherryPick(projectId: string | number, sha: string, branch: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<CommitSchema>()(
      this,
      `projects/${pId}/repository/commits/${sha}/cherry_pick`,
      {
        branch,
        ...options,
      },
    );
  }

  comments(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<CommentSchema[]>()(
      this,
      `projects/${pId}/repository/commits/${sha}/comments`,
      options,
    );
  }

  create(
    projectId: string | number,
    branch: string,
    message: string,
    actions: CommitAction[] = [],
    options?: BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<CommitExtendedSchema>()(this, `projects/${pId}/repository/commits`, {
      branch,
      commitMessage: message,
      actions,
      ...options,
    });
  }

  createComment(
    projectId: string | number,
    sha: string,
    note: string,
    options?: BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<CommentSchema>()(
      this,
      `projects/${pId}/repository/commits/${sha}/comments`,
      {
        note,
        ...options,
      },
    );
  }

  diff(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<CommitDiffSchema>()(
      this,
      `projects/${pId}/repository/commits/${sha}/diff`,
      options,
    );
  }

  editStatus(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<CommitStatusSchema>()(
      this,
      `projects/${pId}/statuses/${sha}`,
      options,
    );
  }

  references(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<CommitReferenceSchema[]>()(
      this,
      `projects/${pId}/repository/commits/${sha}/refs`,
      options,
    );
  }

  revert(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<CommitSchema>()(
      this,
      `projects/${pId}/repository/commits/${sha}/revert`,
      options,
    );
  }

  show(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<CommitExtendedSchema>()(
      this,
      `projects/${pId}/repository/commits/${sha}`,
      options,
    );
  }

  statuses(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<CommitStatusSchema[]>()(
      this,
      `projects/${pId}/repository/commits/${sha}/statuses`,
      options,
    );
  }

  mergeRequests(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<MergeRequestSchema>()(
      this,
      `projects/${pId}/repository/commits/${sha}/merge_requests`,
      options,
    );
  }

  signature(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<CommitSignatureSchema>()(
      this,
      `projects/${pId}/repository/commits/${sha}/signature`,
      options,
    );
  }
}
