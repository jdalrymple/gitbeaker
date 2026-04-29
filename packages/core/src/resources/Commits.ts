import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { DiscussionNoteSchema, DiscussionSchema } from '../templates/ResourceDiscussions';
import type { MergeRequestSchema } from './MergeRequests';
import type { CommittablePipelineStatus } from './Pipelines';
import type { SimpleUserSchema } from './Users';

import { RequestHelper, endpoint } from '../infrastructure';

export type CommitAction = {
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
};

// Response structures

export interface CommitStatsSchema extends Record<string, unknown> {
  additions: number;
  deletions: number;
  total: number;
}

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
  stats: CommitStatsSchema;
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
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
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
  status: CommittablePipelineStatus;
  created_at: string;
  started_at?: string;
  name: string;
  allow_failure: boolean;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
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

export interface CommitSequenceSchema extends Record<string, unknown> {
  count: number;
}

export interface CommitDiscussionNoteSchema extends MappedOmit<DiscussionNoteSchema, 'position'> {
  confidential?: boolean;
  commands_changes: Record<string, unknown>;
}

export interface CommitDiscussionSchema extends Record<string, unknown> {
  id: string;
  individual_note: boolean;
  notes?: CommitDiscussionNoteSchema[];
}

export type AllCommitsOptions = {
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
};

export type CreateCommitOptions = {
  startBranch?: string;
  startSha?: string;
  startProject?: number | string;
  actions?: CommitAction[];
  authorEmail?: string;
  authorName?: string;
  stats?: boolean;
  force?: boolean;
};

export type EditPipelineStatusOptions = {
  ref?: string;
  name?: string;
  context?: string;
  targetUrl?: string;
  description?: string;
  coverage?: number;
  pipelineId?: number;
};

export class Commits<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: { withStats: true } & AllCommitsOptions &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<({ stats: CommitStatsSchema } & CommitSchema)[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: { trailers: true } & AllCommitsOptions &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<({ trailers: Record<string, unknown> } & CommitSchema)[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: { withStats: true; trailers: true } & AllCommitsOptions &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<
    GitlabAPIResponse<
      ({ trailers: Record<string, unknown>; stats: CommitStatsSchema } & CommitSchema)[],
      C,
      E,
      P
    >
  >;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: AllCommitsOptions & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: AllCommitsOptions & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CommitSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  allComments<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: ShowExpanded<E> & Sudo,
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
    options?: ShowExpanded<E> & Sudo,
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
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/merge_requests`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  allReferences<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    sha: string,
    options?: { type?: string } & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitReferenceSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CommitReferenceSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/refs`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  allStatuses<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: { ref?: string; stage?: string; name?: string; all?: boolean } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CommitStatusSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<CommitStatusSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/statuses`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  cherryPick<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    branch: string,
    options?: { dryRun?: boolean; message?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/cherry_pick`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          branch,
        },
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    branch: string,
    message: string,
    actions: CommitAction[] = [],
    options?: CreateCommitOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedCommitSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedCommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          branch,
          commitMessage: message,
          actions,
        },
      },
    );
  }

  createComment<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    note: string,
    options?: { path?: string; line?: number; lineType?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitCommentSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CommitCommentSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/comments`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          note,
        },
      },
    );
  }

  editStatus<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    state: CommittablePipelineStatus,
    options?: EditPipelineStatusOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CommitStatusSchema>()(
      this,
      endpoint`projects/${projectId}/statuses/${sha}`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          state,
        },
      },
    );
  }

  revert<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    branch: string,
    options?: { dryRun?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<CommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/revert`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          branch,
        },
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: { stats?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedCommitSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<ExpandedCommitSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  showDiff<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    sha: string,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitDiffSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CommitDiffSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/diff`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  showGPGSignature<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitSignatureSchema, C, E, void>> {
    return RequestHelper.get<CommitSignatureSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/signature`,
      options,
    );
  }

  showSequence<E extends boolean = false>(
    projectId: string | number,
    sha: string,
    options?: { firstParent?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitSequenceSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<CommitSequenceSchema>()(
      this,
      endpoint`projects/${projectId}/repository/commits/${sha}/sequence`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }
}
