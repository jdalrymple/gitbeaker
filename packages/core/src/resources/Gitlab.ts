/* eslint-disable  max-classes-per-file */

import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { Groups } from './Groups';
import { GroupAccessRequests } from './GroupAccessRequests';
import { GroupBadges } from './GroupBadges';
import { GroupCustomAttributes } from './GroupCustomAttributes';
import { GroupIssueBoards } from './GroupIssueBoards';
import { GroupMembers } from './GroupMembers';
import { GroupMilestones } from './GroupMilestones';
import { GroupRunners } from './GroupRunners';
import { GroupVariables } from './GroupVariables';
import { GroupLabels } from './GroupLabels';
import { GroupDeployTokens } from './GroupDeployTokens';
import { Epics } from './Epics';
import { EpicIssues } from './EpicIssues';
import { EpicLinks } from './EpicLinks';
import { EpicNotes } from './EpicNotes';
import { EpicDiscussions } from './EpicDiscussions';
import { Users } from './Users';
import { UserCustomAttributes } from './UserCustomAttributes';
import { UserEmails } from './UserEmails';
import { UserImpersonationTokens } from './UserImpersonationTokens';
import { UserSSHKeys } from './UserSSHKeys';
import { UserGPGKeys } from './UserGPGKeys';
import { Branches } from './Branches';
import { Commits } from './Commits';
import { CommitDiscussions } from './CommitDiscussions';
import { ContainerRegistry } from './ContainerRegistry';
import { Deployments } from './Deployments';
import { DeployKeys } from './DeployKeys';
import { Environments } from './Environments';
import { FreezePeriods } from './FreezePeriods';
import { Issues } from './Issues';
import { IssuesStatistics } from './IssuesStatistics';
import { IssueNotes } from './IssueNotes';
import { IssueNoteAwardEmojis } from './IssueNoteAwardEmojis';
import { IssueDiscussions } from './IssueDiscussions';
import { IssueAwardEmojis } from './IssueAwardEmojis';
import { Jobs } from './Jobs';
import { Labels } from './Labels';
import { MergeRequests } from './MergeRequests';
import { MergeRequestApprovals } from './MergeRequestApprovals';
import { MergeRequestAwardEmojis } from './MergeRequestAwardEmojis';
import { MergeRequestDiscussions } from './MergeRequestDiscussions';
import { MergeRequestNotes } from './MergeRequestNotes';
import { Packages } from './Packages';
import { PackageRegistry } from './PackageRegistry';
import { Pipelines } from './Pipelines';
import { PipelineSchedules } from './PipelineSchedules';
import { PipelineScheduleVariables } from './PipelineScheduleVariables';
import { Projects } from './Projects';
import { ProjectAccessRequests } from './ProjectAccessRequests';
import { ProjectBadges } from './ProjectBadges';
import { ProjectCustomAttributes } from './ProjectCustomAttributes';
import { ProjectImportExport } from './ProjectImportExport';
import { ProjectIssueBoards } from './ProjectIssueBoards';
import { ProjectHooks } from './ProjectHooks';
import { ProjectMembers } from './ProjectMembers';
import { ProjectMilestones } from './ProjectMilestones';
import { ProjectSnippets } from './ProjectSnippets';
import { ProjectSnippetNotes } from './ProjectSnippetNotes';
import { ProjectSnippetDiscussions } from './ProjectSnippetDiscussions';
import { ProjectSnippetAwardEmojis } from './ProjectSnippetAwardEmojis';
import { ProtectedBranches } from './ProtectedBranches';
import { ProtectedTags } from './ProtectedTags';
import { ProjectVariables } from './ProjectVariables';
import { ProjectDeployTokens } from './ProjectDeployTokens';
import { PushRules } from './PushRules';
import { Releases } from './Releases';
import { ReleaseLinks } from './ReleaseLinks';
import { Repositories } from './Repositories';
import { RepositoryFiles } from './RepositoryFiles';
import { RepositorySubmodules } from './RepositorySubmodules';
import { Runners } from './Runners';
import { Services } from './Services';
import { Tags } from './Tags';
import { Todos } from './Todos';
import { Triggers } from './Triggers';
import { VulnerabilityFindings } from './VulnerabilityFindings';
import { ApplicationSettings } from './ApplicationSettings';
import { BroadcastMessages } from './BroadcastMessages';
import { Events } from './Events';
import { FeatureFlags } from './FeatureFlags';
import { GeoNodes } from './GeoNodes';
import { GitignoreTemplates } from './GitignoreTemplates';
import { GitLabCIYMLTemplates } from './GitLabCIYMLTemplates';
import { Keys } from './Keys';
import { License } from './License';
import { LicenseTemplates } from './LicenseTemplates';
import { Lint } from './Lint';
import { Namespaces } from './Namespaces';
import { NotificationSettings } from './NotificationSettings';
import { Markdown } from './Markdown';
import { PagesDomains } from './PagesDomains';
import { Search } from './Search';
import { SidekiqMetrics } from './SidekiqMetrics';
import { Snippets } from './Snippets';
import { SystemHooks } from './SystemHooks';
import { Version } from './Version';
import { Wikis } from './Wikis';

