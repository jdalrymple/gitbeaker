/* istanbul ignore file */

import * as CORE from '@gitbeaker/core';
import { presetResourceArguments } from '@gitbeaker/requester-utils';
import { requesterFn } from './Requester';

// Re-export all core types and utility errors
export type * from '@gitbeaker/core';
export {
  GitbeakerRequestError,
  GitbeakerTimeoutError,
  GitbeakerRetryError,
} from '@gitbeaker/requester-utils';

// Setup API with preset arguments
const { AccessLevel, ...Resources } = CORE;
const API = presetResourceArguments(Resources, { requesterFn });

// Export AccessLevel separately (not a class)
export { AccessLevel };

// Dual Export Pattern: Each class exported as both constructor and instance type

export const { Agents } = API;
export type Agents<C extends boolean = false> = CORE.Agents<C>;

export const { AlertManagement } = API;
export type AlertManagement<C extends boolean = false> = CORE.AlertManagement<C>;

export const { ApplicationAppearance } = API;
export type ApplicationAppearance<C extends boolean = false> = CORE.ApplicationAppearance<C>;

export const { ApplicationPlanLimits } = API;
export type ApplicationPlanLimits<C extends boolean = false> = CORE.ApplicationPlanLimits<C>;

export const { Applications } = API;
export type Applications<C extends boolean = false> = CORE.Applications<C>;

export const { ApplicationSettings } = API;
export type ApplicationSettings<C extends boolean = false> = CORE.ApplicationSettings<C>;

export const { ApplicationStatistics } = API;
export type ApplicationStatistics<C extends boolean = false> = CORE.ApplicationStatistics<C>;

export const { AuditEvents } = API;
export type AuditEvents<C extends boolean = false> = CORE.AuditEvents<C>;

export const { Avatar } = API;
export type Avatar<C extends boolean = false> = CORE.Avatar<C>;

export const { Branches } = API;
export type Branches<C extends boolean = false> = CORE.Branches<C>;

export const { BroadcastMessages } = API;
export type BroadcastMessages<C extends boolean = false> = CORE.BroadcastMessages<C>;

export const { CodeSuggestions } = API;
export type CodeSuggestions<C extends boolean = false> = CORE.CodeSuggestions<C>;

export const { CommitDiscussions } = API;
export type CommitDiscussions<C extends boolean = false> = CORE.CommitDiscussions<C>;

export const { Commits } = API;
export type Commits<C extends boolean = false> = CORE.Commits<C>;

export const { Composer } = API;
export type Composer<C extends boolean = false> = CORE.Composer<C>;

export const { Conan } = API;
export type Conan<C extends boolean = false> = CORE.Conan<C>;

export const { ContainerRegistry } = API;
export type ContainerRegistry<C extends boolean = false> = CORE.ContainerRegistry<C>;

export const { DashboardAnnotations } = API;
export type DashboardAnnotations<C extends boolean = false> = CORE.DashboardAnnotations<C>;

export const { Debian } = API;
export type Debian<C extends boolean = false> = CORE.Debian<C>;

export const { DependencyProxy } = API;
export type DependencyProxy<C extends boolean = false> = CORE.DependencyProxy<C>;

export const { DeployKeys } = API;
export type DeployKeys<C extends boolean = false> = CORE.DeployKeys<C>;

export const { DeployTokens } = API;
export type DeployTokens<C extends boolean = false> = CORE.DeployTokens<C>;

export const { Deployments } = API;
export type Deployments<C extends boolean = false> = CORE.Deployments<C>;

export const { DockerfileTemplates } = API;
export type DockerfileTemplates<C extends boolean = false> = CORE.DockerfileTemplates<C>;

export const { Environments } = API;
export type Environments<C extends boolean = false> = CORE.Environments<C>;

export const { EpicAwardEmojis } = API;
export type EpicAwardEmojis<C extends boolean = false> = CORE.EpicAwardEmojis<C>;

export const { EpicDiscussions } = API;
export type EpicDiscussions<C extends boolean = false> = CORE.EpicDiscussions<C>;

export const { EpicIssues } = API;
export type EpicIssues<C extends boolean = false> = CORE.EpicIssues<C>;

export const { EpicLabelEvents } = API;
export type EpicLabelEvents<C extends boolean = false> = CORE.EpicLabelEvents<C>;

export const { EpicLinks } = API;
export type EpicLinks<C extends boolean = false> = CORE.EpicLinks<C>;

