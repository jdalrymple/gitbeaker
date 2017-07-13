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
const Runners = require('./Runners');


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
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get("projects", options); 
  }

  allAdmin(options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get("projects/all", options);
  }

  create(options = {}) {
    if(options.userId){
      return this.post(`projects/user/${userId}`, options);
    } else {
      return this.post("projects", options);
    }
  }

  edit(projectId, options = {}) {
    return this.put(`projects/${Utils.parse(projectId)}`, options);
  }

  fork(projectId, options = {}) {
    return this.post(`projects/${projectId}/fork`, options);
  }

  remove(projectId) {
    return this.delete(`projects/${Utils.parse(projectId)}`);
  }

  search(projectName) {
    return this.get(`projects`, { search: projectName });
  }

  share(projectId, groupId, groupAccess, options) {
    if(!groupId || !groupAccess) throw new Error("Missing required arguments");

    options.group_id = groupId;
    options.groupAccess = groupAccess;

    return this.post(`projects/${Utils.parse(projectId)}/share`, options);
  }

  show(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}`);
  }
 
  star(projectId) {
    return this.post(`projects/${Utils.parse(projectId)}/star`);
  }

  unstar(projectId) {
    return this.post(`projects/${Utils.parse(projectId)}/unstar`);
  }

  upload(projectId, filePath) {
    return this.post(`projects/${Utils.parse(projectId)}/uploads`, {
      file: filePath
    });
  }
}

module.exports = Projects;