// Figure out a better way of doing this using mapped types: https://stackoverflow.com/questions/67729408/how-to-create-mapped-type-using-generic-class-instances-in-typesscript?noredirect=1#comment119718863_67729408
// This will most likely be accomplished using higher kinded types: https://github.com/Microsoft/TypeScript/issues/1213#issuecomment-750930496

type BundledService<C extends boolean = false> = {
  Groups: Groups<C>;
  GroupAccessRequests: GroupAccessRequests<C>;
  GroupBadges: GroupBadges<C>;
  GroupCustomAttributes: GroupCustomAttributes<C>;
  GroupIssueBoards: GroupIssueBoards<C>;
  GroupMembers: GroupMembers<C>;
  GroupMilestones: GroupMilestones<C>;
  GroupRunners: GroupRunners<C>;
  GroupVariables: GroupVariables<C>;
  GroupLabels: GroupLabels<C>;
  GroupDeployTokens: GroupDeployTokens<C>;
  Epics: Epics<C>;
  EpicIssues: EpicIssues<C>;
  EpicLinks: EpicLinks<C>;
  EpicNotes: EpicNotes<C>;
  EpicDiscussions: EpicDiscussions<C>;
  Users: Users<C>;
  UserCustomAttributes: UserCustomAttributes<C>;
  UserEmails: UserEmails<C>;
  UserImpersonationTokens: UserImpersonationTokens<C>;
  UserSSHKeys: UserSSHKeys<C>;
  UserGPGKeys: UserGPGKeys<C>;
  Branches: Branches<C>;
  Commits: Commits<C>;
  CommitDiscussions: CommitDiscussions<C>;
  ContainerRegistry: ContainerRegistry<C>;
  Deployments: Deployments<C>;
  DeployKeys: DeployKeys<C>;
  Environments: Environments<C>;
  FreezePeriods: FreezePeriods<C>;
  Issues: Issues<C>;
  IssuesStatistics: IssuesStatistics<C>;
  IssueNotes: IssueNotes<C>;
  IssueNoteAwardEmojis: IssueNoteAwardEmojis<C>;
  IssueDiscussions: IssueDiscussions<C>;
  IssueAwardEmojis: IssueAwardEmojis<C>;
  Jobs: Jobs<C>;
  Labels: Labels<C>;
  MergeRequests: MergeRequests<C>;
  MergeRequestApprovals: MergeRequestApprovals<C>;
  MergeRequestAwardEmojis: MergeRequestAwardEmojis<C>;
  MergeRequestDiscussions: MergeRequestDiscussions<C>;
  MergeRequestNotes: MergeRequestNotes<C>;
  Packages: Packages<C>;
  PackageRegistry: PackageRegistry<C>;
  Pipelines: Pipelines<C>;
  PipelineSchedules: PipelineSchedules<C>;
  PipelineScheduleVariables: PipelineScheduleVariables<C>;
  Projects: Projects<C>;
  ProjectAccessRequests: ProjectAccessRequests<C>;
  ProjectBadges: ProjectBadges<C>;
  ProjectCustomAttributes: ProjectCustomAttributes<C>;
  ProjectImportExport: ProjectImportExport<C>;
  ProjectIssueBoards: ProjectIssueBoards<C>;
  ProjectHooks: ProjectHooks<C>;
  ProjectMembers: ProjectMembers<C>;
  ProjectMilestones: ProjectMilestones<C>;
  ProjectSnippets: ProjectSnippets<C>;
  ProjectSnippetNotes: ProjectSnippetNotes<C>;
  ProjectSnippetDiscussions: ProjectSnippetDiscussions<C>;
  ProjectSnippetAwardEmojis: ProjectSnippetAwardEmojis<C>;
  ProtectedBranches: ProtectedBranches<C>;
  ProtectedTags: ProtectedTags<C>;
  ProjectVariables: ProjectVariables<C>;
  ProjectDeployTokens: ProjectDeployTokens<C>;
  PushRules: PushRules<C>;
  Releases: Releases<C>;
  ReleaseLinks: ReleaseLinks<C>;
  Repositories: Repositories<C>;
  RepositoryFiles: RepositoryFiles<C>;
  RepositorySubmodules: RepositorySubmodules<C>;
  Runners: Runners<C>;
  Services: Services<C>;
  Tags: Tags<C>;
  Todos: Todos<C>;
  Triggers: Triggers<C>;
  VulnerabilityFindings: VulnerabilityFindings<C>;
  ApplicationSettings: ApplicationSettings<C>;
  BroadcastMessages: BroadcastMessages<C>;
  Events: Events<C>;
  FeatureFlags: FeatureFlags<C>;
  GeoNodes: GeoNodes<C>;
  GitignoreTemplates: GitignoreTemplates<C>;
  GitLabCIYMLTemplates: GitLabCIYMLTemplates<C>;
  Keys: Keys<C>;
  License: License<C>;
  LicenseTemplates: LicenseTemplates<C>;
  Lint: Lint<C>;
  Namespaces: Namespaces<C>;
  NotificationSettings: NotificationSettings<C>;
  Markdown: Markdown<C>;
  PagesDomains: PagesDomains<C>;
  Search: Search<C>;
  SidekiqMetrics: SidekiqMetrics<C>;
  Snippets: Snippets<C>;
  SystemHooks: SystemHooks<C>;
  Version: Version<C>;
  Wikis: Wikis<C>;
};

