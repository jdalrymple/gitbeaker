import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import { BaseResource } from '@gitbeaker/requester-utils';

// General
import { AICatalog } from './AICatalog';
import { AlertManagement } from './AlertManagement';
import { ApplicationAppearance } from './ApplicationAppearance';
import { ApplicationPlanLimits } from './ApplicationPlanLimits';
import { Applications } from './Applications';
import { ApplicationSettings } from './ApplicationSettings';
import { ApplicationStatistics } from './ApplicationStatistics';
import { Attestations } from './Attestations';
import { AuditEvents } from './AuditEvents';
import { Avatar } from './Avatar';
import { Branches } from './Branches';
import { BroadcastMessages } from './BroadcastMessages';
import { BulkImports } from './BulkImports';
import { ClusterAgents } from './ClusterAgents';
import { CodeSuggestions } from './CodeSuggestions';
import { CommitDiscussions } from './CommitDiscussions';
import { Commits } from './Commits';
import { CompliancePolicySettings } from './CompliancePolicySettings';
import { Composer } from './Composer';
import { Conan } from './Conan';
import { ConanV2 } from './ConanV2';
import { ContainerRegistry } from './ContainerRegistry';
import { ContainerRegistryProtectionTagRules } from './ContainerRegistryProtectionTagRules';
import { ContainerRepositoryProtectionRules } from './ContainerRepositoryProtectionRules';
import { ContainerVirtualRegistry } from './ContainerVirtualRegistry';
import { DatabaseMigrations } from './DatabaseMigrations';
import { DataManagement } from './DataManagement';
import { Debian } from './Debian';
import { Dependencies } from './Dependencies';
import { DependencyListExport } from './DependencyListExport';
import { DependencyProxy } from './DependencyProxy';
import { DeployKeys } from './DeployKeys';
import { Deployments } from './Deployments';
import { DeployTokens } from './DeployTokens';
import { Environments } from './Environments';
import { ErrorTrackingClientKeys } from './ErrorTrackingClientKeys';
import { ErrorTrackingSettings } from './ErrorTrackingSettings';
import { Events } from './Events';
import { Experiments } from './Experiments';
import { ExternalControls } from './ExternalControls';
import { ExternalStatusChecks } from './ExternalStatusChecks';
import { FeatureFlags } from './FeatureFlags';
import { FeatureFlagUserLists } from './FeatureFlagUserLists';
import { Features } from './Features';
import { Flows } from './Flows';
import { FreezePeriods } from './FreezePeriods';
import { GeoSites } from './GeoSites';
import { GitLabDuoChat } from './GitLabDuoChat';
import { GitlabPages } from './GitlabPages';
import { GoogleCloudIntegration } from './GoogleCloudIntegration';
import { GoProxy } from './GoProxy';
import { GroupAccessRequests } from './GroupAccessRequests';
import { GroupAccessTokens } from './GroupAccessTokens';
import { GroupActivityAnalytics } from './GroupActivityAnalytics';
import { GroupBadges } from './GroupBadges';
import { GroupCustomAttributes } from './GroupCustomAttributes';
import { GroupDORA4Metrics } from './GroupDORA4Metrics';
import { GroupEnterpriseUsers } from './GroupEnterpriseUsers';
import { GroupEpicBoards } from './GroupEpicBoards';
import { GroupHooks } from './GroupHooks';
import { GroupImportExports } from './GroupImportExports';
import { GroupIntegrations } from './GroupIntegrations';
import { GroupInvitations } from './GroupInvitations';
import { GroupIssueBoards } from './GroupIssueBoards';
import { GroupIterations } from './GroupIterations';
import { GroupLabels } from './GroupLabels';
import { GroupLDAPLinks } from './GroupLDAPLinks';
import { GroupMarkdownUploads } from './GroupMarkdownUploads';
import { GroupMemberRoles } from './GroupMemberRoles';
import { GroupMembers } from './GroupMembers';
import { GroupMilestones } from './GroupMilestones';
import { GroupPlaceholderReassignments } from './GroupPlaceholderReassignments';
import { GroupProtectedBranches } from './GroupProtectedBranches';
import { GroupProtectedEnvironments } from './GroupProtectedEnvironments';
import { GroupPushRules } from './GroupPushRules';
import { GroupRelationExports } from './GroupRelationExports';
import { GroupReleases } from './GroupReleases';
import { GroupRepositoryStorageMoves } from './GroupRepositoryStorageMoves';
import { Groups } from './Groups';
import { GroupSAMLIdentities } from './GroupSAMLIdentities';
import { GroupSAMLLinks } from './GroupSAMLLinks';
import { GroupSCIMIdentities } from './GroupSCIMIdentities';
import { GroupSecuritySettings } from './GroupSecuritySettings';
import { GroupServiceAccounts } from './GroupServiceAccounts';
import { GroupSSHCertificates } from './GroupSSHCertificates';
import { GroupVariables } from './GroupVariables';
import { GroupWikiNotes } from './GroupWikiNotes';
import { GroupWikis } from './GroupWikis';
import { Helm } from './Helm';
import { Import } from './Import';
import { InstanceLevelCICDVariables } from './InstanceLevelCICDVariables';
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
import { Keys } from './Keys';
import { License } from './License';
import { Licenses } from './Licenses';
import { Lint } from './Lint';
import { Markdown } from './Markdown';
import { Maven } from './Maven';
import { MergeRequestApprovals } from './MergeRequestApprovals';
import { MergeRequestApprovalSettings } from './MergeRequestApprovalSettings';
import { MergeRequestAwardEmojis } from './MergeRequestAwardEmojis';
import { MergeRequestContextCommits } from './MergeRequestContextCommits';
import { MergeRequestDiscussions } from './MergeRequestDiscussions';
import { MergeRequestDraftNotes } from './MergeRequestDraftNotes';
import { MergeRequestIterationEvents } from './MergeRequestIterationEvents';
import { MergeRequestLabelEvents } from './MergeRequestLabelEvents';
import { MergeRequestMilestoneEvents } from './MergeRequestMilestoneEvents';
import { MergeRequestNoteAwardEmojis } from './MergeRequestNoteAwardEmojis';
import { MergeRequestNotes } from './MergeRequestNotes';
import { MergeRequests } from './MergeRequests';
import { MergeRequestStateEvents } from './MergeRequestStateEvents';
import { MergeTrains } from './MergeTrains';
import { Metadata } from './Metadata';
import { Migrations } from './Migrations';
import { ModelRegistry } from './ModelRegistry';
import { Namespaces } from './Namespaces';
import { NotificationSettings } from './NotificationSettings';
import { NPM } from './NPM';
import { NuGet } from './NuGet';
import { Orbit } from './Orbit';
import { Organizations } from './Organizations';
import { PackageRegistry } from './PackageRegistry';
import { Packages } from './Packages';
import { Pages } from './Pages';
import { PagesDomains } from './PagesDomains';
import { PersonalAccessTokens } from './PersonalAccessTokens';
import { Pipelines } from './Pipelines';
import { PipelineSchedules } from './PipelineSchedules';
import { PipelineScheduleVariables } from './PipelineScheduleVariables';
import { PipelineTriggers } from './PipelineTriggers';
import { PipelineTriggerTokens } from './PipelineTriggerTokens';
import { PlanLimits } from './PlanLimits';
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
import { ProjectMarkdownUploads } from './ProjectMarkdownUploads';
import { ProjectMembers } from './ProjectMembers';
import { ProjectMilestones } from './ProjectMilestones';
import { ProjectProtectedBranches } from './ProjectProtectedBranches';
import { ProjectProtectedEnvironments } from './ProjectProtectedEnvironments';
import { ProjectPullMirroring } from './ProjectPullMirroring';
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
import { ProjectTerraformState } from './ProjectTerraformState';
import { ProjectVariables } from './ProjectVariables';
import { ProjectVulnerabilities } from './ProjectVulnerabilities';
import { ProjectWikiNotes } from './ProjectWikiNotes';
import { ProjectWikis } from './ProjectWikis';
import { ProtectedTags } from './ProtectedTags';
import { PyPI } from './PyPI';
import { ReleaseLinks } from './ReleaseLinks';
import { Repositories } from './Repositories';
import { RepositoryFiles } from './RepositoryFiles';
import { RepositorySubmodules } from './RepositorySubmodules';
import { ResourceGroups } from './ResourceGroups';
import { RubyGems } from './RubyGems';
import { RunnerControllers } from './RunnerControllers';
import { RunnerControllerTokens } from './RunnerControllerTokens';
import { Runners } from './Runners';
import { Search } from './Search';
import { SearchAdmin } from './SearchAdmin';
import { SecureFiles } from './SecureFiles';
import { ServiceAccounts } from './ServiceAccounts';
import { ServiceData } from './ServiceData';
import { ServicePing } from './ServicePing';
import { SidekiqMetrics } from './SidekiqMetrics';
import { SidekiqQueues } from './SidekiqQueues';
import { SnippetRepositoryStorageMoves } from './SnippetRepositoryStorageMoves';
import { Snippets } from './Snippets';
import { Suggestions } from './Suggestions';
import { SystemHooks } from './SystemHooks';
import { Tags } from './Tags';
import { TerraformModules } from './TerraformModules';
import { TodoLists } from './TodoLists';
import { TokenInformation } from './TokenInformation';
import { Topics } from './Topics';
import { UserCustomAttributes } from './UserCustomAttributes';
import { UserEmails } from './UserEmails';
import { UserFollows } from './UserFollows';
import { UserGPGKeys } from './UserGPGKeys';
import { UserImpersonationTokens } from './UserImpersonationTokens';
import { UserModeration } from './UserModeration';
import { Users } from './Users';
import { UserSSHKeys } from './UserSSHKeys';
import { UserStarredMetricsDashboard } from './UserStarredMetricsDashboard';
import { UserSupportPin } from './UserSupportPin';
import { VirtualRegistriesCleanupPolicies } from './VirtualRegistriesCleanupPolicies';
import { Vulnerabilities } from './Vulnerabilities';
import { VulnerabilityArchiveExports } from './VulnerabilityArchiveExports';
import { VulnerabilityFindings } from './VulnerabilityFindings';
import { WebCommits } from './WebCommits';

