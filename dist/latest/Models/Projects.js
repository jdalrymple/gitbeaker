"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ProjectHooks = _interopRequireDefault(require("./ProjectHooks"));

var _ProjectIssues = _interopRequireDefault(require("./ProjectIssues"));

var _ProjectLabels = _interopRequireDefault(require("./ProjectLabels"));

var _ProjectRepository = _interopRequireDefault(require("./ProjectRepository"));

var _ProjectProtectedBranches = _interopRequireDefault(require("./ProjectProtectedBranches"));

var _ProjectDeployKeys = _interopRequireDefault(require("./ProjectDeployKeys"));

var _ProjectMergeRequests = _interopRequireDefault(require("./ProjectMergeRequests"));

var _ProjectServices = _interopRequireDefault(require("./ProjectServices"));

var _ProjectTriggers = _interopRequireDefault(require("./ProjectTriggers"));

var _ProjectRunners = _interopRequireDefault(require("./ProjectRunners"));

var _ProjectPipelines = _interopRequireDefault(require("./ProjectPipelines"));

var _ProjectJobs = _interopRequireDefault(require("./ProjectJobs"));

var _ProjectEnvironments = _interopRequireDefault(require("./ProjectEnvironments"));

var _ResourceCustomAttributes = _interopRequireDefault(require("./ResourceCustomAttributes"));

var _ResourceMembers = _interopRequireDefault(require("./ResourceMembers"));

var _ResourceAccessRequests = _interopRequireDefault(require("./ResourceAccessRequests"));

var _ResourceMilestones = _interopRequireDefault(require("./ResourceMilestones"));

var _ResourceNotes = _interopRequireDefault(require("./ResourceNotes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Projects extends _BaseModel.default {
  constructor(...args) {
    super(...args);
    this.hooks = new _ProjectHooks.default(...args);
    this.issues = new _ProjectIssues.default(...args);
    this.labels = new _ProjectLabels.default(...args);
    this.repository = new _ProjectRepository.default(...args);
    this.protectedBranches = new _ProjectProtectedBranches.default(...args);
    this.deployKeys = new _ProjectDeployKeys.default(...args);
    this.mergeRequests = new _ProjectMergeRequests.default(...args);
    this.services = new _ProjectServices.default(...args);
    this.triggers = new _ProjectTriggers.default(...args);
    this.pipelines = new _ProjectPipelines.default(...args);
    this.jobs = new _ProjectJobs.default(...args);
    this.environments = new _ProjectEnvironments.default(...args);
    this.runners = new _ProjectRunners.default(...args);
    this.customAttributes = new _ResourceCustomAttributes.default('projects', ...args);
    this.members = new _ResourceMembers.default('projects', ...args);
    this.accessRequests = new _ResourceAccessRequests.default('projects', ...args);
    this.milestones = new _ResourceMilestones.default('projects', ...args);
    this.snippets = new _ResourceNotes.default('projects', 'snippets', ...args);
  }

  all(options = {}) {
    return this.get('projects', options);
  }

  create(options = {}) {
    if (options.userId) {
      const uId = (0, _Utils.parse)(options.userId);
      return this.post(`projects/user/${uId}`, options);
    }

    return this.post('projects', options);
  }

  edit(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.put(`projects/${pId}`, options);
  }

  fork(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/fork`, options);
  }

  forks(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/forks`, options);
  }

  remove(projectId) {
    const pId = (0, _Utils.parse)(projectId);
    return this.delete(`projects/${pId}`);
  }

  search(projectName) {
    return this.get('projects', {
      search: projectName
    });
  }

  share(projectId, groupId, groupAccess, options) {
    const pId = (0, _Utils.parse)(projectId);
    if (!groupId || !groupAccess) throw new Error('Missing required arguments');
    options.group_id = groupId;
    options.group_access = groupAccess;
    return this.post(`projects/${pId}/share`, options);
  }

  show(projectId) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}`);
  }

  star(projectId) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/star`);
  }

  statuses(projectId, sha, state, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/statuses/${sha}`, Object.assign({
      state
    }, options));
  }

  unshare(projectId, groupId) {
    const [pId, gId] = [projectId, groupId].map(_Utils.parse);
    return this.delete(`projects/${pId}/share${gId}`);
  }

  unstar(projectId) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/unstar`);
  }

  upload(projectId, filePath, {
    fileName = _path.default.basename(filePath)
  } = {}) {
    const pId = (0, _Utils.parse)(projectId);

    const file = _fs.default.readFileSync(filePath);

    return this.postForm(`projects/${pId}/uploads`, {
      file: {
        value: file,
        options: {
          filename: fileName,
          contentType: 'application/octet-stream'
        }
      }
    });
  }

}

module.exports = Projects;