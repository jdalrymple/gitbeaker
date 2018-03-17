import * as Services from './services';
import { init } from './infrastructure/Namespace';

// All not initialized
// export * from './services';

// Groups
const {
  Groups,
  GroupAccessRequests,
  GroupCustomAttributes,
  GroupMembers,
  GroupMilestones,
  GroupProjects,
  GroupVariables,
} = Services;

// export const GroupNamespace = options => init(options, {
//   Groups,
//   GroupAccessRequests,
//   GroupCustomAttributes,
//   GroupMembers,
//   GroupMilestones,
//   GroupProjects,
//   GroupVariables,
// });

// // Users
// const {
//   Users,
//   UserEmails,
//   UserImpersonationTokens,
//   UserKeys,
//   UserGPGKeys,
// } = Services;

// export const UserNamespace = options => init(options, {
//   Users,
//   UserEmails,
//   UserImpersonationTokens,
//   UserKeys,
//   UserGPGKeys,
// });

// // // Projects
// const {
//   Branches,
//   Commits,
//   DeployKeys,
//   Environments,
//   Issues,
//   Jobs,
//   Labels,
//   MergeRequests,
//   MergeRequestNotes,
//   MergeRequestVersions,
//   Pipelines,
//   Projects,
//   ProjectAccessRequests,
//   ProjectCustomAttributes,
//   ProjectHooks,
//   ProjectMembers,
//   ProjectMilestones,
//   ProjectSnippets,
//   ProtectedBranches,
//   ProjectVariables,
//   Repositories,
//   RepositoryFiles,
//   Runners,
//   Services,
//   Tags,
//   Triggers,
// } = Services;

// export const ProjectNamespace = options => init(options, {
//   Branches,
//   Commits,
//   DeployKeys,
//   Environments,
//   Issues,
//   Jobs,
//   Labels,
//   MergeRequests,
//   MergeRequestNotes,
//   MergeRequestVersions,
//   Pipelines,
//   Projects,
//   ProjectAccessRequests,
//   ProjectCustomAttributes,
//   ProjectHooks,
//   ProjectMembers,
//   ProjectMilestones,
//   ProjectSnippets,
//   ProtectedBranches,
//   ProjectVariables,
//   Repositories,
//   RepositoryFiles,
//   Runners,
//   Services,
//   Tags,
//   Triggers,
// });

// // All initialized
// export default options => init(options, Services);