// Figure out a better way of doing this using mapped types: https://stackoverflow.com/questions/67729408/how-to-create-mapped-type-using-generic-class-instances-in-typesscript?noredirect=1#comment119718863_67729408
// This will most likely be accomplished using higher kinded types: https://github.com/Microsoft/TypeScript/issues/1213#issuecomment-750930496

export interface Gitlab<C extends boolean = false> extends BaseResource<C> {
  AICatalog: AICatalog<C>;
  AlertManagement: AlertManagement<C>;
  ApplicationAppearance: ApplicationAppearance<C>;
  ApplicationPlanLimits: ApplicationPlanLimits<C>;
  Applications: Applications<C>;
  ApplicationSettings: ApplicationSettings<C>;
  ApplicationStatistics: ApplicationStatistics<C>;
  Attestations: Attestations<C>;
  AuditEvents: AuditEvents<C>;
  Avatar: Avatar<C>;
  BroadcastMessages: BroadcastMessages<C>;
  BulkImports: BulkImports<C>;
  ClusterAgents: ClusterAgents<C>;
  CodeSuggestions: CodeSuggestions<C>;
  Composer: Composer<C>;
  Conan: Conan<C>;
  ConanV2: ConanV2<C>;
  DataManagement: DataManagement<C>;
  DatabaseMigrations: DatabaseMigrations<C>;
  Debian: Debian<C>;
  Dependencies: Dependencies<C>;
  DependencyListExport: DependencyListExport<C>;
  DependencyProxy: DependencyProxy<C>;
  DeployKeys: DeployKeys<C>;
  DeployTokens: DeployTokens<C>;
  Events: Events<C>;
  Experiments: Experiments<C>;
  GeoSites: GeoSites<C>;
  GitLabDuoChat: GitLabDuoChat<C>;
  Import: Import<C>;
  InstanceLevelCICDVariables: InstanceLevelCICDVariables<C>;
  Keys: Keys<C>;
  License: License<C>;
  Licenses: Licenses<C>;
  Lint: Lint<C>;
  Markdown: Markdown<C>;
  Maven: Maven<C>;
  Metadata: Metadata<C>;
  Migrations: Migrations<C>;
  ModelRegistry: ModelRegistry<C>;
  Namespaces: Namespaces<C>;
  NotificationSettings: NotificationSettings<C>;
  NPM: NPM<C>;
  NuGet: NuGet<C>;
  Orbit: Orbit<C>;
  Organizations: Organizations<C>;
  Pages: Pages<C>;
  PersonalAccessTokens: PersonalAccessTokens<C>;
  PipelineTriggers: PipelineTriggers<C>;
  PlanLimits: PlanLimits<C>;
  PyPI: PyPI<C>;
  RubyGems: RubyGems<C>;
  RunnerControllers: RunnerControllers<C>;
  RunnerControllerTokens: RunnerControllerTokens<C>;
  Search: Search<C>;
  SearchAdmin: SearchAdmin<C>;
  ServiceAccounts: ServiceAccounts<C>;
  ServiceData: ServiceData<C>;
  ServicePing: ServicePing<C>;
  SidekiqMetrics: SidekiqMetrics<C>;
  SidekiqQueues: SidekiqQueues<C>;
  SnippetRepositoryStorageMoves: SnippetRepositoryStorageMoves<C>;
  Snippets: Snippets<C>;
  Suggestions: Suggestions<C>;
  SystemHooks: SystemHooks<C>;
  TerraformModules: TerraformModules<C>;
  TodoLists: TodoLists<C>;
  Topics: Topics<C>;
  Branches: Branches<C>;
  CommitDiscussions: CommitDiscussions<C>;
  Commits: Commits<C>;
  CompliancePolicySettings: CompliancePolicySettings<C>;
  ContainerRegistry: ContainerRegistry<C>;
  ContainerRegistryProtectionTagRules: ContainerRegistryProtectionTagRules<C>;
  ContainerRepositoryProtectionRules: ContainerRepositoryProtectionRules<C>;
  ContainerVirtualRegistry: ContainerVirtualRegistry<C>;
  Deployments: Deployments<C>;
  Environments: Environments<C>;
  ErrorTrackingClientKeys: ErrorTrackingClientKeys<C>;
  ErrorTrackingSettings: ErrorTrackingSettings<C>;
  ExternalControls: ExternalControls<C>;
  ExternalStatusChecks: ExternalStatusChecks<C>;
  FeatureFlags: FeatureFlags<C>;
  FeatureFlagUserLists: FeatureFlagUserLists<C>;
  Features: Features<C>;
  Flows: Flows<C>;
  FreezePeriods: FreezePeriods<C>;
  GitlabPages: GitlabPages<C>;
  GoProxy: GoProxy<C>;
  GoogleCloudIntegration: GoogleCloudIntegration<C>;
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
  MergeRequestApprovalSettings: MergeRequestApprovalSettings<C>;
  MergeRequestAwardEmojis: MergeRequestAwardEmojis<C>;
  MergeRequestContextCommits: MergeRequestContextCommits<C>;
  MergeRequestDiscussions: MergeRequestDiscussions<C>;
  MergeRequestIterationEvents: MergeRequestIterationEvents<C>;
  MergeRequestLabelEvents: MergeRequestLabelEvents<C>;
  MergeRequestMilestoneEvents: MergeRequestMilestoneEvents<C>;
  MergeRequestStateEvents: MergeRequestStateEvents<C>;
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
  ProjectMarkdownUploads: ProjectMarkdownUploads<C>;
  ProjectMembers: ProjectMembers<C>;
  ProjectMilestones: ProjectMilestones<C>;
  ProjectProtectedEnvironments: ProjectProtectedEnvironments<C>;
  ProjectPullMirroring: ProjectPullMirroring<C>;
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
  ProjectTerraformState: ProjectTerraformState<C>;
  ProjectVariables: ProjectVariables<C>;
  ProjectVulnerabilities: ProjectVulnerabilities<C>;
  ProjectWikiNotes: ProjectWikiNotes<C>;
  ProjectWikis: ProjectWikis<C>;
  ProjectProtectedBranches: ProjectProtectedBranches<C>;
  ProtectedTags: ProtectedTags<C>;
  ReleaseLinks: ReleaseLinks<C>;
  Repositories: Repositories<C>;
  RepositoryFiles: RepositoryFiles<C>;
  RepositorySubmodules: RepositorySubmodules<C>;
  ResourceGroups: ResourceGroups<C>;
  Runners: Runners<C>;
  SecureFiles: SecureFiles<C>;
  Tags: Tags<C>;
  TokenInformation: TokenInformation<C>;
  UserStarredMetricsDashboard: UserStarredMetricsDashboard<C>;
  GroupAccessRequests: GroupAccessRequests<C>;
  GroupAccessTokens: GroupAccessTokens<C>;
  GroupActivityAnalytics: GroupActivityAnalytics<C>;
  GroupBadges: GroupBadges<C>;
  GroupCustomAttributes: GroupCustomAttributes<C>;
  GroupEnterpriseUsers: GroupEnterpriseUsers<C>;
  GroupEpicBoards: GroupEpicBoards<C>;
  GroupDORA4Metrics: GroupDORA4Metrics<C>;
  GroupHooks: GroupHooks<C>;
  GroupImportExports: GroupImportExports<C>;
  GroupIntegrations: GroupIntegrations<C>;
  GroupInvitations: GroupInvitations<C>;
  GroupIssueBoards: GroupIssueBoards<C>;
  GroupIterations: GroupIterations<C>;
  GroupLabels: GroupLabels<C>;
  GroupLDAPLinks: GroupLDAPLinks<C>;
  GroupMarkdownUploads: GroupMarkdownUploads<C>;
  GroupPlaceholderReassignments: GroupPlaceholderReassignments<C>;
  GroupMembers: GroupMembers<C>;
  GroupMemberRoles: GroupMemberRoles<C>;
  GroupMilestones: GroupMilestones<C>;
  GroupProtectedBranches: GroupProtectedBranches<C>;
  GroupProtectedEnvironments: GroupProtectedEnvironments<C>;
  GroupPushRules: GroupPushRules<C>;
  GroupRelationExports: GroupRelationExports<C>;
  GroupReleases: GroupReleases<C>;
  GroupRepositoryStorageMoves: GroupRepositoryStorageMoves<C>;
  GroupSecuritySettings: GroupSecuritySettings<C>;
  GroupSSHCertificates: GroupSSHCertificates<C>;
  Groups: Groups<C>;
  GroupSAMLIdentities: GroupSAMLIdentities<C>;
  GroupSAMLLinks: GroupSAMLLinks<C>;
  GroupSCIMIdentities: GroupSCIMIdentities<C>;
  GroupServiceAccounts: GroupServiceAccounts<C>;
  GroupVariables: GroupVariables<C>;
  GroupWikiNotes: GroupWikiNotes<C>;
  GroupWikis: GroupWikis<C>;
  UserCustomAttributes: UserCustomAttributes<C>;
  UserEmails: UserEmails<C>;
  UserFollows: UserFollows<C>;
  UserGPGKeys: UserGPGKeys<C>;
  UserImpersonationTokens: UserImpersonationTokens<C>;
  UserModeration: UserModeration<C>;
  Users: Users<C>;
  UserSSHKeys: UserSSHKeys<C>;
  UserSupportPin: UserSupportPin<C>;
  VirtualRegistriesCleanupPolicies: VirtualRegistriesCleanupPolicies<C>;
  Vulnerabilities: Vulnerabilities<C>;
  VulnerabilityArchiveExports: VulnerabilityArchiveExports<C>;
  VulnerabilityFindings: VulnerabilityFindings<C>;
  WebCommits: WebCommits<C>;
}

