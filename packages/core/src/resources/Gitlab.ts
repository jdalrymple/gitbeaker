import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';

// General
import { Agents } from './Agents';
import { AlertManagement } from './AlertManagement';
import { ApplicationAppearance } from './ApplicationAppearance';
import { ApplicationPlanLimits } from './ApplicationPlanLimits';
import { Applications } from './Applications';
import { ApplicationSettings } from './ApplicationSettings';
import { ApplicationStatistics } from './ApplicationStatistics';
import { AuditEvents } from './AuditEvents';
import { Avatar } from './Avatar';
import { BroadcastMessages } from './BroadcastMessages';
import { CodeSuggestions } from './CodeSuggestions';
import { Composer } from './Composer';
import { Conan } from './Conan';
import { DashboardAnnotations } from './DashboardAnnotations';
import { Debian } from './Debian';
import { DependencyProxy } from './DependencyProxy';
import { DeployKeys } from './DeployKeys';
import { DeployTokens } from './DeployTokens';
import { DockerfileTemplates } from './DockerfileTemplates';
import { Events } from './Events';
import { Experiments } from './Experiments';
import { GeoNodes } from './GeoNodes';
import { GeoSites } from './GeoSites';
import { GitignoreTemplates } from './GitignoreTemplates';
import { GitLabCIYMLTemplates } from './GitLabCIYMLTemplates';
import { Import } from './Import';
import { InstanceLevelCICDVariables } from './InstanceLevelCICDVariables';
import { Keys } from './Keys';
import { License } from './License';
import { LicenseTemplates } from './LicenseTemplates';
import { Lint } from './Lint';
import { Markdown } from './Markdown';
import { Maven } from './Maven';
import { Metadata } from './Metadata';
import { Migrations } from './Migrations';
import { Namespaces } from './Namespaces';
import { NotificationSettings } from './NotificationSettings';
import { NPM } from './NPM';
import { NuGet } from './NuGet';
import { PersonalAccessTokens } from './PersonalAccessTokens';
import { PyPI } from './PyPI';
import { RubyGems } from './RubyGems';
import { Search } from './Search';
import { SearchAdmin } from './SearchAdmin';
import { ServiceAccounts } from './ServiceAccounts';
import { ServiceData } from './ServiceData';
import { SidekiqMetrics } from './SidekiqMetrics';
import { SidekiqQueues } from './SidekiqQueues';
import { SnippetRepositoryStorageMoves } from './SnippetRepositoryStorageMoves';
import { Snippets } from './Snippets';
import { Suggestions } from './Suggestions';
import { SystemHooks } from './SystemHooks';
import { TodoLists } from './TodoLists';
import { Topics } from './Topics';
import { Branches } from './Branches';
import { CommitDiscussions } from './CommitDiscussions';
import { Commits } from './Commits';
import { ContainerRegistry } from './ContainerRegistry';
import { Deployments } from './Deployments';
import { Environments } from './Environments';
import { ErrorTrackingClientKeys } from './ErrorTrackingClientKeys';
import { ErrorTrackingSettings } from './ErrorTrackingSettings';
import { ExternalStatusChecks } from './ExternalStatusChecks';
import { FeatureFlags } from './FeatureFlags';
import { FeatureFlagUserLists } from './FeatureFlagUserLists';
import { FreezePeriods } from './FreezePeriods';
import { GitlabPages } from './GitlabPages';
import { GoProxy } from './GoProxy';
import { Helm } from './Helm';
import { Integrations } from './Integrations';
import { IssueAwardEmojis } from './IssueAwardEmojis';
import { IssueDiscussions } from './IssueDiscussions';
import { IssueIterationEvents } from './IssueIterationEvents';
import { IssueLabelEvents } from './IssueLabelEvents';
import { IssueLinks } from './IssueLinks';
import { IssueMilestoneEvents } from './IssueMilestoneEvents';
import { IssueNoteAwardEmojis } from './IssueNoteAwardEmojis';
import { IssueNotes } from './IssueNotes';
import { Issues } from './Issues';
import { IssuesStatistics } from './IssuesStatistics';
import { IssueStateEvents } from './IssueStateEvents';
import { IssueWeightEvents } from './IssueWeightEvents';
import { JobArtifacts } from './JobArtifacts';
import { Jobs } from './Jobs';
import { MergeRequestApprovals } from './MergeRequestApprovals';
import { MergeRequestAwardEmojis } from './MergeRequestAwardEmojis';
import { MergeRequestContextCommits } from './MergeRequestContextCommits';
import { MergeRequestDiscussions } from './MergeRequestDiscussions';
import { MergeRequestLabelEvents } from './MergeRequestLabelEvents';
import { MergeRequestMilestoneEvents } from './MergeRequestMilestoneEvents';
import { MergeRequestNotes } from './MergeRequestNotes';
import { MergeRequestDraftNotes } from './MergeRequestDraftNotes';
import { MergeRequestNoteAwardEmojis } from './MergeRequestNoteAwardEmojis';
import { MergeRequests } from './MergeRequests';
import { MergeTrains } from './MergeTrains';
import { PackageRegistry } from './PackageRegistry';
import { Packages } from './Packages';
import { PagesDomains } from './PagesDomains';
import { Pipelines } from './Pipelines';
import { PipelineSchedules } from './PipelineSchedules';
import { PipelineScheduleVariables } from './PipelineScheduleVariables';
import { PipelineTriggerTokens } from './PipelineTriggerTokens';
import { ProductAnalytics } from './ProductAnalytics';
import { ProjectAccessRequests } from './ProjectAccessRequests';
import { ProjectAccessTokens } from './ProjectAccessTokens';
import { ProjectAliases } from './ProjectAliases';
import { ProjectBadges } from './ProjectBadges';
import { ProjectCustomAttributes } from './ProjectCustomAttributes';
import { ProjectDORA4Metrics } from './ProjectDORA4Metrics';
import { ProjectHooks } from './ProjectHooks';
import { ProjectImportExports } from './ProjectImportExports';
import { ProjectInvitations } from './ProjectInvitations';
import { ProjectIssueBoards } from './ProjectIssueBoards';
import { ProjectIterations } from './ProjectIterations';
import { ProjectJobTokenScopes } from './ProjectJobTokenScopes';
import { ProjectLabels } from './ProjectLabels';
import { ProjectMembers } from './ProjectMembers';
import { ProjectMilestones } from './ProjectMilestones';
import { ProjectProtectedEnvironments } from './ProjectProtectedEnvironments';
import { ProjectPushRules } from './ProjectPushRules';
import { ProjectRelationsExport } from './ProjectRelationsExport';
import { ProjectReleases } from './ProjectReleases';
import { ProjectRemoteMirrors } from './ProjectRemoteMirrors';
import { ProjectRepositoryStorageMoves } from './ProjectRepositoryStorageMoves';
import { Projects } from './Projects';
import { ProjectSnippetAwardEmojis } from './ProjectSnippetAwardEmojis';
import { ProjectSnippetDiscussions } from './ProjectSnippetDiscussions';
import { ProjectSnippetNotes } from './ProjectSnippetNotes';
import { ProjectSnippets } from './ProjectSnippets';
import { ProjectStatistics } from './ProjectStatistics';
import { ProjectTemplates } from './ProjectTemplates';
import { ProjectVariables } from './ProjectVariables';
import { ProjectVulnerabilities } from './ProjectVulnerabilities';
import { ProjectWikis } from './ProjectWikis';
import { ProtectedBranches } from './ProtectedBranches';
import { ProtectedTags } from './ProtectedTags';
import { ReleaseLinks } from './ReleaseLinks';
import { Repositories } from './Repositories';
import { RepositoryFiles } from './RepositoryFiles';
import { RepositorySubmodules } from './RepositorySubmodules';
import { ResourceGroups } from './ResourceGroups';
import { Runners } from './Runners';
import { SecureFiles } from './SecureFiles';
import { Tags } from './Tags';
import { UserStarredMetricsDashboard } from './UserStarredMetricsDashboard';
import { EpicAwardEmojis } from './EpicAwardEmojis';
import { EpicDiscussions } from './EpicDiscussions';
import { EpicIssues } from './EpicIssues';
import { EpicLabelEvents } from './EpicLabelEvents';
import { EpicLinks } from './EpicLinks';
import { EpicNotes } from './EpicNotes';
import { Epics } from './Epics';
import { GroupAccessRequests } from './GroupAccessRequests';
import { GroupAccessTokens } from './GroupAccessTokens';
import { GroupActivityAnalytics } from './GroupActivityAnalytics';
import { GroupBadges } from './GroupBadges';
import { GroupCustomAttributes } from './GroupCustomAttributes';
import { GroupDORA4Metrics } from './GroupDORA4Metrics';
import { GroupEpicBoards } from './GroupEpicBoards';
import { GroupHooks } from './GroupHooks';
import { GroupImportExports } from './GroupImportExports';
import { GroupInvitations } from './GroupInvitations';
import { GroupIssueBoards } from './GroupIssueBoards';
import { GroupIterations } from './GroupIterations';
import { GroupJobTokenScopes } from './GroupJobTokenScopes';
import { GroupLabels } from './GroupLabels';
import { GroupLDAPLinks } from './GroupLDAPLinks';
import { GroupMembers } from './GroupMembers';
import { GroupMemberRoles } from './GroupMemberRoles';
import { GroupMilestones } from './GroupMilestones';
import { GroupProtectedEnvironments } from './GroupProtectedEnvironments';
import { GroupPushRules } from './GroupPushRules';
import { GroupRelationExports } from './GroupRelationExports';
import { GroupReleases } from './GroupReleases';
import { GroupRepositoryStorageMoves } from './GroupRepositoryStorageMoves';
import { Groups } from './Groups';
import { GroupSAMLIdentities } from './GroupSAMLIdentities';
import { GroupSAMLLinks } from './GroupSAMLLinks';
import { GroupSCIMIdentities } from './GroupSCIMIdentities';
import { GroupServiceAccounts } from './GroupServiceAccounts';
import { GroupVariables } from './GroupVariables';
import { GroupWikis } from './GroupWikis';
import { LinkedEpics } from './LinkedEpics';
import { UserCustomAttributes } from './UserCustomAttributes';
import { UserEmails } from './UserEmails';
import { UserGPGKeys } from './UserGPGKeys';
import { UserImpersonationTokens } from './UserImpersonationTokens';
import { Users } from './Users';
import { UserSSHKeys } from './UserSSHKeys';