export const { EpicNotes } = API;
export type EpicNotes<C extends boolean = false> = CORE.EpicNotes<C>;

export const { Epics } = API;
export type Epics<C extends boolean = false> = CORE.Epics<C>;

export const { ErrorTrackingClientKeys } = API;
export type ErrorTrackingClientKeys<C extends boolean = false> = CORE.ErrorTrackingClientKeys<C>;

export const { ErrorTrackingSettings } = API;
export type ErrorTrackingSettings<C extends boolean = false> = CORE.ErrorTrackingSettings<C>;

export const { Events } = API;
export type Events<C extends boolean = false> = CORE.Events<C>;

export const { Experiments } = API;
export type Experiments<C extends boolean = false> = CORE.Experiments<C>;

export const { ExternalStatusChecks } = API;
export type ExternalStatusChecks<C extends boolean = false> = CORE.ExternalStatusChecks<C>;

export const { FeatureFlags } = API;
export type FeatureFlags<C extends boolean = false> = CORE.FeatureFlags<C>;

export const { FeatureFlagUserLists } = API;
export type FeatureFlagUserLists<C extends boolean = false> = CORE.FeatureFlagUserLists<C>;

export const { FreezePeriods } = API;
export type FreezePeriods<C extends boolean = false> = CORE.FreezePeriods<C>;

export const { GeoNodes } = API;
export type GeoNodes<C extends boolean = false> = CORE.GeoNodes<C>;

export const { GeoSites } = API;
export type GeoSites<C extends boolean = false> = CORE.GeoSites<C>;

export const { GitignoreTemplates } = API;
export type GitignoreTemplates<C extends boolean = false> = CORE.GitignoreTemplates<C>;

export const { GitLabCIYMLTemplates } = API;
export type GitLabCIYMLTemplates<C extends boolean = false> = CORE.GitLabCIYMLTemplates<C>;

export const { GitlabPages } = API;
export type GitlabPages<C extends boolean = false> = CORE.GitlabPages<C>;

export const { GoProxy } = API;
export type GoProxy<C extends boolean = false> = CORE.GoProxy<C>;

export const { GroupAccessRequests } = API;
export type GroupAccessRequests<C extends boolean = false> = CORE.GroupAccessRequests<C>;

export const { GroupAccessTokens } = API;
export type GroupAccessTokens<C extends boolean = false> = CORE.GroupAccessTokens<C>;

export const { GroupActivityAnalytics } = API;
export type GroupActivityAnalytics<C extends boolean = false> = CORE.GroupActivityAnalytics<C>;

export const { GroupBadges } = API;
export type GroupBadges<C extends boolean = false> = CORE.GroupBadges<C>;

export const { GroupCustomAttributes } = API;
export type GroupCustomAttributes<C extends boolean = false> = CORE.GroupCustomAttributes<C>;

export const { GroupDORA4Metrics } = API;
export type GroupDORA4Metrics<C extends boolean = false> = CORE.GroupDORA4Metrics<C>;

export const { GroupEpicBoards } = API;
export type GroupEpicBoards<C extends boolean = false> = CORE.GroupEpicBoards<C>;

export const { GroupHooks } = API;
export type GroupHooks<C extends boolean = false> = CORE.GroupHooks<C>;

export const { GroupImportExports } = API;
export type GroupImportExports<C extends boolean = false> = CORE.GroupImportExports<C>;

export const { GroupInvitations } = API;
export type GroupInvitations<C extends boolean = false> = CORE.GroupInvitations<C>;

export const { GroupIssueBoards } = API;
export type GroupIssueBoards<C extends boolean = false> = CORE.GroupIssueBoards<C>;

export const { GroupIterations } = API;
export type GroupIterations<C extends boolean = false> = CORE.GroupIterations<C>;

export const { GroupLabels } = API;
export type GroupLabels<C extends boolean = false> = CORE.GroupLabels<C>;

export const { GroupLDAPLinks } = API;
export type GroupLDAPLinks<C extends boolean = false> = CORE.GroupLDAPLinks<C>;

export const { GroupMarkdownUploads } = API;
export type GroupMarkdownUploads<C extends boolean = false> = CORE.GroupMarkdownUploads<C>;

export const { GroupMemberRoles } = API;
export type GroupMemberRoles<C extends boolean = false> = CORE.GroupMemberRoles<C>;

