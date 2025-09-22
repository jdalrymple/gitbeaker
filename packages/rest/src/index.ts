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

export const Agents = API.Agents;
export type Agents<C extends boolean = false> = CORE.Agents<C>;

export const AlertManagement = API.AlertManagement;
export type AlertManagement<C extends boolean = false> = CORE.AlertManagement<C>;

export const ApplicationAppearance = API.ApplicationAppearance;
export type ApplicationAppearance<C extends boolean = false> = CORE.ApplicationAppearance<C>;

export const ApplicationPlanLimits = API.ApplicationPlanLimits;
export type ApplicationPlanLimits<C extends boolean = false> = CORE.ApplicationPlanLimits<C>;

export const Applications = API.Applications;
export type Applications<C extends boolean = false> = CORE.Applications<C>;

export const ApplicationSettings = API.ApplicationSettings;
export type ApplicationSettings<C extends boolean = false> = CORE.ApplicationSettings<C>;

export const ApplicationStatistics = API.ApplicationStatistics;
export type ApplicationStatistics<C extends boolean = false> = CORE.ApplicationStatistics<C>;

export const AuditEvents = API.AuditEvents;
export type AuditEvents<C extends boolean = false> = CORE.AuditEvents<C>;

export const Avatar = API.Avatar;
export type Avatar<C extends boolean = false> = CORE.Avatar<C>;

export const Branches = API.Branches;
export type Branches<C extends boolean = false> = CORE.Branches<C>;

export const BroadcastMessages = API.BroadcastMessages;
export type BroadcastMessages<C extends boolean = false> = CORE.BroadcastMessages<C>;

export const CodeSuggestions = API.CodeSuggestions;
export type CodeSuggestions<C extends boolean = false> = CORE.CodeSuggestions<C>;

export const CommitDiscussions = API.CommitDiscussions;
export type CommitDiscussions<C extends boolean = false> = CORE.CommitDiscussions<C>;

export const Commits = API.Commits;
export type Commits<C extends boolean = false> = CORE.Commits<C>;

export const Composer = API.Composer;
export type Composer<C extends boolean = false> = CORE.Composer<C>;

export const Conan = API.Conan;
export type Conan<C extends boolean = false> = CORE.Conan<C>;

export const ContainerRegistry = API.ContainerRegistry;
export type ContainerRegistry<C extends boolean = false> = CORE.ContainerRegistry<C>;

export const DashboardAnnotations = API.DashboardAnnotations;
export type DashboardAnnotations<C extends boolean = false> = CORE.DashboardAnnotations<C>;

export const Debian = API.Debian;
export type Debian<C extends boolean = false> = CORE.Debian<C>;

export const DependencyProxy = API.DependencyProxy;
export type DependencyProxy<C extends boolean = false> = CORE.DependencyProxy<C>;

export const DeployKeys = API.DeployKeys;
export type DeployKeys<C extends boolean = false> = CORE.DeployKeys<C>;

export const DeployTokens = API.DeployTokens;
export type DeployTokens<C extends boolean = false> = CORE.DeployTokens<C>;

export const Deployments = API.Deployments;
export type Deployments<C extends boolean = false> = CORE.Deployments<C>;

export const DockerfileTemplates = API.DockerfileTemplates;
export type DockerfileTemplates<C extends boolean = false> = CORE.DockerfileTemplates<C>;

export const Environments = API.Environments;
export type Environments<C extends boolean = false> = CORE.Environments<C>;

export const EpicAwardEmojis = API.EpicAwardEmojis;
export type EpicAwardEmojis<C extends boolean = false> = CORE.EpicAwardEmojis<C>;

export const EpicDiscussions = API.EpicDiscussions;
export type EpicDiscussions<C extends boolean = false> = CORE.EpicDiscussions<C>;

export const EpicIssues = API.EpicIssues;
export type EpicIssues<C extends boolean = false> = CORE.EpicIssues<C>;

export const EpicLabelEvents = API.EpicLabelEvents;
export type EpicLabelEvents<C extends boolean = false> = CORE.EpicLabelEvents<C>;

