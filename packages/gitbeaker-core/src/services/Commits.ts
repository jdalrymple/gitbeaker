import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

// As of GitLab v12.6.2
export interface CommitSchemaDefault {
  id: string;
  short_id: string;
  created_at: Date;
  parent_ids?: string[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date?: Date;
  committer_name?: string;
  committer_email?: string;
  committed_date?: Date;
}

export interface CommitSchemaCamelized {
  id: string;
  shortId: string;
  createdAt: Date;
  parentIds?: string[];
  title: string;
  message: string;
  authorName: string;
  authorEmail: string;
  authoredDate?: Date;
  committerName?: string;
  committerEmail?: string;
  committedDate?: Date;
}

export type CommitSchema = CommitSchemaDefault | CommitSchemaCamelized;

export interface CommitAction {
  /** The action to perform */
  action: 'create' | 'delete' | 'move' | 'update';
  /** Full path to the file. Ex. lib/class.rb */
  filePath: string;
  /** Original full path to the file being moved.Ex.lib / class1.rb */
  previousPath?: string;
  /** File content, required for all except delete. Optional for move */
  content?: string;
  /** text or base64. text is default. */
  encoding?: string;
  /** Last known file commit id. Will be only considered in update, move and delete actions. */
  lastCommitId?: string;
}

export interface GPGSignature {
  signature_type: 'PGP';
  verification_status: 'verified' | 'unverified';
  gpg_key_id: number;
  gpg_key_primary_keyid: string;
  gpg_key_user_name: string;
  gpg_key_user_email: string;
  gpg_key_subkey_id: number | null;
  commit_source: string;
}

export interface X509Signature {
  signature_type: 'X509';
  verification_status: 'verified' | 'unverified';
  x509_certificate: {
    id: number;
    subject: string;
    subject_key_identifier: string;
    email: string;
    serial_number: string;
    certificate_status: string;
    x509_issuer: {
      id: number;
      subject: string;
      subject_key_identifier: string;
      crl_url: string;
    };
  };
  commit_source: string;
}

export interface MissingSignature {
  message: string;
}

export type CommitSignature = GPGSignature | X509Signature | MissingSignature;

export class Commits extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits`, options);
  }

  cherryPick(projectId: string | number, sha: string, branch: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/cherry_pick`, {
      branch,
      ...options,
    });
  }

  comments(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/comments`, options);
  }

  create(
    projectId: string | number,
    branch: string,
    message: string,
    actions: CommitAction[] = [],
    options?: BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits`, {
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

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/comments`, {
      note,
      ...options,
    });
  }

  diff(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/diff`, options);
  }

  editStatus(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, options);
  }

  references(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/refs`, options);
  }

  revert(projectId: string | number, sha: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/revert`, options);
  }

  show(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}`, options);
  }

  status(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/statuses`, options);
  }

  mergeRequests(projectId: string | number, sha: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/commits/${sha}/merge_requests`,
      options,
    );
  }

  signature(
    projectId: string | number,
    sha: string,
    options?: BaseRequestOptions,
  ): Promise<CommitSignature> {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/commits/${sha}/signature`,
      options,
    ) as Promise<CommitSignature>;
  }
}
