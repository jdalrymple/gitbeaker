import { bundler } from './infrastructure';
import * as APIServices from './services';

// All separately
export * from './services';

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
  GroupVariables: APIServices.GroupVariables,
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
  DeployKeys: APIServices.DeployKeys,
  Deployments: APIServices.Deployments,
  Environments: APIServices.Environments,
  Issues: APIServices.Issues,
  IssueAwardEmojis: APIServices.IssueAwardEmojis,
  IssueNotes: APIServices.IssueNotes,
  IssueDiscussions: APIServices.IssueDiscussions,
  Jobs: APIServices.Jobs,
  Labels: APIServices.Labels,
  MergeRequests: APIServices.MergeRequests,
  MergeRequestAwardEmojis: APIServices.MergeRequestAwardEmojis,
  MergeRequestDiscussions: APIServices.MergeRequestDiscussions,
  MergeRequestNotes: APIServices.MergeRequestNotes,
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
  ProjectVariables: APIServices.ProjectVariables,
  Repositories: APIServices.Repositories,
  RepositoryFiles: APIServices.RepositoryFiles,
  Runners: APIServices.Runners,
  Services: APIServices.Services,
  Tags: APIServices.Tags,
  Triggers: APIServices.Triggers,
});

// All initialized
export const Gitlab = bundler(APIServices);