export const EpicLinks = API.EpicLinks;
export type EpicLinks<C extends boolean = false> = CORE.EpicLinks<C>;

export const EpicNotes = API.EpicNotes;
export type EpicNotes<C extends boolean = false> = CORE.EpicNotes<C>;

export const Epics = API.Epics;
export type Epics<C extends boolean = false> = CORE.Epics<C>;

export const ErrorTrackingClientKeys = API.ErrorTrackingClientKeys;
export type ErrorTrackingClientKeys<C extends boolean = false> = CORE.ErrorTrackingClientKeys<C>;

export const ErrorTrackingSettings = API.ErrorTrackingSettings;
export type ErrorTrackingSettings<C extends boolean = false> = CORE.ErrorTrackingSettings<C>;

export const Events = API.Events;
export type Events<C extends boolean = false> = CORE.Events<C>;

export const Experiments = API.Experiments;
export type Experiments<C extends boolean = false> = CORE.Experiments<C>;

export const ExternalStatusChecks = API.ExternalStatusChecks;
export type ExternalStatusChecks<C extends boolean = false> = CORE.ExternalStatusChecks<C>;

export const FeatureFlags = API.FeatureFlags;
export type FeatureFlags<C extends boolean = false> = CORE.FeatureFlags<C>;

export const FeatureFlagUserLists = API.FeatureFlagUserLists;
export type FeatureFlagUserLists<C extends boolean = false> = CORE.FeatureFlagUserLists<C>;

export const FreezePeriods = API.FreezePeriods;
export type FreezePeriods<C extends boolean = false> = CORE.FreezePeriods<C>;

export const GeoNodes = API.GeoNodes;
export type GeoNodes<C extends boolean = false> = CORE.GeoNodes<C>;

export const GeoSites = API.GeoSites;
export type GeoSites<C extends boolean = false> = CORE.GeoSites<C>;

export const GitignoreTemplates = API.GitignoreTemplates;
export type GitignoreTemplates<C extends boolean = false> = CORE.GitignoreTemplates<C>;

export const GitLabCIYMLTemplates = API.GitLabCIYMLTemplates;
export type GitLabCIYMLTemplates<C extends boolean = false> = CORE.GitLabCIYMLTemplates<C>;

export const GitlabPages = API.GitlabPages;
export type GitlabPages<C extends boolean = false> = CORE.GitlabPages<C>;

export const GoProxy = API.GoProxy;
export type GoProxy<C extends boolean = false> = CORE.GoProxy<C>;

export const GroupAccessRequests = API.GroupAccessRequests;
export type GroupAccessRequests<C extends boolean = false> = CORE.GroupAccessRequests<C>;

export const GroupAccessTokens = API.GroupAccessTokens;
export type GroupAccessTokens<C extends boolean = false> = CORE.GroupAccessTokens<C>;

export const GroupActivityAnalytics = API.GroupActivityAnalytics;
export type GroupActivityAnalytics<C extends boolean = false> = CORE.GroupActivityAnalytics<C>;

export const GroupBadges = API.GroupBadges;
export type GroupBadges<C extends boolean = false> = CORE.GroupBadges<C>;

export const GroupCustomAttributes = API.GroupCustomAttributes;
export type GroupCustomAttributes<C extends boolean = false> = CORE.GroupCustomAttributes<C>;

export const GroupDORA4Metrics = API.GroupDORA4Metrics;
export type GroupDORA4Metrics<C extends boolean = false> = CORE.GroupDORA4Metrics<C>;

export const GroupEpicBoards = API.GroupEpicBoards;
export type GroupEpicBoards<C extends boolean = false> = CORE.GroupEpicBoards<C>;

export const GroupHooks = API.GroupHooks;
export type GroupHooks<C extends boolean = false> = CORE.GroupHooks<C>;

export const GroupImportExports = API.GroupImportExports;
export type GroupImportExports<C extends boolean = false> = CORE.GroupImportExports<C>;

export const GroupInvitations = API.GroupInvitations;
export type GroupInvitations<C extends boolean = false> = CORE.GroupInvitations<C>;

