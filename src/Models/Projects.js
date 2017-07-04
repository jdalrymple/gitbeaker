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
const ProjectBuilds = require('./ProjectBuilds');
const Pipelines = require('./Pipelines');
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
    this.builds = new ProjectBuilds(...args);
    this.pipelines = new Pipelines(...args);
    this.runners = new Runners(...args);
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

  show(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}`);
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

  addMember(projectId, options = {}) {
    return this.post(`projects/${projectId}/members`, options);
  }

  editMember(projectId, userId, options = {}) {
    return this.put(`projects/${projectId}/members/${userId}`, options);
  }

  listMembers(projectId) {
    return this.get(`projects/${projectId}/members`);
  }

  listCommits(projectId, options = {}) {
    return this.get(`projects/${projectId}/repository/commits`, options);
  }

  listTags(projectId) {
    return this.get(`projects/${projectId}/repository/tags`);
  }

  remove(projectId) {
    return this.delete(`projects/${Utils.parse(projectId)}`);
  }

  fork(projectId, options = {}) {
    return this.post(`projects/${projectId}/fork`, options);
  }

  star(projectId) {
    return this.post(`projects/${Utils.parse(projectId)}/star`);
  }

  unstar(projectId) {
    return this.post(`projects/${Utils.parse(projectId)}/unstar`);
  }
  
  share(projectId, options = {}) {
    return this.post(`projects/${Utils.parse(projectId)}/share`, options);
  }

  search(projectName) {
    return this.get(`projects`, { search: projectName });
  }

  listTriggers(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/triggers`);
  }

  showTrigger(projectId, token) {
    return this.get(`projects/${Utils.parse(projectId)}/triggers/${token}`);
  }

  createTrigger(projectId, options = {}) {
    return this.post(`projects/${Utils.parse(projectId)}/triggers`, options);
  }

  removeTrigger(projectId, token) {
    return this.delete(`projects/${Utils.parse(projectId)}/triggers/${token}`);
  }

  upload(projectId, filePath) {
    return this.post(`projects/${Utils.parse(projectId)}/uploads`, {
      file: filePath
    });
  }
}

module.exports = Projects;
