# External module: "index"

## Variables

### `Const` Gitlab

• **Gitlab**: *[Bundle](../interfaces/_infrastructure_index_.bundle.md)‹["services/index"](_services_index_.md), "Groups" | "GroupAccessRequests" | "GroupBadges" | "GroupCustomAttributes" | "GroupIssueBoards" | "GroupMembers" | "GroupMilestones" | "GroupProjects" | "GroupVariables" | "Epics" | "EpicIssues" | "EpicNotes" | "EpicDiscussions" | "Users" | "UserCustomAttributes" | "UserEmails" | "UserImpersonationTokens" | "UserKeys" | "UserGPGKeys" | "Branches" | "Commits" | "CommitDiscussions" | "ContainerRegistry" | "DeployKeys" | "Deployments" | "Environments" | "Issues" | "IssueAwardEmojis" | "IssueNotes" | "IssueDiscussions" | "Jobs" | "Labels" | "MergeRequests" | "MergeRequestAwardEmojis" | "MergeRequestDiscussions" | "MergeRequestNotes" | "Pipelines" | "PipelineSchedules" | "PipelineScheduleVariables" | "Projects" | "ProjectAccessRequests" | "ProjectBadges" | "ProjectCustomAttributes" | "ProjectImportExport" | "ProjectIssueBoards" | "ProjectHooks" | "ProjectMembers" | "ProjectMilestones" | "ProjectSnippets" | "ProjectSnippetNotes" | "ProjectSnippetDiscussions" | "ProjectSnippetAwardEmojis" | "ProtectedBranches" | "ProtectedTags" | "ProjectVariables" | "Releases" | "ReleaseLinks" | "Repositories" | "RepositoryFiles" | "Runners" | "Services" | "Tags" | "Triggers" | "Todos" | "PushRule" | "ApplicationSettings" | "BroadcastMessages" | "Events" | "FeatureFlags" | "GeoNodes" | "GitignoreTemplates" | "GitLabCIYMLTemplates" | "Keys" | "Licence" | "LicenceTemplates" | "Lint" | "Namespaces" | "NotificationSettings" | "Markdown" | "PagesDomains" | "Search" | "SidekiqMetrics" | "Snippets" | "SystemHooks" | "Version" | "Wikis"›* =  bundler(APIServices)

*Defined in [index.ts:88](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/index.ts#L88)*

___

### `Const` GroupsBundle

• **GroupsBundle**: *[Bundle](../interfaces/_infrastructure_index_.bundle.md)‹object, "Groups" | "GroupAccessRequests" | "GroupBadges" | "GroupCustomAttributes" | "GroupIssueBoards" | "GroupMembers" | "GroupMilestones" | "GroupProjects" | "GroupVariables" | "Epics" | "EpicIssues" | "EpicNotes" | "EpicDiscussions"›* =  bundler({
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
})

*Defined in [index.ts:13](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/index.ts#L13)*

___

### `Const` ProjectsBundle

• **ProjectsBundle**: *[Bundle](../interfaces/_infrastructure_index_.bundle.md)‹object, "Branches" | "Commits" | "CommitDiscussions" | "ContainerRegistry" | "DeployKeys" | "Deployments" | "Environments" | "Issues" | "IssueAwardEmojis" | "IssueNotes" | "IssueDiscussions" | "Jobs" | "Labels" | "MergeRequests" | "MergeRequestAwardEmojis" | "MergeRequestDiscussions" | "MergeRequestNotes" | "Pipelines" | "PipelineSchedules" | "PipelineScheduleVariables" | "Projects" | "ProjectAccessRequests" | "ProjectBadges" | "ProjectCustomAttributes" | "ProjectImportExport" | "ProjectIssueBoards" | "ProjectHooks" | "ProjectMembers" | "ProjectMilestones" | "ProjectSnippets" | "ProjectSnippetNotes" | "ProjectSnippetDiscussions" | "ProjectSnippetAwardEmojis" | "ProtectedBranches" | "ProtectedTags" | "ProjectVariables" | "Releases" | "ReleaseLinks" | "Repositories" | "RepositoryFiles" | "Runners" | "Services" | "Tags" | "Triggers"›* =  bundler({
  Branches: APIServices.Branches,
  Commits: APIServices.Commits,
  CommitDiscussions: APIServices.CommitDiscussions,
  ContainerRegistry: APIServices.ContainerRegistry,
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
  ProtectedTags: APIServices.ProtectedTags,
  ProjectVariables: APIServices.ProjectVariables,
  Releases: APIServices.Releases,
  ReleaseLinks: APIServices.ReleaseLinks,
  Repositories: APIServices.Repositories,
  RepositoryFiles: APIServices.RepositoryFiles,
  Runners: APIServices.Runners,
  Services: APIServices.Services,
  Tags: APIServices.Tags,
  Triggers: APIServices.Triggers,
})

*Defined in [index.ts:40](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/index.ts#L40)*

___

### `Const` UsersBundle

• **UsersBundle**: *[Bundle](../interfaces/_infrastructure_index_.bundle.md)‹object, "Users" | "UserCustomAttributes" | "UserEmails" | "UserImpersonationTokens" | "UserKeys" | "UserGPGKeys"›* =  bundler({
  Users: APIServices.Users,
  UserCustomAttributes: APIServices.UserCustomAttributes,
  UserEmails: APIServices.UserEmails,
  UserImpersonationTokens: APIServices.UserImpersonationTokens,
  UserKeys: APIServices.UserKeys,
  UserGPGKeys: APIServices.UserGPGKeys,
})

*Defined in [index.ts:30](https://github.com/arsdehnel/node-gitlab/blob/c2ee9bb/src/index.ts#L30)*