export const { GroupMembers } = API;
export type GroupMembers<C extends boolean = false> = CORE.GroupMembers<C>;

export const { GroupMilestones } = API;
export type GroupMilestones<C extends boolean = false> = CORE.GroupMilestones<C>;

export const { GroupProtectedEnvironments } = API;
export type GroupProtectedEnvironments<C extends boolean = false> =
  CORE.GroupProtectedEnvironments<C>;

export const { GroupPushRules } = API;
export type GroupPushRules<C extends boolean = false> = CORE.GroupPushRules<C>;

export const { GroupRelationExports } = API;
export type GroupRelationExports<C extends boolean = false> = CORE.GroupRelationExports<C>;

export const { GroupReleases } = API;
export type GroupReleases<C extends boolean = false> = CORE.GroupReleases<C>;

export const { GroupRepositoryStorageMoves } = API;
export type GroupRepositoryStorageMoves<C extends boolean = false> =
  CORE.GroupRepositoryStorageMoves<C>;

export const { Groups } = API;
export type Groups<C extends boolean = false> = CORE.Groups<C>;

export const { GroupSAMLIdentities } = API;
export type GroupSAMLIdentities<C extends boolean = false> = CORE.GroupSAMLIdentities<C>;

export const { GroupSAMLLinks } = API;
export type GroupSAMLLinks<C extends boolean = false> = CORE.GroupSAMLLinks<C>;

export const { GroupSCIMIdentities } = API;
export type GroupSCIMIdentities<C extends boolean = false> = CORE.GroupSCIMIdentities<C>;

export const { GroupServiceAccounts } = API;
export type GroupServiceAccounts<C extends boolean = false> = CORE.GroupServiceAccounts<C>;

export const { GroupVariables } = API;
export type GroupVariables<C extends boolean = false> = CORE.GroupVariables<C>;

export const { GroupWikis } = API;
export type GroupWikis<C extends boolean = false> = CORE.GroupWikis<C>;

export const { Helm } = API;
export type Helm<C extends boolean = false> = CORE.Helm<C>;

export const { Import } = API;
export type Import<C extends boolean = false> = CORE.Import<C>;

export const { InstanceLevelCICDVariables } = API;
export type InstanceLevelCICDVariables<C extends boolean = false> =
  CORE.InstanceLevelCICDVariables<C>;

export const { Integrations } = API;
export type Integrations<C extends boolean = false> = CORE.Integrations<C>;

export const { IssueAwardEmojis } = API;
export type IssueAwardEmojis<C extends boolean = false> = CORE.IssueAwardEmojis<C>;

export const { IssueDiscussions } = API;
export type IssueDiscussions<C extends boolean = false> = CORE.IssueDiscussions<C>;

export const { IssueIterationEvents } = API;
export type IssueIterationEvents<C extends boolean = false> = CORE.IssueIterationEvents<C>;

export const { IssueLabelEvents } = API;
export type IssueLabelEvents<C extends boolean = false> = CORE.IssueLabelEvents<C>;

export const { IssueLinks } = API;
export type IssueLinks<C extends boolean = false> = CORE.IssueLinks<C>;

export const { IssueMilestoneEvents } = API;
export type IssueMilestoneEvents<C extends boolean = false> = CORE.IssueMilestoneEvents<C>;

export const { IssueNoteAwardEmojis } = API;
export type IssueNoteAwardEmojis<C extends boolean = false> = CORE.IssueNoteAwardEmojis<C>;

export const { IssueNotes } = API;
export type IssueNotes<C extends boolean = false> = CORE.IssueNotes<C>;

export const { Issues } = API;
export type Issues<C extends boolean = false> = CORE.Issues<C>;

export const { IssuesStatistics } = API;
export type IssuesStatistics<C extends boolean = false> = CORE.IssuesStatistics<C>;

export const { IssueStateEvents } = API;
export type IssueStateEvents<C extends boolean = false> = CORE.IssueStateEvents<C>;

export const { IssueWeightEvents } = API;
export type IssueWeightEvents<C extends boolean = false> = CORE.IssueWeightEvents<C>;

export const { JobArtifacts } = API;
export type JobArtifacts<C extends boolean = false> = CORE.JobArtifacts<C>;

export const { Jobs } = API;
export type Jobs<C extends boolean = false> = CORE.Jobs<C>;

export const { Keys } = API;
export type Keys<C extends boolean = false> = CORE.Keys<C>;