export const GroupIssueBoards = API.GroupIssueBoards;
export type GroupIssueBoards<C extends boolean = false> = CORE.GroupIssueBoards<C>;

export const GroupIterations = API.GroupIterations;
export type GroupIterations<C extends boolean = false> = CORE.GroupIterations<C>;

export const GroupLabels = API.GroupLabels;
export type GroupLabels<C extends boolean = false> = CORE.GroupLabels<C>;

export const GroupLDAPLinks = API.GroupLDAPLinks;
export type GroupLDAPLinks<C extends boolean = false> = CORE.GroupLDAPLinks<C>;

export const GroupMarkdownUploads = API.GroupMarkdownUploads;
export type GroupMarkdownUploads<C extends boolean = false> = CORE.GroupMarkdownUploads<C>;

export const GroupMemberRoles = API.GroupMemberRoles;
export type GroupMemberRoles<C extends boolean = false> = CORE.GroupMemberRoles<C>;

export const GroupMembers = API.GroupMembers;
export type GroupMembers<C extends boolean = false> = CORE.GroupMembers<C>;

export const GroupMilestones = API.GroupMilestones;
export type GroupMilestones<C extends boolean = false> = CORE.GroupMilestones<C>;

export const GroupProtectedEnvironments = API.GroupProtectedEnvironments;
export type GroupProtectedEnvironments<C extends boolean = false> = CORE.GroupProtectedEnvironments<C>;

export const GroupPushRules = API.GroupPushRules;
export type GroupPushRules<C extends boolean = false> = CORE.GroupPushRules<C>;

export const GroupRelationExports = API.GroupRelationExports;
export type GroupRelationExports<C extends boolean = false> = CORE.GroupRelationExports<C>;

export const GroupReleases = API.GroupReleases;
export type GroupReleases<C extends boolean = false> = CORE.GroupReleases<C>;

export const GroupRepositoryStorageMoves = API.GroupRepositoryStorageMoves;
export type GroupRepositoryStorageMoves<C extends boolean = false> = CORE.GroupRepositoryStorageMoves<C>;

export const Groups = API.Groups;
export type Groups<C extends boolean = false> = CORE.Groups<C>;

export const GroupSAMLIdentities = API.GroupSAMLIdentities;
export type GroupSAMLIdentities<C extends boolean = false> = CORE.GroupSAMLIdentities<C>;

export const GroupSAMLLinks = API.GroupSAMLLinks;
export type GroupSAMLLinks<C extends boolean = false> = CORE.GroupSAMLLinks<C>;

export const GroupSCIMIdentities = API.GroupSCIMIdentities;
export type GroupSCIMIdentities<C extends boolean = false> = CORE.GroupSCIMIdentities<C>;

export const GroupServiceAccounts = API.GroupServiceAccounts;
export type GroupServiceAccounts<C extends boolean = false> = CORE.GroupServiceAccounts<C>;

export const GroupVariables = API.GroupVariables;
export type GroupVariables<C extends boolean = false> = CORE.GroupVariables<C>;

export const GroupWikis = API.GroupWikis;
export type GroupWikis<C extends boolean = false> = CORE.GroupWikis<C>;

export const Helm = API.Helm;
export type Helm<C extends boolean = false> = CORE.Helm<C>;

export const Import = API.Import;
export type Import<C extends boolean = false> = CORE.Import<C>;

export const InstanceLevelCICDVariables = API.InstanceLevelCICDVariables;
export type InstanceLevelCICDVariables<C extends boolean = false> = CORE.InstanceLevelCICDVariables<C>;

export const Integrations = API.Integrations;
export type Integrations<C extends boolean = false> = CORE.Integrations<C>;

export const IssueAwardEmojis = API.IssueAwardEmojis;
export type IssueAwardEmojis<C extends boolean = false> = CORE.IssueAwardEmojis<C>;

export const IssueDiscussions = API.IssueDiscussions;
export type IssueDiscussions<C extends boolean = false> = CORE.IssueDiscussions<C>;

export const IssueIterationEvents = API.IssueIterationEvents;
export type IssueIterationEvents<C extends boolean = false> = CORE.IssueIterationEvents<C>;

