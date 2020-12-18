import * as Gitbeaker from '@gitbeaker/core';
import { modifyServices } from '@gitbeaker/requester-utils';
import { requesterFn } from './GotRequester';

const { getAPIMap, ...services } = Gitbeaker;
const APIServices = modifyServices(services, { requesterFn });

export const {
  // Groups
  Groups,
  GroupAccessRequests,
  GroupBadges,
  GroupCustomAttributes,
  GroupIssueBoards,
  GroupMembers,
  GroupMilestones,
  GroupProjects,
  GroupRunners,
  GroupVariables,
  GroupLabels,
  Epics,
  EpicIssues,
  EpicNotes,
  EpicDiscussions,

  // Users
  Users,
  UserCustomAttributes,
  UserEmails,
  UserImpersonationTokens,
  UserKeys,
  UserGPGKeys,

  // Projects
  Branches,
  Commits,
  CommitDiscussions,
  ContainerRegistry,
  Deployments,
  DeployKeys,
  Environments,
  FreezePeriods,
  Issues,
  IssuesStatistics,
  IssueNotes,
  IssueDiscussions,
  IssueAwardEmojis,
  Jobs,
  Labels,
  MergeRequests,
  MergeRequestApprovals,
  MergeRequestAwardEmojis,
  MergeRequestDiscussions,
  MergeRequestNotes,
  Packages,
  Pipelines,
  PipelineSchedules,
  PipelineScheduleVariables,
  Projects,
  ProjectAccessRequests,
  ProjectBadges,
  ProjectCustomAttributes,
  ProjectImportExport,
  ProjectIssueBoards,
  ProjectHooks,
  ProjectMembers,
  ProjectMilestones,
  ProjectSnippets,
  ProjectSnippetNotes,
  ProjectSnippetDiscussions,
  ProjectSnippetAwardEmojis,
  ProtectedBranches,
  ProtectedTags,
  ProjectVariables,
  PushRules,
  Releases,
  ReleaseLinks,
  Repositories,
  RepositoryFiles,
  Runners,
  Services,
  Tags,
  Todos,
  Triggers,
  VulnerabilityFindings,

  // Genral
  ApplicationSettings,
  BroadcastMessages,
  Events,
  FeatureFlags,
  GeoNodes,
  GitignoreTemplates,
  GitLabCIYMLTemplates,
  Keys,
  License,
  LicenceTemplates,
  Lint,
  Namespaces,
  NotificationSettings,
  Markdown,
  PagesDomains,
  Search,
  SidekiqMetrics,
  Snippets,
  SystemHooks,
  Version,
  Wikis,

  // Bundles
  GroupsBundle,
  UsersBundle,
  ProjectsBundle,
  Gitlab,
} = APIServices;
