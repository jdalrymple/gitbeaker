import Fs from 'fs';
import Path from 'path';
import BaseModel from './BaseModel';
import { parse } from '../Utils';
import ProjectHooks from './ProjectHooks';
import ProjectIssues from './ProjectIssues';
import ProjectLabels from './ProjectLabels';
import ProjectRepository from './ProjectRepository';
import ProjectProtectedBranches from './ProjectProtectedBranches';
import ProjectDeployKeys from './ProjectDeployKeys';
import ProjectMergeRequests from './ProjectMergeRequests';
import ProjectServices from './ProjectServices';
import ProjectTriggers from './ProjectTriggers';
import ProjectRunners from './ProjectRunners';
import ProjectPipelines from './ProjectPipelines';
import ResourceCustomAttributes from './ResourceCustomAttributes';
import ResourceMembers from './ResourceMembers';
import ResourceAccessRequests from './ResourceAccessRequests';
import ResourceMilestones from './ResourceMilestones';
import ResourceNotes from './ResourceNotes';


class Projects extends BaseModel {
  constructor(...args) {
    super(...args);

    this.hooks = new ProjectHooks(...args);
    this.issues = new ProjectIssues(...args);
    this.labels = new ProjectLabels(...args);
    this.repository = new ProjectRepository(...args);
    this.protectedBranches = new ProjectProtectedBranches(...args);
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

  create(options = {}) {
    if (options.userId) {
      const uId = parse(options.userId);

      return this.post(`projects/user/${uId}`, options);
    }

    return this.post('projects', options);
  }

  edit(projectId, options = {}) {
    const pId = parse(projectId);

    return this.put(`projects/${pId}`, options);
  }

  fork(projectId, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/fork`, options);
  }

  remove(projectId) {
    const pId = parse(projectId);

    return this.delete(`projects/${pId}`);
  }

  search(projectName) {
    return this.get('projects', { search: projectName });
  }

  share(projectId, groupId, groupAccess, options) {
    const pId = parse(projectId);

    if (!groupId || !groupAccess) throw new Error('Missing required arguments');

    options.group_id = groupId;
    options.group_access = groupAccess;

    return this.post(`projects/${pId}/share`, options);
  }

  show(projectId) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}`);
  }

  star(projectId) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/star`);
  }

  statuses(projectId, sha, state, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/statuses/${sha}`, Object.assign({ state }, options));
  }

  unshare(projectId, groupId) {
    const [pId, gId] = [projectId, groupId].map(parse);

    return this.delete(`projects/${pId}/share${gId}`);
  }

  unstar(projectId) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/unstar`);
  }

  upload(projectId, filePath, { fileName = Path.basename(filePath) } = {}) {
    const pId = parse(projectId);
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