export const IssueLabelEvents = API.IssueLabelEvents;
export type IssueLabelEvents<C extends boolean = false> = CORE.IssueLabelEvents<C>;

export const IssueLinks = API.IssueLinks;
export type IssueLinks<C extends boolean = false> = CORE.IssueLinks<C>;

export const IssueMilestoneEvents = API.IssueMilestoneEvents;
export type IssueMilestoneEvents<C extends boolean = false> = CORE.IssueMilestoneEvents<C>;

export const IssueNoteAwardEmojis = API.IssueNoteAwardEmojis;
export type IssueNoteAwardEmojis<C extends boolean = false> = CORE.IssueNoteAwardEmojis<C>;

export const IssueNotes = API.IssueNotes;
export type IssueNotes<C extends boolean = false> = CORE.IssueNotes<C>;

export const Issues = API.Issues;
export type Issues<C extends boolean = false> = CORE.Issues<C>;

export const IssuesStatistics = API.IssuesStatistics;
export type IssuesStatistics<C extends boolean = false> = CORE.IssuesStatistics<C>;

export const IssueStateEvents = API.IssueStateEvents;
export type IssueStateEvents<C extends boolean = false> = CORE.IssueStateEvents<C>;

export const IssueWeightEvents = API.IssueWeightEvents;
export type IssueWeightEvents<C extends boolean = false> = CORE.IssueWeightEvents<C>;

export const JobArtifacts = API.JobArtifacts;
export type JobArtifacts<C extends boolean = false> = CORE.JobArtifacts<C>;

export const Jobs = API.Jobs;
export type Jobs<C extends boolean = false> = CORE.Jobs<C>;

export const Keys = API.Keys;
export type Keys<C extends boolean = false> = CORE.Keys<C>;

export const License = API.License;
export type License<C extends boolean = false> = CORE.License<C>;

export const LicenseTemplates = API.LicenseTemplates;
export type LicenseTemplates<C extends boolean = false> = CORE.LicenseTemplates<C>;

export const LinkedEpics = API.LinkedEpics;
export type LinkedEpics<C extends boolean = false> = CORE.LinkedEpics<C>;

export const Lint = API.Lint;
export type Lint<C extends boolean = false> = CORE.Lint<C>;

export const Markdown = API.Markdown;
export type Markdown<C extends boolean = false> = CORE.Markdown<C>;

export const Maven = API.Maven;
export type Maven<C extends boolean = false> = CORE.Maven<C>;

export const MergeRequestApprovals = API.MergeRequestApprovals;
export type MergeRequestApprovals<C extends boolean = false> = CORE.MergeRequestApprovals<C>;

export const MergeRequestAwardEmojis = API.MergeRequestAwardEmojis;
export type MergeRequestAwardEmojis<C extends boolean = false> = CORE.MergeRequestAwardEmojis<C>;

export const MergeRequestContextCommits = API.MergeRequestContextCommits;
export type MergeRequestContextCommits<C extends boolean = false> = CORE.MergeRequestContextCommits<C>;

export const MergeRequestDiscussions = API.MergeRequestDiscussions;
export type MergeRequestDiscussions<C extends boolean = false> = CORE.MergeRequestDiscussions<C>;

export const MergeRequestDraftNotes = API.MergeRequestDraftNotes;
export type MergeRequestDraftNotes<C extends boolean = false> = CORE.MergeRequestDraftNotes<C>;

export const MergeRequestLabelEvents = API.MergeRequestLabelEvents;
export type MergeRequestLabelEvents<C extends boolean = false> = CORE.MergeRequestLabelEvents<C>;

export const MergeRequestMilestoneEvents = API.MergeRequestMilestoneEvents;
export type MergeRequestMilestoneEvents<C extends boolean = false> = CORE.MergeRequestMilestoneEvents<C>;

export const MergeRequestNoteAwardEmojis = API.MergeRequestNoteAwardEmojis;
export type MergeRequestNoteAwardEmojis<C extends boolean = false> = CORE.MergeRequestNoteAwardEmojis<C>;

export const MergeRequestNotes = API.MergeRequestNotes;
export type MergeRequestNotes<C extends boolean = false> = CORE.MergeRequestNotes<C>;

