// Groups
export { default as Groups } from './Groups';
export { default as GroupAccessRequests } from './GroupAccessRequests';
export { default as GroupBadges } from './GroupBadges';
export { default as GroupCustomAttributes } from './GroupCustomAttributes';
export { default as GroupIssueBoards } from './GroupIssueBoards';
export { default as GroupMembers } from './GroupMembers';
export { default as GroupMilestones } from './GroupMilestones';
export { default as GroupProjects } from './GroupProjects';
export { default as GroupVariables } from './GroupVariables';
export { default as Epics } from './Epics';
export { default as EpicIssues } from './EpicIssues';
export { default as EpicNotes } from './EpicNotes';
export { default as EpicDiscussions } from './EpicDiscussions';

// Users
export { default as Users } from './Users';
export { default as UserCustomAttributes } from './UserCustomAttributes';
export { default as UserEmails } from './UserEmails';
export { default as UserImpersonationTokens } from './UserImpersonationTokens';
export { default as UserKeys } from './UserKeys';
export { default as UserGPGKeys } from './UserGPGKeys';

// Projects
export { default as Branches } from './Branches';
export { default as Commits } from './Commits';
export { default as CommitDiscussions } from './CommitDiscussions';
export { default as ContainerRegistry } from './ContainerRegistry';
export { default as Deployments } from './Deployments';
export { default as DeployKeys } from './DeployKeys';
export { default as Environments } from './Environments';
export { default as Issues } from './Issues';
export { default as IssueNotes } from './IssueNotes';
export { default as IssueDiscussions } from './IssueDiscussions';
export { default as IssueAwardEmojis } from './IssueAwardEmojis';
export { default as Jobs } from './Jobs';
export { default as Labels } from './Labels';
export { default as MergeRequests } from './MergeRequests';
export { default as MergeRequestAwardEmojis } from './MergeRequestAwardEmojis';
export { default as MergeRequestDiscussions } from './MergeRequestDiscussions';
export { default as MergeRequestNotes } from './MergeRequestNotes';
export { default as Packages } from './Packages';
export { default as Pipelines } from './Pipelines';
export { default as PipelineSchedules } from './PipelineSchedules';
export { default as PipelineScheduleVariables } from './PipelineScheduleVariables';
export { default as Projects } from './Projects';
export { default as ProjectAccessRequests } from './ProjectAccessRequests';
export { default as ProjectBadges } from './ProjectBadges';
export { default as ProjectCustomAttributes } from './ProjectCustomAttributes';
export { default as ProjectImportExport } from './ProjectImportExport';
export { default as ProjectIssueBoards } from './ProjectIssueBoards';
export { default as ProjectHooks } from './ProjectHooks';
export { default as ProjectMembers } from './ProjectMembers';
export { default as ProjectMilestones } from './ProjectMilestones';
export { default as ProjectSnippets } from './ProjectSnippets';
export { default as ProjectSnippetNotes } from './ProjectSnippetNotes';
export { default as ProjectSnippetDiscussions } from './ProjectSnippetDiscussions';
export { default as ProjectSnippetAwardEmojis } from './ProjectSnippetAwardEmojis';
export { default as ProtectedBranches } from './ProtectedBranches';
export { default as ProtectedTags } from './ProtectedTags';
export { default as ProjectVariables } from './ProjectVariables';
export { default as PushRules } from './PushRules';
export { default as Releases } from './Releases';
export { default as ReleaseLinks } from './ReleaseLinks';
export { default as Repositories } from './Repositories';
export { default as RepositoryFiles } from './RepositoryFiles';
export { default as Runners } from './Runners';
export { default as Services } from './Services';
export { default as Tags } from './Tags';
export { default as Todos } from './Todos';
export { default as Triggers } from './Triggers';

// General
export { default as ApplicationSettings } from './ApplicationSettings';
export { default as BroadcastMessages } from './BroadcastMessages';
export { default as Events } from './Events';
export { default as FeatureFlags } from './FeatureFlags';
export { default as GeoNodes } from './GeoNodes';
export { default as GitignoreTemplates } from './GitignoreTemplates';
export { default as GitLabCIYMLTemplates } from './GitLabCIYMLTemplates';
export { default as Keys } from './Keys';
export { default as Licence } from './Licence';
export { default as LicenceTemplates } from './LicenceTemplates';
export { default as Lint } from './Lint';
export { default as Namespaces } from './Namespaces';
export { default as NotificationSettings } from './NotificationSettings';
export { default as Markdown } from './Markdown';
export { default as PagesDomains } from './PagesDomains';
export { default as Search } from './Search';
export { default as SidekiqMetrics } from './SidekiqMetrics';
export { default as Snippets } from './Snippets';
export { default as SystemHooks } from './SystemHooks';
export { default as Version } from './Version';
export { default as Wikis } from './Wikis';

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
export type ResourceId = string | number;
export type SnippetId = number;
export type TodoId = number;
export type TriggerId = number;
export type VersionId = number;
export type UserId = number;

// Access Requests
export type AccessLevel = 10 | 20 | 30 | 40 | 50;

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
export interface EventOptions {
  action?:
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
  targetType?: 'issue' | 'milestone' | 'merge_request' | 'note' | 'project' | 'snippet' | 'user';
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
export interface UploadMetadata {
  filename?: string;
  contentType?: string;
}