export const { License } = API;
export type License<C extends boolean = false> = CORE.License<C>;

export const { LicenseTemplates } = API;
export type LicenseTemplates<C extends boolean = false> = CORE.LicenseTemplates<C>;

export const { LinkedEpics } = API;
export type LinkedEpics<C extends boolean = false> = CORE.LinkedEpics<C>;

export const { Lint } = API;
export type Lint<C extends boolean = false> = CORE.Lint<C>;

export const { Markdown } = API;
export type Markdown<C extends boolean = false> = CORE.Markdown<C>;

export const { Maven } = API;
export type Maven<C extends boolean = false> = CORE.Maven<C>;

export const { MergeRequestApprovals } = API;
export type MergeRequestApprovals<C extends boolean = false> = CORE.MergeRequestApprovals<C>;

export const { MergeRequestAwardEmojis } = API;
export type MergeRequestAwardEmojis<C extends boolean = false> = CORE.MergeRequestAwardEmojis<C>;

export const { MergeRequestContextCommits } = API;
export type MergeRequestContextCommits<C extends boolean = false> =
  CORE.MergeRequestContextCommits<C>;

export const { MergeRequestDiscussions } = API;
export type MergeRequestDiscussions<C extends boolean = false> = CORE.MergeRequestDiscussions<C>;

export const { MergeRequestDraftNotes } = API;
export type MergeRequestDraftNotes<C extends boolean = false> = CORE.MergeRequestDraftNotes<C>;

export const { MergeRequestLabelEvents } = API;
export type MergeRequestLabelEvents<C extends boolean = false> = CORE.MergeRequestLabelEvents<C>;

export const { MergeRequestMilestoneEvents } = API;
export type MergeRequestMilestoneEvents<C extends boolean = false> =
  CORE.MergeRequestMilestoneEvents<C>;

export const { MergeRequestNoteAwardEmojis } = API;
export type MergeRequestNoteAwardEmojis<C extends boolean = false> =
  CORE.MergeRequestNoteAwardEmojis<C>;

export const { MergeRequestNotes } = API;
export type MergeRequestNotes<C extends boolean = false> = CORE.MergeRequestNotes<C>;

export const { MergeRequests } = API;
export type MergeRequests<C extends boolean = false> = CORE.MergeRequests<C>;

export const { MergeTrains } = API;
export type MergeTrains<C extends boolean = false> = CORE.MergeTrains<C>;

export const { Metadata } = API;
export type Metadata<C extends boolean = false> = CORE.Metadata<C>;

export const { Migrations } = API;
export type Migrations<C extends boolean = false> = CORE.Migrations<C>;

export const { Namespaces } = API;
export type Namespaces<C extends boolean = false> = CORE.Namespaces<C>;

export const { NotificationSettings } = API;
export type NotificationSettings<C extends boolean = false> = CORE.NotificationSettings<C>;

export const { NPM } = API;
export type NPM<C extends boolean = false> = CORE.NPM<C>;

export const { NuGet } = API;
export type NuGet<C extends boolean = false> = CORE.NuGet<C>;

export const { PackageRegistry } = API;
export type PackageRegistry<C extends boolean = false> = CORE.PackageRegistry<C>;

export const { Packages } = API;
export type Packages<C extends boolean = false> = CORE.Packages<C>;

export const { PagesDomains } = API;
export type PagesDomains<C extends boolean = false> = CORE.PagesDomains<C>;

export const { PersonalAccessTokens } = API;
export type PersonalAccessTokens<C extends boolean = false> = CORE.PersonalAccessTokens<C>;

export const { PipelineSchedules } = API;
export type PipelineSchedules<C extends boolean = false> = CORE.PipelineSchedules<C>;

export const { PipelineScheduleVariables } = API;
export type PipelineScheduleVariables<C extends boolean = false> =
  CORE.PipelineScheduleVariables<C>;

export const { Pipelines } = API;
export type Pipelines<C extends boolean = false> = CORE.Pipelines<C>;

export const { PipelineTriggerTokens } = API;
export type PipelineTriggerTokens<C extends boolean = false> = CORE.PipelineTriggerTokens<C>;

export const { ProductAnalytics } = API;
export type ProductAnalytics<C extends boolean = false> = CORE.ProductAnalytics<C>;

export const { ProjectAccessRequests } = API;
export type ProjectAccessRequests<C extends boolean = false> = CORE.ProjectAccessRequests<C>;