export const MergeRequests = API.MergeRequests;
export type MergeRequests<C extends boolean = false> = CORE.MergeRequests<C>;

export const MergeTrains = API.MergeTrains;
export type MergeTrains<C extends boolean = false> = CORE.MergeTrains<C>;

export const Metadata = API.Metadata;
export type Metadata<C extends boolean = false> = CORE.Metadata<C>;

export const Migrations = API.Migrations;
export type Migrations<C extends boolean = false> = CORE.Migrations<C>;

export const Namespaces = API.Namespaces;
export type Namespaces<C extends boolean = false> = CORE.Namespaces<C>;

export const NotificationSettings = API.NotificationSettings;
export type NotificationSettings<C extends boolean = false> = CORE.NotificationSettings<C>;

export const NPM = API.NPM;
export type NPM<C extends boolean = false> = CORE.NPM<C>;

export const NuGet = API.NuGet;
export type NuGet<C extends boolean = false> = CORE.NuGet<C>;

export const PackageRegistry = API.PackageRegistry;
export type PackageRegistry<C extends boolean = false> = CORE.PackageRegistry<C>;

export const Packages = API.Packages;
export type Packages<C extends boolean = false> = CORE.Packages<C>;

export const PagesDomains = API.PagesDomains;
export type PagesDomains<C extends boolean = false> = CORE.PagesDomains<C>;

export const PersonalAccessTokens = API.PersonalAccessTokens;
export type PersonalAccessTokens<C extends boolean = false> = CORE.PersonalAccessTokens<C>;

export const PipelineSchedules = API.PipelineSchedules;
export type PipelineSchedules<C extends boolean = false> = CORE.PipelineSchedules<C>;

export const PipelineScheduleVariables = API.PipelineScheduleVariables;
export type PipelineScheduleVariables<C extends boolean = false> = CORE.PipelineScheduleVariables<C>;

export const Pipelines = API.Pipelines;
export type Pipelines<C extends boolean = false> = CORE.Pipelines<C>;

export const PipelineTriggerTokens = API.PipelineTriggerTokens;
export type PipelineTriggerTokens<C extends boolean = false> = CORE.PipelineTriggerTokens<C>;

export const ProductAnalytics = API.ProductAnalytics;
export type ProductAnalytics<C extends boolean = false> = CORE.ProductAnalytics<C>;

export const ProjectAccessRequests = API.ProjectAccessRequests;
export type ProjectAccessRequests<C extends boolean = false> = CORE.ProjectAccessRequests<C>;

export const ProjectAccessTokens = API.ProjectAccessTokens;
export type ProjectAccessTokens<C extends boolean = false> = CORE.ProjectAccessTokens<C>;

export const ProjectAliases = API.ProjectAliases;
export type ProjectAliases<C extends boolean = false> = CORE.ProjectAliases<C>;

export const ProjectBadges = API.ProjectBadges;
export type ProjectBadges<C extends boolean = false> = CORE.ProjectBadges<C>;

export const ProjectCustomAttributes = API.ProjectCustomAttributes;
export type ProjectCustomAttributes<C extends boolean = false> = CORE.ProjectCustomAttributes<C>;

export const ProjectDORA4Metrics = API.ProjectDORA4Metrics;
export type ProjectDORA4Metrics<C extends boolean = false> = CORE.ProjectDORA4Metrics<C>;

export const ProjectHooks = API.ProjectHooks;
export type ProjectHooks<C extends boolean = false> = CORE.ProjectHooks<C>;

export const ProjectImportExports = API.ProjectImportExports;
export type ProjectImportExports<C extends boolean = false> = CORE.ProjectImportExports<C>;

export const ProjectInvitations = API.ProjectInvitations;
export type ProjectInvitations<C extends boolean = false> = CORE.ProjectInvitations<C>;

export const ProjectIssueBoards = API.ProjectIssueBoards;
export type ProjectIssueBoards<C extends boolean = false> = CORE.ProjectIssueBoards<C>;

export const ProjectIterations = API.ProjectIterations;
export type ProjectIterations<C extends boolean = false> = CORE.ProjectIterations<C>;

