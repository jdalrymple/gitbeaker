import Pick from 'lodash.pick';
import * as APIServices from './services';
import init from './infrastructure/Bundle';

// All seperatly
export * from './services';

// Groups
export const GroupsBundle = init(Pick(APIServices, [
  'Groups',
  'GroupAccessRequests',
  'GroupBadges',
  'GroupCustomAttributes',
  'GroupIssueBoards',
  'GroupMembers',
  'GroupMilestones',
  'GroupProjects',
  'GroupVariables',
  'Epics',
  'EpicIssues',
  'EpicNotes',
  'EpicDiscussions',
]));

// Users
export const UsersBundle = init(Pick(APIServices, [
  'Users',
  'UserEmails',
  'UserImpersonationTokens',
  'UserKeys',
  'UserGPGKeys',
]));

// Projects
export const ProjectsBundle = init(Pick(APIServices, [
  'Branches',
  'Commits',
  'DeployKeys',
  'Deployments',
  'Environments',
  'Issues',
  'IssueAwardEmojis',
  'IssueNotes',
  'IssueDiscussions',
  'Jobs',
  'Labels',
  'MergeRequests',
  'MergeRequestAwardEmojis',
  'MergeRequestNotes',
  'Pipelines',
  'PipelineSchedules',
  'PipelineScheduleVariables',
  'Projects',
  'ProjectAccessRequests',
  'ProjectBadges',
  'ProjectCustomAttributes',
  'ProjectImportExport',
  'ProjectIssueBoards',
  'ProjectHooks',
  'ProjectMembers',
  'ProjectMilestones',
  'ProjectSnippet',
  'ProjectSnippetNotes',
  'ProjectSnippetDiscussions',
  'ProjectSnippetAwardEmojis',
  'ProtectedBranches',
  'ProjectVariables',
  'Repositories',
  'RepositoryFiles',
  'Runners',
  'Services',
  'Tags',
  'Triggers',
]));

// All initialized
export default init(APIServices);