export const { ProjectAccessTokens } = API;
export type ProjectAccessTokens<C extends boolean = false> = CORE.ProjectAccessTokens<C>;

export const { ProjectAliases } = API;
export type ProjectAliases<C extends boolean = false> = CORE.ProjectAliases<C>;

export const { ProjectBadges } = API;
export type ProjectBadges<C extends boolean = false> = CORE.ProjectBadges<C>;

export const { ProjectCustomAttributes } = API;
export type ProjectCustomAttributes<C extends boolean = false> = CORE.ProjectCustomAttributes<C>;

export const { ProjectDORA4Metrics } = API;
export type ProjectDORA4Metrics<C extends boolean = false> = CORE.ProjectDORA4Metrics<C>;

export const { ProjectHooks } = API;
export type ProjectHooks<C extends boolean = false> = CORE.ProjectHooks<C>;

export const { ProjectImportExports } = API;
export type ProjectImportExports<C extends boolean = false> = CORE.ProjectImportExports<C>;

export const { ProjectInvitations } = API;
export type ProjectInvitations<C extends boolean = false> = CORE.ProjectInvitations<C>;

export const { ProjectIssueBoards } = API;
export type ProjectIssueBoards<C extends boolean = false> = CORE.ProjectIssueBoards<C>;

export const { ProjectIterations } = API;
export type ProjectIterations<C extends boolean = false> = CORE.ProjectIterations<C>;

export const { ProjectJobTokenScopes } = API;
export type ProjectJobTokenScopes<C extends boolean = false> = CORE.ProjectJobTokenScopes<C>;

export const { ProjectLabels } = API;
export type ProjectLabels<C extends boolean = false> = CORE.ProjectLabels<C>;

export const { ProjectMarkdownUploads } = API;
export type ProjectMarkdownUploads<C extends boolean = false> = CORE.ProjectMarkdownUploads<C>;

export const { ProjectMembers } = API;
export type ProjectMembers<C extends boolean = false> = CORE.ProjectMembers<C>;

export const { ProjectMilestones } = API;
export type ProjectMilestones<C extends boolean = false> = CORE.ProjectMilestones<C>;

export const { ProjectProtectedEnvironments } = API;
export type ProjectProtectedEnvironments<C extends boolean = false> =
  CORE.ProjectProtectedEnvironments<C>;

export const { ProjectPushRules } = API;
export type ProjectPushRules<C extends boolean = false> = CORE.ProjectPushRules<C>;

export const { ProjectRelationsExport } = API;
export type ProjectRelationsExport<C extends boolean = false> = CORE.ProjectRelationsExport<C>;

export const { ProjectReleases } = API;
export type ProjectReleases<C extends boolean = false> = CORE.ProjectReleases<C>;

export const { ProjectRemoteMirrors } = API;
export type ProjectRemoteMirrors<C extends boolean = false> = CORE.ProjectRemoteMirrors<C>;

export const { ProjectRepositoryStorageMoves } = API;
export type ProjectRepositoryStorageMoves<C extends boolean = false> =
  CORE.ProjectRepositoryStorageMoves<C>;

export const { Projects } = API;
export type Projects<C extends boolean = false> = CORE.Projects<C>;

export const { ProjectSnippetAwardEmojis } = API;
export type ProjectSnippetAwardEmojis<C extends boolean = false> =
  CORE.ProjectSnippetAwardEmojis<C>;

export const { ProjectSnippetDiscussions } = API;
export type ProjectSnippetDiscussions<C extends boolean = false> =
  CORE.ProjectSnippetDiscussions<C>;

export const { ProjectSnippetNotes } = API;
export type ProjectSnippetNotes<C extends boolean = false> = CORE.ProjectSnippetNotes<C>;

export const { ProjectSnippets } = API;
export type ProjectSnippets<C extends boolean = false> = CORE.ProjectSnippets<C>;

export const { ProjectStatistics } = API;
export type ProjectStatistics<C extends boolean = false> = CORE.ProjectStatistics<C>;

export const { ProjectTemplates } = API;
export type ProjectTemplates<C extends boolean = false> = CORE.ProjectTemplates<C>;

export const { ProjectTerraformState } = API;
export type ProjectTerraformState<C extends boolean = false> = CORE.ProjectTerraformState<C>;

