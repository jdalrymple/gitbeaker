const Fs = require('fs');
const Path = require('path');
const BaseModel = require('./BaseModel');
const Utils = require('../Utils');
const ProjectHooks = require('./ProjectHooks');
const ProjectIssues = require('./ProjectIssues');
const ProjectLabels = require('./ProjectLabels');
const ProjectRepository = require('./ProjectRepository');
const ProjectDeployKeys = require('./ProjectDeployKeys');
const ProjectMergeRequests = require('./ProjectMergeRequests');
const ProjectServices = require('./ProjectServices');
const ProjectTriggers = require('./ProjectTriggers');
const ProjectRunners = require('./ProjectRunners');
const ProjectPipelines = require('./ProjectPipelines');
const ResourceCustomAttributes = require('./ResourceCustomAttributes');
const ResourceMembers = require('./ResourceMembers');
const ResourceAccessRequests = require('./ResourceAccessRequests');
const ResourceMilestones = require('./ResourceMilestones');
const ResourceNotes = require('./ResourceNotes');


class Projects extends BaseModel {
  constructor(...args) {
    super(...args);

    this.hooks = new ProjectHooks(...args);
    this.issues = new ProjectIssues(...args);
    this.labels = new ProjectLabels(...args);
    this.repository = new ProjectRepository(...args);
    this.deployKeys = new ProjectDeployKeys(...args);
    this.mergeRequests = new ProjectMergeRequests(...args);
    this.services = new ProjectServices(...args);
    this.triggers = new ProjectTriggers(...args);
    this.pipelines = new ProjectPipelines(...args);
    this.runners = new ProjectRunners(...args);
    this.customAttributes = new ResourceCustomAttributes('projects', ...args);
    this.members = new ResourceMembers('projects', ...args);
    this.accessRequests = new ResourceAccessRequests('projects', ...args);
    this.milestones = new ResourceMilestones('projects', ...args);
    this.snippets = new ResourceNotes('projects', 'snippets', ...args);
  }

  all(options = {}) {
    return this.get('projects', options);
  }

  allAdmin(options = {}) {
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
    options.group_access = groupAccess;

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

  statuses(projectId, sha, state, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/statuses/${sha}`, Object.assign({ state }, options));
  }

  unstar(projectId) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/unstar`);
  }

  upload(projectId, filePath, { fileName = Path.basename(filePath) } = {}) {
    const pId = Utils.parse(projectId);
    const file = Fs.readFileSync(filePath);

    return this.postForm(`projects/${pId}/uploads`, {
      file: {
        value: file,
        options: {
          filename: fileName,
          contentType: 'application/octet-stream',
        },
      },
    });
  }
}

module.exports = Projects;