const resources = {
  AICatalog,
  AlertManagement,
  ApplicationAppearance,
  ApplicationPlanLimits,
  Applications,
  ApplicationSettings,
  ApplicationStatistics,
  Attestations,
  AuditEvents,
  Avatar,
  BroadcastMessages,
  BulkImports,
  ClusterAgents,
  CodeSuggestions,
  Composer,
  Conan,
  ConanV2,
  DataManagement,
  DatabaseMigrations,
  Debian,
  Dependencies,
  DependencyListExport,
  DependencyProxy,
  DeployKeys,
  DeployTokens,
  Events,
  Experiments,
  Import,
  InstanceLevelCICDVariables,
  Keys,
  License,
  Licenses,
  Lint,
  Markdown,
  Maven,
  Metadata,
  Migrations,
  ModelRegistry,
  Namespaces,
  NotificationSettings,
  NPM,
  NuGet,
  Orbit,
  Organizations,
  Pages,
  PersonalAccessTokens,
  PipelineTriggers,
  PlanLimits,
  PyPI,
  RubyGems,
  RunnerControllers,
  RunnerControllerTokens,
  Runners,
  Search,
  SearchAdmin,
  ServiceAccounts,
  ServiceData,
  ServicePing,
  SidekiqMetrics,
  SidekiqQueues,
  SnippetRepositoryStorageMoves,
  Snippets,
  Suggestions,
  SystemHooks,
  TerraformModules,
  TodoLists,
  Topics,
  Branches,
  CommitDiscussions,
  Commits,
  CompliancePolicySettings,
  ContainerRegistry,
  ContainerRegistryProtectionTagRules,
  ContainerRepositoryProtectionRules,
  ContainerVirtualRegistry,
  Deployments,
  Environments,
  ErrorTrackingClientKeys,
  ErrorTrackingSettings,
  ExternalControls,
  ExternalStatusChecks,
  FeatureFlags,
  FeatureFlagUserLists,
  Features,
  Flows,
  FreezePeriods,
  GeoSites,
  GitLabDuoChat,
  GitlabPages,
  GoProxy,
  GoogleCloudIntegration,
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
  MergeRequestApprovals,
  MergeRequestApprovalSettings,
  MergeRequestAwardEmojis,
  MergeRequestContextCommits,
  MergeRequestDiscussions,
  MergeRequestIterationEvents,
  MergeRequestLabelEvents,
  MergeRequestMilestoneEvents,
  MergeRequestStateEvents,
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
  ProjectJobTokenScopes,
  ProjectLabels,
  ProjectMarkdownUploads,
  ProjectMembers,
  ProjectMilestones,
  ProjectProtectedEnvironments,
  ProjectPullMirroring,
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
  ProjectTerraformState,
  ProjectVariables,
  ProjectVulnerabilities,
  ProjectWikiNotes,
  ProjectWikis,
  ProjectProtectedBranches,
  ProtectedTags,
  ReleaseLinks,
  Repositories,
  RepositoryFiles,
  RepositorySubmodules,
  ResourceGroups,
  SecureFiles,
  Tags,
  TokenInformation,
  UserStarredMetricsDashboard,
  GroupAccessRequests,
  GroupAccessTokens,
  GroupActivityAnalytics,
  GroupBadges,
  GroupCustomAttributes,
  GroupEnterpriseUsers,
  GroupEpicBoards,
  GroupDORA4Metrics,
  GroupHooks,
  GroupImportExports,
  GroupIntegrations,
  GroupInvitations,
  GroupIssueBoards,
  GroupIterations,
  GroupLabels,
  GroupLDAPLinks,
  GroupMarkdownUploads,
  GroupPlaceholderReassignments,
  GroupMembers,
  GroupMemberRoles,
  GroupMilestones,
  GroupProtectedBranches,
  GroupProtectedEnvironments,
  GroupPushRules,
  GroupRelationExports,
  GroupReleases,
  GroupRepositoryStorageMoves,
  GroupSecuritySettings,
  GroupSSHCertificates,
  Groups,
  GroupSAMLIdentities,
  GroupSAMLLinks,
  GroupSCIMIdentities,
  GroupServiceAccounts,
  GroupVariables,
  GroupWikiNotes,
  GroupWikis,
  UserCustomAttributes,
  UserEmails,
  UserFollows,
  UserGPGKeys,
  UserImpersonationTokens,
  UserModeration,
  Users,
  UserSSHKeys,
  UserSupportPin,
  VirtualRegistriesCleanupPolicies,
  Vulnerabilities,
  VulnerabilityArchiveExports,
  VulnerabilityFindings,
  WebCommits,
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
