const BaseModel = require('../BaseModel');
const Utils = require('../Utils');
const ProjectMembers = require('./ProjectMembers');
const ProjectHooks = require('./ProjectHooks');
const ProjectIssues = require('./ProjectIssues');
const ProjectLabels = require('./ProjectLabels');
const ProjectRepository = require('./ProjectRepository');
const ProjectMilestones = require('./ProjectMilestones');
const ProjectDeployKeys = require('./ProjectDeployKeys');
const ProjectMergeRequests = require('./ProjectMergeRequests');
const ProjectServices = require('./ProjectServices');
const ProjectTriggers = require('./ProjectTriggers');
const ProjectRunners = require('./ProjectRunners');
const ProjectPipelines = require('./ProjectPipelines');

class Projects extends BaseModel {
  constructor(...args) {
    super(...args);

    this.members = new ProjectMembers(...args);
    this.hooks = new ProjectHooks(...args);
    this.issues = new ProjectIssues(...args);
    this.labels = new ProjectLabels(...args);
    this.repository = new ProjectRepository(...args);
    this.milestones = new ProjectMilestones(...args);
    this.deploy_keys = new ProjectDeployKeys(...args);
    this.merge_requests = new ProjectMergeRequests(...args);
    this.services = new ProjectServices(...args);
    this.triggers = new ProjectTriggers(...args);
    this.pipelines = new ProjectPipelines(...args);
    this.runners = new ProjectRunners(...args);
  }

  all(options = {}) {
    Utils.defaultPaging(options);

    return this.get('projects', options);
  }

  allAdmin(options = {}) {
    Utils.defaultPaging(options);

    return this.get('projects/all', options);
  }

  create(options = {}) {
    if (options.userId) {
      const uId = Utils.parse(options.userId);

      return this.post(`projects/user/${uId}`, options);
    }

    return this.post('projects', options);
  }

  edit(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}`, options);
  }

  fork(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/fork`, options);
  }

  remove(projectId) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}`);
  }

  search(projectName) {
    return this.get('projects', { search: projectName });
  }

  share(projectId, groupId, groupAccess, options) {
    const pId = Utils.parse(projectId);

    if (!groupId || !groupAccess) throw new Error('Missing required arguments');

    options.group_id = groupId;
    options.groupAccess = groupAccess;

    return this.post(`projects/${pId}/share`, options);
  }

  show(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}`);
  }

  star(projectId) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/star`);
  }

  unstar(projectId) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/unstar`);
  }

  upload(projectId, filePath) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/uploads`, {
      file: filePath,
    });
  }
}

module.exports = Projects;
