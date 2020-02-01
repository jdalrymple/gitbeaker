// Groups
export * from './Groups';
export * from './GroupAccessRequests';
export * from './GroupBadges';
export * from './GroupCustomAttributes';
export * from './GroupIssueBoards';
export * from './GroupMembers';
export * from './GroupMilestones';
export * from './GroupProjects';
export * from './GroupVariables';
export * from './GroupLabels';
export * from './Epics';
export * from './EpicIssues';
export * from './EpicNotes';
export * from './EpicDiscussions';

// Users
export * from './Users';
export * from './UserCustomAttributes';
export * from './UserEmails';
export * from './UserImpersonationTokens';
export * from './UserKeys';
export * from './UserGPGKeys';

// Projects
export * from './Branches';
export * from './Commits';
export * from './CommitDiscussions';
export * from './ContainerRegistry';
export * from './Deployments';
export * from './DeployKeys';
export * from './Environments';
export * from './Issues';
export * from './IssuesStatistics';
export * from './IssueNotes';
export * from './IssueDiscussions';
export * from './IssueAwardEmojis';
export * from './Jobs';
export * from './Labels';
export * from './MergeRequests';
export * from './MergeRequestAwardEmojis';
export * from './MergeRequestDiscussions';
export * from './MergeRequestNotes';
export * from './Packages';
export * from './Pipelines';
export * from './PipelineSchedules';
export * from './PipelineScheduleVariables';
export * from './Projects';
export * from './ProjectAccessRequests';
export * from './ProjectBadges';
export * from './ProjectCustomAttributes';
export * from './ProjectImportExport';
export * from './ProjectIssueBoards';
export * from './ProjectHooks';
export * from './ProjectMembers';
export * from './ProjectMilestones';
export * from './ProjectSnippets';
export * from './ProjectSnippetNotes';
export * from './ProjectSnippetDiscussions';
export * from './ProjectSnippetAwardEmojis';
export * from './ProtectedBranches';
export * from './ProtectedTags';
export * from './ProjectVariables';
export * from './PushRules';
export * from './Releases';
export * from './ReleaseLinks';
export * from './Repositories';
export * from './RepositoryFiles';
export * from './Runners';
export * from './Services';
export * from './Tags';
export * from './Todos';
export * from './Triggers';
export * from './VulnerabilityFindings';

// General
export * from './ApplicationSettings';
export * from './BroadcastMessages';
export * from './Events';
export * from './FeatureFlags';
export * from './GeoNodes';
export * from './GitignoreTemplates';
export * from './GitLabCIYMLTemplates';
export * from './Keys';
export * from './License';
export * from './LicenceTemplates';
export * from './Lint';
export * from './Namespaces';
// export * from './NotificationSettings';
export * from './Markdown';
export * from './PagesDomains';
export * from './Search';
export * from './SidekiqMetrics';
export * from './Snippets';
export * from './SystemHooks';
export * from './Version';
export * from './Wikis';

export type GroupId = string | number;
export type GroupProjectId = string | number;
export type KeyId = string;
export type NamespaceId = string | number;
export type ProjectId = string | number;
export type ResourceId = string | number;

// Access Requests
export type AccessLevel = 10 | 20 | 30 | 40 | 50;
