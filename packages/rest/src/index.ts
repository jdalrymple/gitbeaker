/* istanbul ignore file */

import * as CORE from '@gitbeaker/core';
import { presetResourceArguments } from '@gitbeaker/requester-utils';
import { requesterFn } from './Requester';

export type * from '@gitbeaker/core';

const { AccessLevel: AL, ...Resources } = CORE;
const API = presetResourceArguments(Resources, { requesterFn });

export const AccessLevel = AL;

export const {
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
  ProjectJobTokenScopes,
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
  GroupJobTokenScopes,
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

  Gitlab,
} = API;