export const { ProjectVariables } = API;
export type ProjectVariables<C extends boolean = false> = CORE.ProjectVariables<C>;

export const { ProjectVulnerabilities } = API;
export type ProjectVulnerabilities<C extends boolean = false> = CORE.ProjectVulnerabilities<C>;

export const { ProjectWikis } = API;
export type ProjectWikis<C extends boolean = false> = CORE.ProjectWikis<C>;

export const { ProtectedBranches } = API;
export type ProtectedBranches<C extends boolean = false> = CORE.ProtectedBranches<C>;

export const { ProtectedTags } = API;
export type ProtectedTags<C extends boolean = false> = CORE.ProtectedTags<C>;

export const { PyPI } = API;
export type PyPI<C extends boolean = false> = CORE.PyPI<C>;

export const { ReleaseLinks } = API;
export type ReleaseLinks<C extends boolean = false> = CORE.ReleaseLinks<C>;

export const { Repositories } = API;
export type Repositories<C extends boolean = false> = CORE.Repositories<C>;

export const { RepositoryFiles } = API;
export type RepositoryFiles<C extends boolean = false> = CORE.RepositoryFiles<C>;

export const { RepositorySubmodules } = API;
export type RepositorySubmodules<C extends boolean = false> = CORE.RepositorySubmodules<C>;

export const { ResourceGroups } = API;
export type ResourceGroups<C extends boolean = false> = CORE.ResourceGroups<C>;

export const { RubyGems } = API;
export type RubyGems<C extends boolean = false> = CORE.RubyGems<C>;

export const { Runners } = API;
export type Runners<C extends boolean = false> = CORE.Runners<C>;

export const { Search } = API;
export type Search<C extends boolean = false> = CORE.Search<C>;

export const { SearchAdmin } = API;
export type SearchAdmin<C extends boolean = false> = CORE.SearchAdmin<C>;

export const { SecureFiles } = API;
export type SecureFiles<C extends boolean = false> = CORE.SecureFiles<C>;

export const { ServiceAccounts } = API;
export type ServiceAccounts<C extends boolean = false> = CORE.ServiceAccounts<C>;

export const { ServiceData } = API;
export type ServiceData<C extends boolean = false> = CORE.ServiceData<C>;

export const { SidekiqMetrics } = API;
export type SidekiqMetrics<C extends boolean = false> = CORE.SidekiqMetrics<C>;

export const { SidekiqQueues } = API;
export type SidekiqQueues<C extends boolean = false> = CORE.SidekiqQueues<C>;

export const { SnippetRepositoryStorageMoves } = API;
export type SnippetRepositoryStorageMoves<C extends boolean = false> =
  CORE.SnippetRepositoryStorageMoves<C>;

export const { Snippets } = API;
export type Snippets<C extends boolean = false> = CORE.Snippets<C>;

export const { Suggestions } = API;
export type Suggestions<C extends boolean = false> = CORE.Suggestions<C>;

export const { SystemHooks } = API;
export type SystemHooks<C extends boolean = false> = CORE.SystemHooks<C>;

export const { Tags } = API;
export type Tags<C extends boolean = false> = CORE.Tags<C>;

export const { TodoLists } = API;
export type TodoLists<C extends boolean = false> = CORE.TodoLists<C>;

export const { Topics } = API;
export type Topics<C extends boolean = false> = CORE.Topics<C>;

export const { UserCustomAttributes } = API;
export type UserCustomAttributes<C extends boolean = false> = CORE.UserCustomAttributes<C>;

export const { UserEmails } = API;
export type UserEmails<C extends boolean = false> = CORE.UserEmails<C>;

export const { UserGPGKeys } = API;
export type UserGPGKeys<C extends boolean = false> = CORE.UserGPGKeys<C>;

export const { UserImpersonationTokens } = API;
export type UserImpersonationTokens<C extends boolean = false> = CORE.UserImpersonationTokens<C>;

export const { Users } = API;
export type Users<C extends boolean = false> = CORE.Users<C>;

export const { UserSSHKeys } = API;
export type UserSSHKeys<C extends boolean = false> = CORE.UserSSHKeys<C>;

export const { UserStarredMetricsDashboard } = API;
export type UserStarredMetricsDashboard<C extends boolean = false> =
  CORE.UserStarredMetricsDashboard<C>;

export const { Gitlab } = API;
export type Gitlab<C extends boolean = false> = CORE.Gitlab<C>;