// Figure out a better way of doing this using mapped types: https://stackoverflow.com/questions/67729408/how-to-create-mapped-type-using-generic-class-instances-in-typesscript?noredirect=1#comment119718863_67729408
// This will most likely be accomplished using higher kinded types: https://github.com/Microsoft/TypeScript/issues/1213#issuecomment-750930496

export interface Gitlab<C extends boolean = false> extends BaseResource<C> {
  Agents: Agents<C>;
  AlertManagement: AlertManagement<C>;
  ApplicationAppearance: ApplicationAppearance<C>;
  ApplicationPlanLimits: ApplicationPlanLimits<C>;
  Applications: Applications<C>;
  ApplicationSettings: ApplicationSettings<C>;
  ApplicationStatistics: ApplicationStatistics<C>;
  AuditEvents: AuditEvents<C>;
  Avatar: Avatar<C>;
  BroadcastMessages: BroadcastMessages<C>;
  CodeSuggestions: CodeSuggestions<C>;
  Composer: Composer<C>;
  Conan: Conan<C>;
  DashboardAnnotations: DashboardAnnotations<C>;
  Debian: Debian<C>;
  DependencyProxy: DependencyProxy<C>;
  DeployKeys: DeployKeys<C>;
  DeployTokens: DeployTokens<C>;
  DockerfileTemplates: DockerfileTemplates<C>;
  Events: Events<C>;
  Experiments: Experiments<C>;
  GeoNodes: GeoNodes<C>;
  GeoSites: GeoSites<C>;
  GitignoreTemplates: GitignoreTemplates<C>;
  GitLabCIYMLTemplates: GitLabCIYMLTemplates<C>;
  Import: Import<C>;
  InstanceLevelCICDVariables: InstanceLevelCICDVariables<C>;
  Keys: Keys<C>;
  License: License<C>;
  LicenseTemplates: LicenseTemplates<C>;
  Lint: Lint<C>;
  Markdown: Markdown<C>;
  Maven: Maven<C>;
  Metadata: Metadata<C>;
  Migrations: Migrations<C>;
  Namespaces: Namespaces<C>;
  NotificationSettings: NotificationSettings<C>;
  NPM: NPM<C>;
  NuGet: NuGet<C>;
  PersonalAccessTokens: PersonalAccessTokens<C>;
  PyPI: PyPI<C>;
  RubyGems: RubyGems<C>;
  Search: Search<C>;
  SearchAdmin: SearchAdmin<C>;
  ServiceAccounts: ServiceAccounts<C>;
  ServiceData: ServiceData<C>;
  SidekiqMetrics: SidekiqMetrics<C>;
  SidekiqQueues: SidekiqQueues<C>;
  SnippetRepositoryStorageMoves: SnippetRepositoryStorageMoves<C>;
  Snippets: Snippets<C>;
  Suggestions: Suggestions<C>;
  SystemHooks: SystemHooks<C>;
  TodoLists: TodoLists<C>;
  Topics: Topics<C>;
  Branches: Branches<C>;
  CommitDiscussions: CommitDiscussions<C>;
  Commits: Commits<C>;
  ContainerRegistry: ContainerRegistry<C>;
  Deployments: Deployments<C>;
  Environments: Environments<C>;
  ErrorTrackingClientKeys: ErrorTrackingClientKeys<C>;
  ErrorTrackingSettings: ErrorTrackingSettings<C>;
  ExternalStatusChecks: ExternalStatusChecks<C>;
  FeatureFlags: FeatureFlags<C>;
  FeatureFlagUserLists: FeatureFlagUserLists<C>;
  FreezePeriods: FreezePeriods<C>;
  GitlabPages: GitlabPages<C>;
  GoProxy: GoProxy<C>;
  Helm: Helm<C>;
  Integrations: Integrations<C>;
  IssueAwardEmojis: IssueAwardEmojis<C>;
  IssueDiscussions: IssueDiscussions<C>;
  IssueIterationEvents: IssueIterationEvents<C>;
  IssueLabelEvents: IssueLabelEvents<C>;
  IssueLinks: IssueLinks<C>;
  IssueMilestoneEvents: IssueMilestoneEvents<C>;
  IssueNoteAwardEmojis: IssueNoteAwardEmojis<C>;
  IssueNotes: IssueNotes<C>;
  Issues: Issues<C>;
  IssuesStatistics: IssuesStatistics<C>;
  IssueStateEvents: IssueStateEvents<C>;
  IssueWeightEvents: IssueWeightEvents<C>;
  JobArtifacts: JobArtifacts<C>;
  Jobs: Jobs<C>;
  MergeRequestApprovals: MergeRequestApprovals<C>;
  MergeRequestAwardEmojis: MergeRequestAwardEmojis<C>;
  MergeRequestContextCommits: MergeRequestContextCommits<C>;
  MergeRequestDiscussions: MergeRequestDiscussions<C>;
  MergeRequestLabelEvents: MergeRequestLabelEvents<C>;
  MergeRequestMilestoneEvents: MergeRequestMilestoneEvents<C>;
  MergeRequestDraftNotes: MergeRequestDraftNotes<C>;
  MergeRequestNotes: MergeRequestNotes<C>;
  MergeRequestNoteAwardEmojis: MergeRequestNoteAwardEmojis<C>;
  MergeRequests: MergeRequests<C>;
  MergeTrains: MergeTrains<C>;
  PackageRegistry: PackageRegistry<C>;
  Packages: Packages<C>;
  PagesDomains: PagesDomains<C>;
  Pipelines: Pipelines<C>;
  PipelineSchedules: PipelineSchedules<C>;
  PipelineScheduleVariables: PipelineScheduleVariables<C>;
  PipelineTriggerTokens: PipelineTriggerTokens<C>;
  ProductAnalytics: ProductAnalytics<C>;
  ProjectAccessRequests: ProjectAccessRequests<C>;
  ProjectAccessTokens: ProjectAccessTokens<C>;
  ProjectAliases: ProjectAliases<C>;
  ProjectBadges: ProjectBadges<C>;
  ProjectCustomAttributes: ProjectCustomAttributes<C>;
  ProjectDORA4Metrics: ProjectDORA4Metrics<C>;
  ProjectHooks: ProjectHooks<C>;
  ProjectImportExports: ProjectImportExports<C>;
  ProjectInvitations: ProjectInvitations<C>;
  ProjectIssueBoards: ProjectIssueBoards<C>;
  ProjectIterations: ProjectIterations<C>;
  ProjectJobTokenScopes: ProjectJobTokenScopes<C>;
  ProjectLabels: ProjectLabels<C>;
  ProjectMembers: ProjectMembers<C>;
  ProjectMilestones: ProjectMilestones<C>;
  ProjectProtectedEnvironments: ProjectProtectedEnvironments<C>;
  ProjectPushRules: ProjectPushRules<C>;
  ProjectRelationsExport: ProjectRelationsExport<C>;
  ProjectReleases: ProjectReleases<C>;
  ProjectRemoteMirrors: ProjectRemoteMirrors<C>;
  ProjectRepositoryStorageMoves: ProjectRepositoryStorageMoves<C>;
  Projects: Projects<C>;
  ProjectSnippetAwardEmojis: ProjectSnippetAwardEmojis<C>;
  ProjectSnippetDiscussions: ProjectSnippetDiscussions<C>;
  ProjectSnippetNotes: ProjectSnippetNotes<C>;
  ProjectSnippets: ProjectSnippets<C>;
  ProjectStatistics: ProjectStatistics<C>;
  ProjectTemplates: ProjectTemplates<C>;
  ProjectVariables: ProjectVariables<C>;
  ProjectVulnerabilities: ProjectVulnerabilities<C>;
  ProjectWikis: ProjectWikis<C>;
  ProtectedBranches: ProtectedBranches<C>;
  ProtectedTags: ProtectedTags<C>;
  ReleaseLinks: ReleaseLinks<C>;
  Repositories: Repositories<C>;
  RepositoryFiles: RepositoryFiles<C>;
  RepositorySubmodules: RepositorySubmodules<C>;
  ResourceGroups: ResourceGroups<C>;
  Runners: Runners<C>;
  SecureFiles: SecureFiles<C>;
  Tags: Tags<C>;
  UserStarredMetricsDashboard: UserStarredMetricsDashboard<C>;
  EpicAwardEmojis: EpicAwardEmojis<C>;
  EpicDiscussions: EpicDiscussions<C>;
  EpicIssues: EpicIssues<C>;
  EpicLabelEvents: EpicLabelEvents<C>;
  EpicLinks: EpicLinks<C>;
  EpicNotes: EpicNotes<C>;
  Epics: Epics<C>;
  GroupAccessRequests: GroupAccessRequests<C>;
  GroupAccessTokens: GroupAccessTokens<C>;
  GroupActivityAnalytics: GroupActivityAnalytics<C>;
  GroupBadges: GroupBadges<C>;
  GroupCustomAttributes: GroupCustomAttributes<C>;
  GroupDORA4Metrics: GroupDORA4Metrics<C>;
  GroupEpicBoards: GroupEpicBoards<C>;
  GroupHooks: GroupHooks<C>;
  GroupImportExports: GroupImportExports<C>;
  GroupInvitations: GroupInvitations<C>;
  GroupIssueBoards: GroupIssueBoards<C>;
  GroupIterations: GroupIterations<C>;
  GroupJobTokenScopes: GroupJobTokenScopes<C>;
  GroupLabels: GroupLabels<C>;
  GroupLDAPLinks: GroupLDAPLinks<C>;
  GroupMembers: GroupMembers<C>;
  GroupMemberRoles: GroupMemberRoles<C>;
  GroupMilestones: GroupMilestones<C>;
  GroupProtectedEnvironments: GroupProtectedEnvironments<C>;
  GroupPushRules: GroupPushRules<C>;
  GroupRelationExports: GroupRelationExports<C>;
  GroupReleases: GroupReleases<C>;
  GroupRepositoryStorageMoves: GroupRepositoryStorageMoves<C>;
  Groups: Groups<C>;
  GroupSAMLIdentities: GroupSAMLIdentities<C>;
  GroupSAMLLinks: GroupSAMLLinks<C>;
  GroupSCIMIdentities: GroupSCIMIdentities<C>;
  GroupServiceAccounts: GroupServiceAccounts<C>;
  GroupVariables: GroupVariables<C>;
  GroupWikis: GroupWikis<C>;
  LinkedEpics: LinkedEpics<C>;
  UserCustomAttributes: UserCustomAttributes<C>;
  UserEmails: UserEmails<C>;
  UserGPGKeys: UserGPGKeys<C>;
  UserImpersonationTokens: UserImpersonationTokens<C>;
  Users: Users<C>;
  UserSSHKeys: UserSSHKeys<C>;
}

