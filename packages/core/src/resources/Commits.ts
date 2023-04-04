import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { UserSchema } from './Users';
import type { AllMergeRequestsOptions, MergeRequestSchema } from './MergeRequests';
import type { DiscussionNoteSchema, DiscussionSchema } from '../templates/ResourceDiscussions';
import type { CommitablePipelineStatus } from './Pipelines';

export interface CommitAction {
  /** The action to perform */
  action: 'create' | 'delete' | 'move' | 'update' | 'chmod';
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
  /** When true/false enables/disables the execute flag on the file. Only considered for chmod action. */
  execute_filemode?: boolean;
}

// Response structures

export interface CondensedCommitSchema extends Record<string, unknown> {
  id: string;
  short_id: string;
  message: string;
  title: string;
  author_email: string;
  author_name: string;
  created_at: string;
}

export interface CommitSchema extends CondensedCommitSchema {
  parent_ids?: string[];
  message: string;
  authored_date?: string;
  committer_name?: string;
  committer_email?: string;
  committed_date?: string;
  web_url: string;
}

export interface ExpandedCommitSchema extends CommitSchema {
  last_pipeline: {
    id: number;
    ref: string;
    sha: string;
    status: string;
  };
  stats: {
    additions: number;
    deletions: number;
    total: number;
  };
  status: string;
}

export interface GPGSignatureSchema extends Record<string, unknown> {
  signature_type: 'PGP';
  verification_status: 'verified' | 'unverified';
  gpg_key_id: number;
  gpg_key_primary_keyid: string;
  gpg_key_user_name: string;
  gpg_key_user_email: string;
  gpg_key_subkey_id?: number;
  commit_source: string;
}

export interface X509SignatureSchema extends Record<string, unknown> {
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

export interface MissingSignatureSchema extends Record<string, unknown> {
  message: string;
}

export type CommitSignatureSchema =
  | GPGSignatureSchema
  | X509SignatureSchema
  | MissingSignatureSchema;

export interface CondensedCommitCommentSchema extends Record<string, unknown> {
  note: string;
  author: Omit<UserSchema, 'created_at'>;
}

export interface CommitCommentSchema extends CondensedCommitCommentSchema {
  line_type: 'new' | 'old';
  path: string;
  line: number;
}

export interface CommitDiffSchema extends Record<string, unknown> {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode?: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
}

export interface CommitStatusSchema extends Record<string, unknown> {
  status: CommitablePipelineStatus;
  created_at: string;
  started_at?: string;
  name: string;
  allow_failure: boolean;
  author: Omit<UserSchema, 'created_at'>;
  description?: string;
  sha: string;
  target_url: string;
  finished_at?: string;
  id: number;
  ref: string;
}

export interface CommitReferenceSchema extends Record<string, unknown> {
  type: 'branch' | 'tag' | 'all';
  name: string;
}

export interface CommitDiscussionNoteSchema extends Omit<DiscussionNoteSchema, 'position'> {
  confidential?: boolean;
  commands_changes: Record<string, unknown>;
}

export interface CommitDiscussionSchema extends Record<string, unknown> {
  id: string;
  individual_note: boolean;
  notes?: CommitDiscussionNoteSchema[];
}

export interface AllCommitsOptions {
  refName?: string;
  since?: string;
  until?: string;
  path?: string;
  author?: string;
  all?: boolean;
  withStats?: boolean;
  firstParent?: boolean;
  order?: string;
  trailers?: boolean;
}

export interface CreateCommitOptions {
  startBranch?: string;
  startSha?: string;
  startProject?: number | string;
  actions?: CommitAction[];
  authorEmail?: string;
  authorName?: string;
  stats?: boolean;
  force?: boolean;
}

export interface EditPipelineStatusOptions {
  ref?: string;
  name?: string;
  context?: string;
  targetUrl?: string;
  description?: string;
  coverage?: number;
  pipelineId?: number;
}

export class Commits<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: AllCommitsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitSchema[], C, E, P>> {
    return RequestHelper.get<CommitSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits`,
      options,
    );
  }

  allComments<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedCommitCommentSchema[], C, E, void>> {
    return RequestHelper.get<CondensedCommitCommentSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/comments`,
      options,
    );
  }

  allDiscussions<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema[], C, E, void>> {
    return RequestHelper.get<DiscussionSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/discussions`,
      options,
    );
  }

  allMergeRequests<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    sha: string,
    options?: AllMergeRequestsOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>> {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/merge_requests`,
      options,
    );
  }

  allReferences<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    sha: string,
    options?: { type?: string } & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitReferenceSchema[], C, E, P>> {
    return RequestHelper.get<CommitReferenceSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/refs`,
      options,
    );
  }

  allStatuses<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: { ref?: string; stage?: string; name?: string; all?: boolean } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitStatusSchema[], C, E, void>> {
    return RequestHelper.get<CommitStatusSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/statuses`,
      options,
    );
  }

  cherryPick<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    branch: string,
    options?: { dryRun?: boolean; message?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitSchema, C, E, void>> {
    return RequestHelper.post<CommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/cherry_pick`,
      {
        branch,
        ...options,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    branch: string,
    message: string,
    actions: CommitAction[] = [],
    options: CreateCommitOptions & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<ExpandedCommitSchema, C, E, void>> {
    return RequestHelper.post<ExpandedCommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits`,
      {
        branch,
        commitMessage: message,
        actions,
        ...options,
      },
    );
  }

  createComment<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    note: string,
    options?: { path?: string; line?: number; lineType?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitCommentSchema, C, E, void>> {
    return RequestHelper.post<CommitCommentSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/comments`,
      {
        note,
        ...options,
      },
    );
  }

  editStatus<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    state: CommitablePipelineStatus,
    options?: EditPipelineStatusOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitStatusSchema, C, E, void>> {
    return RequestHelper.post<CommitStatusSchema>()(
      this,
      endpoint`projects/${projectId}/statuses/${sha}`,
      {
        state,
        ...options,
      },
    );
  }

  revert<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    branch: string,
    options?: { dryRun?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitSchema, C, E, void>> {
    return RequestHelper.post<CommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/revert`,
      {
        ...options,
        branch,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: { stats?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedCommitSchema, C, E, void>> {
    return RequestHelper.get<ExpandedCommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}`,
      options,
    );
  }

  showDiff<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    sha: string,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitDiffSchema[], C, E, P>> {
    return RequestHelper.get<CommitDiffSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/diff`,
      options,
    );
  }

  showGPGSignature<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitSignatureSchema, C, E, void>> {
    return RequestHelper.get<CommitSignatureSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/signature`,
      options,
    );
  }
}
