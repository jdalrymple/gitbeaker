import Pick from 'lodash.pick';
import * as APIServices from './services';
import init from './infrastructure/Namespace';

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
  'Jobs',
  'Labels',
  'MergeRequests',
  'MergeRequestNotes',
  'Pipelines',
  'Projects',
  'ProjectAccessRequests',
  'ProjectBadges',
  'ProjectCustomAttributes',
  'ProjectIssueBoards',
  'ProjectHooks',
  'ProjectMembers',
  'ProjectMilestones',
  'ProjectSnippets',
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