const resources = {
  Agents,
  AlertManagement,
  ApplicationAppearance,
  ApplicationPlanLimits,
  Applications,
  ApplicationSettings,
  ApplicationStatistics,
  AuditEvents,
  Avatar,
  BroadcastMessages,
  CodeSuggestions,
  Composer,
  Conan,
  DashboardAnnotations,
  Debian,
  DependencyProxy,
  DeployKeys,
  DeployTokens,
  DockerfileTemplates,
  Events,
  Experiments,
  GeoNodes,
  GeoSites,
  GitignoreTemplates,
  GitLabCIYMLTemplates,
  Import,
  InstanceLevelCICDVariables,
  Keys,
  License,
  LicenseTemplates,
  Lint,
  Markdown,
  Maven,
  Metadata,
  Migrations,
  Namespaces,
  NotificationSettings,
  NPM,
  NuGet,
  PersonalAccessTokens,
  PyPI,
  RubyGems,
  Search,
  SearchAdmin,
  ServiceAccounts,
  ServiceData,
  SidekiqMetrics,
  SidekiqQueues,
  SnippetRepositoryStorageMoves,
  Snippets,
  Suggestions,
  SystemHooks,
  TodoLists,
  Topics,
  Branches,
  CommitDiscussions,
  Commits,
  ContainerRegistry,
  Deployments,
  Environments,
  ErrorTrackingClientKeys,
  ErrorTrackingSettings,
  ExternalStatusChecks,
  FeatureFlags,
  FeatureFlagUserLists,
  FreezePeriods,
  GitlabPages,
  GoProxy,
  Helm,
  Integrations,
  IssueAwardEmojis,
  IssueDiscussions,
  IssueIterationEvents,
  IssueLabelEvents,
  IssueLinks,
  IssueMilestoneEvents,
  IssueNoteAwardEmojis,
  IssueNotes,
  Issues,
  IssuesStatistics,
  IssueStateEvents,
  IssueWeightEvents,
  JobArtifacts,
  Jobs,
  JobTokenScopes,
  MergeRequestApprovals,
  MergeRequestAwardEmojis,
  MergeRequestContextCommits,
  MergeRequestDiscussions,
  MergeRequestLabelEvents,
  MergeRequestMilestoneEvents,
  MergeRequestDraftNotes,
  MergeRequestNotes,
  MergeRequestNoteAwardEmojis,
  MergeRequests,
  MergeTrains,
  PackageRegistry,
  Packages,
  PagesDomains,
  Pipelines,
  PipelineSchedules,
  PipelineScheduleVariables,
  PipelineTriggerTokens,
  ProductAnalytics,
  ProjectAccessRequests,
  ProjectAccessTokens,
  ProjectAliases,
  ProjectBadges,
  ProjectCustomAttributes,
  ProjectDORA4Metrics,
  ProjectHooks,
  ProjectImportExports,
  ProjectInvitations,
  ProjectIssueBoards,
  ProjectIterations,
  ProjectLabels,
  ProjectMembers,
  ProjectMilestones,
  ProjectProtectedEnvironments,
  ProjectPushRules,
  ProjectRelationsExport,
  ProjectReleases,
  ProjectRemoteMirrors,
  ProjectRepositoryStorageMoves,
  Projects,
  ProjectSnippetAwardEmojis,
  ProjectSnippetDiscussions,
  ProjectSnippetNotes,
  ProjectSnippets,
  ProjectStatistics,
  ProjectTemplates,
  ProjectVariables,
  ProjectVulnerabilities,
  ProjectWikis,
  ProtectedBranches,
  ProtectedTags,
  ReleaseLinks,
  Repositories,
  RepositoryFiles,
  RepositorySubmodules,
  ResourceGroups,
  Runners,
  SecureFiles,
  Tags,
  UserStarredMetricsDashboard,
  EpicAwardEmojis,
  EpicDiscussions,
  EpicIssues,
  EpicLabelEvents,
  EpicLinks,
  EpicNotes,
  Epics,
  GroupAccessRequests,
  GroupAccessTokens,
  GroupActivityAnalytics,
  GroupBadges,
  GroupCustomAttributes,
  GroupDORA4Metrics,
  GroupEpicBoards,
  GroupHooks,
  GroupImportExports,
  GroupInvitations,
  GroupIssueBoards,
  GroupIterations,
  GroupLabels,
  GroupLDAPLinks,
  GroupMembers,
  GroupMemberRoles,
  GroupMilestones,
  GroupProtectedEnvironments,
  GroupPushRules,
  GroupRelationExports,
  GroupReleases,
  GroupRepositoryStorageMoves,
  Groups,
  GroupSAMLIdentities,
  GroupSAMLLinks,
  GroupSCIMIdentities,
  GroupServiceAccounts,
  GroupVariables,
  GroupWikis,
  LinkedEpics,
  UserCustomAttributes,
  UserEmails,
  UserGPGKeys,
  UserImpersonationTokens,
  Users,
  UserSSHKeys,
};

export class Gitlab<C extends boolean = false> extends BaseResource<C> {
  constructor(options: BaseResourceOptions<C>) {
    super(options);

    // Attach the sub-resources to this wrapper
    Object.keys(resources).forEach((s) => {
      this[s] = new resources[s]<C>(options);
    });
  }
}
