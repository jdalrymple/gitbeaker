import { bundler } from './infrastructure';
import * as APIServices from './services';

/* -------------- Single Services ------------- */
export * from './services';

/* ------------------ Bundles ----------------- */

// Groups
export const GroupsBundle = bundler({
  Groups: APIServices.Groups,
  GroupAccessRequests: APIServices.GroupAccessRequests,
  GroupBadges: APIServices.GroupBadges,
  GroupCustomAttributes: APIServices.GroupCustomAttributes,
  GroupIssueBoards: APIServices.GroupIssueBoards,
  GroupMembers: APIServices.GroupMembers,
  GroupMilestones: APIServices.GroupMilestones,
  GroupProjects: APIServices.GroupProjects,
  GroupRunners: APIServices.GroupRunners,
  GroupVariables: APIServices.GroupVariables,
  GroupLabels: APIServices.GroupLabels,
  GroupDeployTokens: APIServices.GroupDeployTokens,
  Epics: APIServices.Epics,
  EpicIssues: APIServices.EpicIssues,
  EpicNotes: APIServices.EpicNotes,
  EpicDiscussions: APIServices.EpicDiscussions,
});

// Users
export const UsersBundle = bundler({
  Users: APIServices.Users,
  UserCustomAttributes: APIServices.UserCustomAttributes,
  UserEmails: APIServices.UserEmails,
  UserImpersonationTokens: APIServices.UserImpersonationTokens,
  UserKeys: APIServices.UserKeys,
  UserGPGKeys: APIServices.UserGPGKeys,
});

// Projects
export const ProjectsBundle = bundler({
  Branches: APIServices.Branches,
  Commits: APIServices.Commits,
  CommitDiscussions: APIServices.CommitDiscussions,
  ContainerRegistry: APIServices.ContainerRegistry,
  DeployKeys: APIServices.DeployKeys,
  Deployments: APIServices.Deployments,
  Environments: APIServices.Environments,
  FreezePeriods: APIServices.FreezePeriods,
  Issues: APIServices.Issues,
  IssuesStatistics: APIServices.IssuesStatistics,
  IssueAwardEmojis: APIServices.IssueAwardEmojis,
  IssueNotes: APIServices.IssueNotes,
  IssueDiscussions: APIServices.IssueDiscussions,
  Jobs: APIServices.Jobs,
  Labels: APIServices.Labels,
  MergeRequests: APIServices.MergeRequests,
  MergeRequestApprovals: APIServices.MergeRequestApprovals,
  MergeRequestAwardEmojis: APIServices.MergeRequestAwardEmojis,
  MergeRequestDiscussions: APIServices.MergeRequestDiscussions,
  MergeRequestNotes: APIServices.MergeRequestNotes,
  Packages: APIServices.Packages,
  Pipelines: APIServices.Pipelines,
  PipelineSchedules: APIServices.PipelineSchedules,
  PipelineScheduleVariables: APIServices.PipelineScheduleVariables,
  Projects: APIServices.Projects,
  ProjectAccessRequests: APIServices.ProjectAccessRequests,
  ProjectBadges: APIServices.ProjectBadges,
  ProjectCustomAttributes: APIServices.ProjectCustomAttributes,
  ProjectImportExport: APIServices.ProjectImportExport,
  ProjectIssueBoards: APIServices.ProjectIssueBoards,
  ProjectHooks: APIServices.ProjectHooks,
  ProjectMembers: APIServices.ProjectMembers,
  ProjectMilestones: APIServices.ProjectMilestones,
  ProjectSnippets: APIServices.ProjectSnippets,
  ProjectSnippetNotes: APIServices.ProjectSnippetNotes,
  ProjectSnippetDiscussions: APIServices.ProjectSnippetDiscussions,
  ProjectSnippetAwardEmojis: APIServices.ProjectSnippetAwardEmojis,
  ProtectedBranches: APIServices.ProtectedBranches,
  ProtectedTags: APIServices.ProtectedTags,
  ProjectVariables: APIServices.ProjectVariables,
  ProjectDeployTokens: APIServices.ProjectDeployTokens,
  PushRules: APIServices.PushRules,
  Releases: APIServices.Releases,
  ReleaseLinks: APIServices.ReleaseLinks,
  Repositories: APIServices.Repositories,
  RepositoryFiles: APIServices.RepositoryFiles,
  Runners: APIServices.Runners,
  Services: APIServices.Services,
  Tags: APIServices.Tags,
  Todos: APIServices.Todos,
  Triggers: APIServices.Triggers,
  VulnerabilityFindings: APIServices.VulnerabilityFindings,
});

// All initialized
export const Gitlab = bundler(APIServices);

/* ---------------- Bundles Types-------------- */
export type UsersBundle = InstanceType<typeof UsersBundle>;
export type GroupsBundle = InstanceType<typeof GroupsBundle>;
export type ProjectsBundle = InstanceType<typeof ProjectsBundle>;
export type Gitlab = InstanceType<typeof Gitlab>;