export const ProjectJobTokenScopes = API.ProjectJobTokenScopes;
export type ProjectJobTokenScopes<C extends boolean = false> = CORE.ProjectJobTokenScopes<C>;

export const ProjectLabels = API.ProjectLabels;
export type ProjectLabels<C extends boolean = false> = CORE.ProjectLabels<C>;

export const ProjectMarkdownUploads = API.ProjectMarkdownUploads;
export type ProjectMarkdownUploads<C extends boolean = false> = CORE.ProjectMarkdownUploads<C>;

export const ProjectMembers = API.ProjectMembers;
export type ProjectMembers<C extends boolean = false> = CORE.ProjectMembers<C>;

export const ProjectMilestones = API.ProjectMilestones;
export type ProjectMilestones<C extends boolean = false> = CORE.ProjectMilestones<C>;

export const ProjectProtectedEnvironments = API.ProjectProtectedEnvironments;
export type ProjectProtectedEnvironments<C extends boolean = false> = CORE.ProjectProtectedEnvironments<C>;

export const ProjectPushRules = API.ProjectPushRules;
export type ProjectPushRules<C extends boolean = false> = CORE.ProjectPushRules<C>;

export const ProjectRelationsExport = API.ProjectRelationsExport;
export type ProjectRelationsExport<C extends boolean = false> = CORE.ProjectRelationsExport<C>;

export const ProjectReleases = API.ProjectReleases;
export type ProjectReleases<C extends boolean = false> = CORE.ProjectReleases<C>;

export const ProjectRemoteMirrors = API.ProjectRemoteMirrors;
export type ProjectRemoteMirrors<C extends boolean = false> = CORE.ProjectRemoteMirrors<C>;

export const ProjectRepositoryStorageMoves = API.ProjectRepositoryStorageMoves;
export type ProjectRepositoryStorageMoves<C extends boolean = false> = CORE.ProjectRepositoryStorageMoves<C>;

export const Projects = API.Projects;
export type Projects<C extends boolean = false> = CORE.Projects<C>;

export const ProjectSnippetAwardEmojis = API.ProjectSnippetAwardEmojis;
export type ProjectSnippetAwardEmojis<C extends boolean = false> = CORE.ProjectSnippetAwardEmojis<C>;

export const ProjectSnippetDiscussions = API.ProjectSnippetDiscussions;
export type ProjectSnippetDiscussions<C extends boolean = false> = CORE.ProjectSnippetDiscussions<C>;

export const ProjectSnippetNotes = API.ProjectSnippetNotes;
export type ProjectSnippetNotes<C extends boolean = false> = CORE.ProjectSnippetNotes<C>;

export const ProjectSnippets = API.ProjectSnippets;
export type ProjectSnippets<C extends boolean = false> = CORE.ProjectSnippets<C>;

export const ProjectStatistics = API.ProjectStatistics;
export type ProjectStatistics<C extends boolean = false> = CORE.ProjectStatistics<C>;

export const ProjectTemplates = API.ProjectTemplates;
export type ProjectTemplates<C extends boolean = false> = CORE.ProjectTemplates<C>;

export const ProjectTerraformState = API.ProjectTerraformState;
export type ProjectTerraformState<C extends boolean = false> = CORE.ProjectTerraformState<C>;

export const ProjectVariables = API.ProjectVariables;
export type ProjectVariables<C extends boolean = false> = CORE.ProjectVariables<C>;

export const ProjectVulnerabilities = API.ProjectVulnerabilities;
export type ProjectVulnerabilities<C extends boolean = false> = CORE.ProjectVulnerabilities<C>;

export const ProjectWikis = API.ProjectWikis;
export type ProjectWikis<C extends boolean = false> = CORE.ProjectWikis<C>;

export const ProtectedBranches = API.ProtectedBranches;
export type ProtectedBranches<C extends boolean = false> = CORE.ProtectedBranches<C>;

export const ProtectedTags = API.ProtectedTags;
export type ProtectedTags<C extends boolean = false> = CORE.ProtectedTags<C>;