const resources = {
  Groups,
  GroupAccessRequests,
  GroupBadges,
  GroupCustomAttributes,
  GroupIssueBoards,
  GroupMembers,
  GroupMilestones,
  GroupRunners,
  GroupVariables,
  GroupLabels,
  GroupDeployTokens,
  Epics,
  EpicIssues,
  EpicLinks,
  EpicNotes,
  EpicDiscussions,
  Users,
  UserCustomAttributes,
  UserEmails,
  UserImpersonationTokens,
  UserSSHKeys,
  UserGPGKeys,
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
  IssueNoteAwardEmojis,
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
  PackageRegistry,
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
  ProjectDeployTokens,
  PushRules,
  Releases,
  ReleaseLinks,
  Repositories,
  RepositoryFiles,
  RepositorySubmodules,
  Runners,
  Services,
  Tags,
  Todos,
  Triggers,
  VulnerabilityFindings,
  ApplicationSettings,
  BroadcastMessages,
  Events,
  FeatureFlags,
  GeoNodes,
  GitignoreTemplates,
  GitLabCIYMLTemplates,
  Keys,
  License,
  LicenseTemplates,
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
};

export class Gitlab<C extends boolean = false> extends (class {} as new () => BundledService) {
  constructor(options: BaseResourceOptions<C>) {
    super();

    Object.keys(resources).forEach((s) => {
      this[s] = new resources[s]<C>(options);
    });
  }
}
