import * as Gitbeaker from '@gitbeaker/core';
import { modifyServices } from '@gitbeaker/requester-utils';
import { Requester } from './GotRequester';

const APIServices = modifyServices(Gitbeaker, { requester: Requester });

// Groups
export const Groups = APIServices.Groups;
export const GroupAccessRequests = APIServices.GroupAccessRequests;
export const GroupBadges = APIServices.GroupBadges;
export const GroupCustomAttributes = APIServices.GroupCustomAttributes;
export const GroupIssueBoards = APIServices.GroupIssueBoards;
export const GroupMembers = APIServices.GroupMembers;
export const GroupVariables = APIServices.GroupVariables;
export const GroupLabels = APIServices.GroupLabels;
export const Epics = APIServices.Epics;
export const EpicIssues = APIServices.EpicIssues;
export const EpicNotes = APIServices.EpicNotes;
export const EpicDiscussions = APIServices.EpicDiscussions;

// Users
export const Users = APIServices.Users;
export const UserCustomAttributes = APIServices.UserCustomAttributes;
export const UserEmails = APIServices.UserEmails;
export const UserImpersonationTokens = APIServices.UserImpersonationTokens;
export const UserKeys = APIServices.UserKeys;
export const UserGPGKeys = APIServices.UserGPGKeys;

// Projects
export const Branches = APIServices.Branches;
export const Commits = APIServices.Commits;
export const CommitDiscussions = APIServices.CommitDiscussions;
export const ContainerRegistry = APIServices.ContainerRegistry;
export const Deployments = APIServices.Deployments;
export const DeployKeys = APIServices.DeployKeys;
export const Environments = APIServices.Environments;
export const Issues = APIServices.Issues;
export const IssuesStatistics = APIServices.IssuesStatistics;
export const IssueNotes = APIServices.IssueNotes;
export const IssueDiscussions = APIServices.IssueDiscussions;
export const IssueAwardEmojis = APIServices.IssueAwardEmojis;
export const Jobs = APIServices.Jobs;
export const Labels = APIServices.Labels;
export const MergeRequests = APIServices.MergeRequests;
export const MergeRequestAwardEmojis = APIServices.MergeRequestAwardEmojis;
export const MergeRequestDiscussions = APIServices.MergeRequestDiscussions;
export const MergeRequestNotes = APIServices.MergeRequestNotes;
export const Packages = APIServices.Packages;
export const Pipelines = APIServices.Pipelines;
export const PipelineSchedules = APIServices.PipelineSchedules;
export const PipelineScheduleVariables = APIServices.PipelineScheduleVariables;
export const Projects = APIServices.Projects;
export const ProjectAccessRequests = APIServices.ProjectAccessRequests;
export const ProjectBadges = APIServices.ProjectBadges;
export const ProjectCustomAttributes = APIServices.ProjectCustomAttributes;
export const ProjectImportExport = APIServices.ProjectImportExport;
export const ProjectIssueBoards = APIServices.ProjectIssueBoards;
export const ProjectHooks = APIServices.ProjectHooks;
export const ProjectMembers = APIServices.ProjectMembers;
export const ProjectMilestones = APIServices.ProjectMilestones;
export const ProjectSnippets = APIServices.ProjectSnippets;
export const ProjectSnippetNotes = APIServices.ProjectSnippetNotes;
export const ProjectSnippetDiscussions = APIServices.ProjectSnippetDiscussions;
export const ProjectSnippetAwardEmojis = APIServices.ProjectSnippetAwardEmojis;
export const ProtectedBranches = APIServices.ProtectedBranches;
export const ProtectedTags = APIServices.ProtectedTags;
export const ProjectVariables = APIServices.ProjectVariables;
export const PushRules = APIServices.PushRules;
export const Releases = APIServices.Releases;
export const ReleaseLinks = APIServices.ReleaseLinks;
export const Repositories = APIServices.Repositories;
export const RepositoryFiles = APIServices.RepositoryFiles;
export const Runners = APIServices.Runners;
export const Services = APIServices.Services;
export const Tags = APIServices.Tags;
export const Todos = APIServices.Todos;
export const Triggers = APIServices.Triggers;
export const VulnerabilityFindings = APIServices.VulnerabilityFindings;

// Genral
export const ApplicationSettings = APIServices.ApplicationSettings;
export const BroadcastMessages = APIServices.BroadcastMessages;
export const Events = APIServices.Events;
export const FeatureFlags = APIServices.FeatureFlags;
export const GeoNodes = APIServices.GeoNodes;
export const GitignoreTemplates = APIServices.GitignoreTemplates;
export const GitLabCIYMLTemplates = APIServices.GitLabCIYMLTemplates;
export const Keys = APIServices.Keys;
export const License = APIServices.License;
export const LicenceTemplates = APIServices.LicenceTemplates;
export const Lint = APIServices.Lint;
export const Namespaces = APIServices.Namespaces;
export const NotificationSettings = APIServices.NotificationSettings;
export const Markdown = APIServices.Markdown;
export const PagesDomains = APIServices.PagesDomains;
export const Search = APIServices.Search;
export const SidekiqMetrics = APIServices.SidekiqMetrics;
export const Snippets = APIServices.Snippets;
export const SystemHooks = APIServices.SystemHooks;
export const Version = APIServices.Version;
export const Wikis = APIServices.Wikis;

// Bundles
export const GroupsBundle = APIServices.GroupsBundle;
export const UsersBundle = APIServices.UsersBundle;
export const ProjectsBundle = APIServices.ProjectsBundle;
export const Gitlab = APIServices.Gitlab;
