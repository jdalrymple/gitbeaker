import * as Gitbeaker from '@gitbeaker/core';
import { Requester } from './KyRequester';

type Constructor<T = {}> = new (...args: any[]) => T;
type DictionaryOfConstructors<T> = { [K in keyof T]: Constructor<T[K]> };

const APIServices = {} as DictionaryOfConstructors<T>;

Object.keys(Gitbeaker as DictionaryOfConstructors<T>).forEach((name: string) => {
  APIServices[name] = (args: { [key: string]: any }) =>
    new Gitbeaker[name]({
      requester: Requester,
      ...args,
    });
});

/* -------------- Single Services ------------- */
// Groups
export const {
  Groups,
  GroupAccessRequests,
  GroupBadges,
  GroupCustomAttributes,
  GroupIssueBoards,
  GroupMembers,
  GroupMilestones,
  GroupProjects,
  GroupVariables,
  GroupLabels,
  Epics,
  EpicIssues,
  EpicNotes,
  EpicDiscussions,
} = APIServices;

// Users
export const {
  Users,
  UserCustomAttributes,
  UserEmails,
  UserImpersonationTokens,
  UserKeys,
  UserGPGKeys,
} = APIServices;

// Projects
export const {
  Branches,
  Commits,
  CommitDiscussions,
  ContainerRegistry,
  Deployments,
  DeployKeys,
  Environments,
  Issues,
  IssuesStatistics,
  IssueNotes,
  IssueDiscussions,
  IssueAwardEmojis,
  Jobs,
  Labels,
  MergeRequests,
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
} = APIServices;

// Genral
export const {
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
} = APIServices;

/* ------------------ Bundles ----------------- */
export const { GroupsBundle, UsersBundle, ProjectsBundle, Gitlab } = APIServices;
