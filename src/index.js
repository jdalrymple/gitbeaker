import * as APIServices from './services';
import { init } from './infrastructure/Namespace';

// All not initialized
export * from './services';

// Groups
const {
  Groups,
  GroupAccessRequests,
  GroupCustomAttributes,
  GroupMembers,
  GroupMilestones,
  GroupProjects,
  GroupVariables,
} = APIServices;

export const GroupsBundle = init({
  Groups,
  GroupAccessRequests,
  GroupCustomAttributes,
  GroupMembers,
  GroupMilestones,
  GroupProjects,
  GroupVariables,
});

// Users
const { Users, UserEmails, UserImpersonationTokens, UserKeys, UserGPGKeys } = APIServices;

export const UsersBundle = init({
  Users,
  UserEmails,
  UserImpersonationTokens,
  UserKeys,
  UserGPGKeys,
});

// Projects
const {
  Branches,
  Commits,
  DeployKeys,
  Environments,
  Issues,
  Jobs,
  Labels,
  MergeRequests,
  MergeRequestNotes,
  Pipelines,
  Projects,
  ProjectAccessRequests,
  ProjectCustomAttributes,
  ProjectHooks,
  ProjectMembers,
  ProjectMilestones,
  ProjectSnippets,
  ProtectedBranches,
  ProjectVariables,
  Repositories,
  RepositoryFiles,
  Runners,
  Services,
  Tags,
  Triggers,
} = APIServices;

export const ProjectsBundle = init({
  Branches,
  Commits,
  DeployKeys,
  Environments,
  Issues,
  Jobs,
  Labels,
  MergeRequests,
  MergeRequestNotes,
  Pipelines,
  Projects,
  ProjectAccessRequests,
  ProjectCustomAttributes,
  ProjectHooks,
  ProjectMembers,
  ProjectMilestones,
  ProjectSnippets,
  ProtectedBranches,
  ProjectVariables,
  Repositories,
  RepositoryFiles,
  Runners,
  Services,
  Tags,
  Triggers,
});

// All initialized
export default init(APIServices);
