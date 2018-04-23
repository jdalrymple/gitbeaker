import Pick from 'lodash.pick';
import * as APIServices from './services';
import { Bundler } from './infrastructure';

// All seperatly
export * from './services';

// Groups
export const GroupsBundle = Bundler(Pick(APIServices, [
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
export const UsersBundle = Bundler(Pick(APIServices, [
  'Users',
  'UserCustomAttributes',
  'UserEmails',
  'UserImpersonationTokens',
  'UserKeys',
  'UserGPGKeys',
]));

// Projects
export const ProjectsBundle = Bundler(Pick(APIServices, [
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
  'PipelineJobs',
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
export default Bundler(APIServices);
