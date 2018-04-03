"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GroupsBundle: true,
  UsersBundle: true,
  ProjectsBundle: true
};
exports.default = exports.ProjectsBundle = exports.UsersBundle = exports.GroupsBundle = void 0;

var APIServices = _interopRequireWildcard(require("./services"));

Object.keys(APIServices).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return APIServices[key];
    }
  });
});

var _Namespace = require("./infrastructure/Namespace");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// All not initialized
// Groups
const {
  Groups,
  GroupAccessRequests,
  GroupCustomAttributes,
  GroupMembers,
  GroupMilestones,
  GroupProjects,
  GroupVariables
} = APIServices;
const GroupsBundle = (0, _Namespace.init)({
  Groups,
  GroupAccessRequests,
  GroupCustomAttributes,
  GroupMembers,
  GroupMilestones,
  GroupProjects,
  GroupVariables
}); // Users

exports.GroupsBundle = GroupsBundle;
const {
  Users,
  UserEmails,
  UserImpersonationTokens,
  UserKeys,
  UserGPGKeys
} = APIServices;
const UsersBundle = (0, _Namespace.init)({
  Users,
  UserEmails,
  UserImpersonationTokens,
  UserKeys,
  UserGPGKeys
}); // Projects

exports.UsersBundle = UsersBundle;
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
  Triggers
} = APIServices;
const ProjectsBundle = (0, _Namespace.init)({
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
  Triggers
}); // All initialized

exports.ProjectsBundle = ProjectsBundle;

var _default = (0, _Namespace.init)(APIServices);

exports.default = _default;