export const PyPI = API.PyPI;
export type PyPI<C extends boolean = false> = CORE.PyPI<C>;

export const ReleaseLinks = API.ReleaseLinks;
export type ReleaseLinks<C extends boolean = false> = CORE.ReleaseLinks<C>;

export const Repositories = API.Repositories;
export type Repositories<C extends boolean = false> = CORE.Repositories<C>;

export const RepositoryFiles = API.RepositoryFiles;
export type RepositoryFiles<C extends boolean = false> = CORE.RepositoryFiles<C>;

export const RepositorySubmodules = API.RepositorySubmodules;
export type RepositorySubmodules<C extends boolean = false> = CORE.RepositorySubmodules<C>;

export const ResourceGroups = API.ResourceGroups;
export type ResourceGroups<C extends boolean = false> = CORE.ResourceGroups<C>;

export const RubyGems = API.RubyGems;
export type RubyGems<C extends boolean = false> = CORE.RubyGems<C>;

export const Runners = API.Runners;
export type Runners<C extends boolean = false> = CORE.Runners<C>;

export const Search = API.Search;
export type Search<C extends boolean = false> = CORE.Search<C>;

export const SearchAdmin = API.SearchAdmin;
export type SearchAdmin<C extends boolean = false> = CORE.SearchAdmin<C>;

export const SecureFiles = API.SecureFiles;
export type SecureFiles<C extends boolean = false> = CORE.SecureFiles<C>;

export const ServiceAccounts = API.ServiceAccounts;
export type ServiceAccounts<C extends boolean = false> = CORE.ServiceAccounts<C>;

export const ServiceData = API.ServiceData;
export type ServiceData<C extends boolean = false> = CORE.ServiceData<C>;

export const SidekiqMetrics = API.SidekiqMetrics;
export type SidekiqMetrics<C extends boolean = false> = CORE.SidekiqMetrics<C>;

export const SidekiqQueues = API.SidekiqQueues;
export type SidekiqQueues<C extends boolean = false> = CORE.SidekiqQueues<C>;

export const SnippetRepositoryStorageMoves = API.SnippetRepositoryStorageMoves;
export type SnippetRepositoryStorageMoves<C extends boolean = false> = CORE.SnippetRepositoryStorageMoves<C>;

export const Snippets = API.Snippets;
export type Snippets<C extends boolean = false> = CORE.Snippets<C>;

export const Suggestions = API.Suggestions;
export type Suggestions<C extends boolean = false> = CORE.Suggestions<C>;

export const SystemHooks = API.SystemHooks;
export type SystemHooks<C extends boolean = false> = CORE.SystemHooks<C>;

export const Tags = API.Tags;
export type Tags<C extends boolean = false> = CORE.Tags<C>;

export const TodoLists = API.TodoLists;
export type TodoLists<C extends boolean = false> = CORE.TodoLists<C>;

export const Topics = API.Topics;
export type Topics<C extends boolean = false> = CORE.Topics<C>;

export const UserCustomAttributes = API.UserCustomAttributes;
export type UserCustomAttributes<C extends boolean = false> = CORE.UserCustomAttributes<C>;

export const UserEmails = API.UserEmails;
export type UserEmails<C extends boolean = false> = CORE.UserEmails<C>;

export const UserGPGKeys = API.UserGPGKeys;
export type UserGPGKeys<C extends boolean = false> = CORE.UserGPGKeys<C>;

export const UserImpersonationTokens = API.UserImpersonationTokens;
export type UserImpersonationTokens<C extends boolean = false> = CORE.UserImpersonationTokens<C>;

export const Users = API.Users;
export type Users<C extends boolean = false> = CORE.Users<C>;

export const UserSSHKeys = API.UserSSHKeys;
export type UserSSHKeys<C extends boolean = false> = CORE.UserSSHKeys<C>;

export const UserStarredMetricsDashboard = API.UserStarredMetricsDashboard;
export type UserStarredMetricsDashboard<C extends boolean = false> = CORE.UserStarredMetricsDashboard<C>;

export const Gitlab = API.Gitlab;
export type Gitlab<C extends boolean = false> = CORE.Gitlab<C>;
