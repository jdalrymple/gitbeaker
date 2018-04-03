"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _Object$defineProperty = require("@babel/runtime/core-js/object/define-property");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

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

_Object$keys(APIServices).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return APIServices[key];
    }
  });
});

var _Namespace = require("./infrastructure/Namespace");

// All not initialized
// Groups
var Groups = APIServices.Groups,
    GroupAccessRequests = APIServices.GroupAccessRequests,
    GroupCustomAttributes = APIServices.GroupCustomAttributes,
    GroupMembers = APIServices.GroupMembers,
    GroupMilestones = APIServices.GroupMilestones,
    GroupProjects = APIServices.GroupProjects,
    GroupVariables = APIServices.GroupVariables;
var GroupsBundle = (0, _Namespace.init)({
  Groups: Groups,
  GroupAccessRequests: GroupAccessRequests,
  GroupCustomAttributes: GroupCustomAttributes,
  GroupMembers: GroupMembers,
  GroupMilestones: GroupMilestones,
  GroupProjects: GroupProjects,
  GroupVariables: GroupVariables
}); // Users

exports.GroupsBundle = GroupsBundle;
var Users = APIServices.Users,
    UserEmails = APIServices.UserEmails,
    UserImpersonationTokens = APIServices.UserImpersonationTokens,
    UserKeys = APIServices.UserKeys,
    UserGPGKeys = APIServices.UserGPGKeys;
var UsersBundle = (0, _Namespace.init)({
  Users: Users,
  UserEmails: UserEmails,
  UserImpersonationTokens: UserImpersonationTokens,
  UserKeys: UserKeys,
  UserGPGKeys: UserGPGKeys
}); // Projects

exports.UsersBundle = UsersBundle;
var Branches = APIServices.Branches,
    Commits = APIServices.Commits,
    DeployKeys = APIServices.DeployKeys,
    Environments = APIServices.Environments,
    Issues = APIServices.Issues,
    Jobs = APIServices.Jobs,
    Labels = APIServices.Labels,
    MergeRequests = APIServices.MergeRequests,
    MergeRequestNotes = APIServices.MergeRequestNotes,
    Pipelines = APIServices.Pipelines,
    Projects = APIServices.Projects,
    ProjectAccessRequests = APIServices.ProjectAccessRequests,
    ProjectCustomAttributes = APIServices.ProjectCustomAttributes,
    ProjectHooks = APIServices.ProjectHooks,
    ProjectMembers = APIServices.ProjectMembers,
    ProjectMilestones = APIServices.ProjectMilestones,
    ProjectSnippets = APIServices.ProjectSnippets,
    ProtectedBranches = APIServices.ProtectedBranches,
    ProjectVariables = APIServices.ProjectVariables,
    Repositories = APIServices.Repositories,
    RepositoryFiles = APIServices.RepositoryFiles,
    Runners = APIServices.Runners,
    Services = APIServices.Services,
    Tags = APIServices.Tags,
    Triggers = APIServices.Triggers;
var ProjectsBundle = (0, _Namespace.init)({
  Branches: Branches,
  Commits: Commits,
  DeployKeys: DeployKeys,
  Environments: Environments,
  Issues: Issues,
  Jobs: Jobs,
  Labels: Labels,
  MergeRequests: MergeRequests,
  MergeRequestNotes: MergeRequestNotes,
  Pipelines: Pipelines,
  Projects: Projects,
  ProjectAccessRequests: ProjectAccessRequests,
  ProjectCustomAttributes: ProjectCustomAttributes,
  ProjectHooks: ProjectHooks,
  ProjectMembers: ProjectMembers,
  ProjectMilestones: ProjectMilestones,
  ProjectSnippets: ProjectSnippets,
  ProtectedBranches: ProtectedBranches,
  ProjectVariables: ProjectVariables,
  Repositories: Repositories,
  RepositoryFiles: RepositoryFiles,
  Runners: Runners,
  Services: Services,
  Tags: Tags,
  Triggers: Triggers
}); // All initialized

exports.ProjectsBundle = ProjectsBundle;

var _default = (0, _Namespace.init)(APIServices);

exports.default = _default;