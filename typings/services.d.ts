
import * as FormData from 'form-data';

export as namespace Gitlab;

declare namespace Service {
  type AwardId = number;
  type BroadcastMessageId = number;
  type BadgeId = number;
  type BoardId = number;
  type CustomAttributeId = number;
  type DeploymentId = number;
  type DiscussionId = number;
  type EnvironmentId = number;
  type EpicId = number;
  type GeonodeId = number;
  type GroupId = string | number;
  type GroupProjectId = string | number;
  type HookId = number;
  type ImpersonationTokenId = number;
  type IssueId = number;
  type JobId = number;
  type LabelId = number;
  type KeyId = string;
  type NamespaceId = string | number;
  type MergeRequestId = number;
  type MilestoneId = number;
  type NoteId = number;
  type PipelineId = number;
  type PipelineScheduleId = number;
  type ProjectId = string | number;
  type RunnerId = number;
  type SnippetId = number;
  type TodoId = number;
  type TriggerId = number;
  type VersionId = number;
  type UserId = number;


  // Access Requests
  type AccessLevel = 10 | 20 | 30 | 40 | 50

  // Commits
  interface CommitAction {
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
  type EventAction =
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

  type EventTarget =
    | 'issue'
    | 'milestone'
    | 'merge_request'
    | 'note'
    | 'project'
    | 'snippet'
    | 'user';

  interface EventOptions {
    action?: EventAction;
    targetType?: EventTarget;
  }

  // Jobs
  type JobScope =
    | 'created'
    | 'pending'
    | 'running'
    | 'failed'
    | 'success'
    | 'canceled'
    | 'skipped'
    | 'manual';

  // Merge Requests
  interface AcceptMergeRequestOptions {
    merge_commit_message?: string;
    squash_commit_message?: string;
    squash?: boolean;
    should_remove_source_branch?: boolean;
    merge_when_pipeline_succeeds?: boolean;
    sha?: string;
  }

  interface ShowMergeRequestOptions {
    render_html?: boolean;
    include_diverged_commits_count?: true;
    include_rebase_in_progress?: boolean;
  }

  interface CreateMergeRequestOptions {
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

  interface UpdateMergeRequestOptions {
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
  type NotificationSettingLevel =
    | 'disabled'
    | 'participating'
    | 'watch'
    | 'global'
    | 'mention'
    | 'custom';

  // Services
  type SupportedService =
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
  type SnippetVisibility = 'private' | 'public' | 'internal';

  // User Impersonation Tokens
  type ImpersonationTokenScope = 'api' | 'read_user';

  // Project upload metadata
  interface ProjectUploadMetadata {
    filename?: string,
    contentType?: string,
  }
}