import FormData from 'form-data';
import { URL, URLSearchParams } from 'universal-url'

declare global {
  function encodeURIComponent(uriComponent: string | number | boolean): string;

  namespace NodeJS {
    interface Global extends NodeJS.Global {
      URL: typeof URL,
      URLSearchParams: typeof URLSearchParams
    }
  }
}

export type ResourceType = string;
export type ResourceId = string | number;
export type AwardId = number;
export type BroadcastMessageId = number;
export type BadgeId = number;
export type BoardId = number;
export type CustomAttributeId = number;
export type DeploymentId = number;
export type DiscussionId = number;
export type EnvironmentId = number;
export type EpicId = number;
export type GeonodeId = number;
export type GroupId = string | number;
export type GroupProjectId = string | number;
export type HookId = number;
export type ImpersonationTokenId = number;
export type IssueId = number;
export type JobId = number;
export type LabelId = number;
export type KeyId = string;
export type NamespaceId = string | number;
export type MergeRequestId = number;
export type MilestoneId = number;
export type NoteId = number;
export type PipelineId = number;
export type PipelineScheduleId = number;
export type ProjectId = string | number;
export type RunnerId = number;
export type SnippetId = number;
export type TodoId = number;
export type TriggerId = number;
export type VersionId = number;
export type UserId = number;

export interface Sudo {
  sudo?: string | number;
}

// Bundler
export interface Constructor {
  new (...args: any): any;
}

export type Mapper<T extends { [name: string]: Constructor }, P extends keyof T> = {
  [name in P]: InstanceType<T[name]>
};

export interface Bundle<T extends { [name: string]: Constructor }, P extends keyof T> {
  new (options?: any): Mapper<T, P>;
}

// Base Service
export interface Requester {
  get: Function;
  post: Function;
  put: Function;
  delete: Function;
  stream?: Function;
}

export interface BaseServiceOptions extends Sudo {
  oauthToken?: string;
  token?: string;
  jobToken?: string;
  host?: string;
  url?: string;
  version?: string;
  rejectUnauthorized?: boolean;
  requester?: Requester;
}

// RequestHelper
export type GetResponse =
  | { data: object | object[], pagination: PaginationOptions }
  | object
  | object[];
export type PostResponse = object;
export type PutResponse = object;
export type DelResponse = object;

export interface PaginationOptions {
  total: number;
  next: number | null;
  current: number | null;
  previous: number | null;
  perPage: number;
  totalPages: number;
}

export interface DefaultRequestOptions extends Sudo {
  body?: object | FormData;
  query?: object;
}

export interface BaseRequestOptions extends Sudo {
  [key: string]: any;
}

export interface PaginatedRequestOptions extends BaseRequestOptions {
  showPagination?: boolean;
  maxPages?: number;
  page?: number;
  perPage?: number;
}

// Access Requests
export enum AccessLevel {
  GUEST = 10,
  REPORTER = 20,
  DEVELOPER = 30,
  MAINTAINER = 40,
  OWNER = 50,
}

// Commits
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

// Events
export type EventAction =
  | 'created'
  | 'updated'
  | 'closed'
  | 'reopened'
  | 'pushed'
  | 'commented'
  | 'merged'
  | 'joined'
  | 'left'
  | 'destroyed'
  | 'expired';

export type EventTarget =
  | 'issue'
  | 'milestone'
  | 'merge_request'
  | 'note'
  | 'project'
  | 'snippet'
  | 'user';

export interface EventOptions {
  action?: EventAction;
  targetType?: EventTarget;
}

// Jobs
export type JobScope =
  | 'created'
  | 'pending'
  | 'running'
  | 'failed'
  | 'success'
  | 'canceled'
  | 'skipped'
  | 'manual';

// Merge Requests
export interface AcceptMergeRequestOptions {
  merge_commit_message?: string;
  squash_commit_message?: string;
  squash?: boolean;
  should_remove_source_branch?: boolean;
  merge_when_pipeline_succeeds?: boolean;
  sha?: string;
}

export interface ShowMergeRequestOptions {
  render_html?: boolean;
  include_diverged_commits_count?: true;
  include_rebase_in_progress?: boolean;
}

export interface CreateMergeRequestOptions {
  assignee_id?: number;
  description?: string;
  target_project_id?: number;
  labels?: string;
  milestone_id?: number;
  remove_source_branch?: boolean;
  allow_collaboration?: boolean;
  allow_maintainer_to_push?: boolean;
  squash?: boolean;
}

export interface UpdateMergeRequestOptions {
  target_branch?: number;
  title?: string;
  assignee_id?: number;
  milestone_id?: number;
  labels?: string;
  description?: string;
  state_event?: string;
  remove_source_branch?: boolean;
  squash?: boolean;
  discussion_locked?: boolean;
  allow_collaboration?: boolean;
  allow_maintainer_to_push?: boolean;
}

// Notification Settings Levels
export type NotificationSettingLevel =
  | 'disabled'
  | 'participating'
  | 'watch'
  | 'global'
  | 'mention'
  | 'custom';

// Services
export type SupportedService =
  | 'asana'
  | 'assembla'
  | 'bamboo'
  | 'bugzilla'
  | 'buildkite'
  | 'campfire'
  | 'custom-issue-tracker'
  | 'drone-ci'
  | 'emails-on-push'
  | 'external-wiki'
  | 'flowdock'
  | 'hangouts_chat'
  | 'hipchat'
  | 'irker'
  | 'jira'
  | 'kubernetes'
  | 'slack-slash-commands'
  | 'slack'
  | 'mattermost-slash-commands'
  | 'packagist'
  | 'pipelines-email'
  | 'pivotaltracker'
  | 'prometheus'
  | 'pushover'
  | 'redmine'
  | 'microsoft-teams'
  | 'mattermost'
  | 'mattermost-slash-commands'
  | 'teamcity'
  | 'jenkins'
  | 'jenkins-deprecated'
  | 'mock-ci';

// Snippets
export type SnippetVisibility = 'private' | 'public' | 'internal';

// User Impersonation Tokens
export type ImpersonationTokenScope = 'api' | 'read_user';

// Project upload metadata
export interface ProjectUploadMetadata {
  filename?: string,
  contentType?: string,
}
