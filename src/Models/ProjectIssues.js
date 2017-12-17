import BaseModel from './BaseModel';
import { parse } from '../Utils';
import ResourceNotes from './ResourceNotes';

class ProjectIssues extends BaseModel {
  constructor(...args) {
    super(...args);

    this.notes = new ResourceNotes('projects', 'issues', ...args);
  }

  all(projectId, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/issues`, options);
  }

  create(projectId, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/issues`, options);
  }

  edit(projectId, issueId, options = {}) {
    const [pId, iId] = [projectId, issueId].map(parse);

    return this.put(`projects/${pId}/issues/${iId}`, options);
  }

  link(projectId, issueIId, targetProjectId, targetIssueId, options = {}) {
    const [pId, iId] = [projectId, issueIId].map(parse);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(parse);

    return this.post(`projects/${pId}/issues/${iId}/links`, Object.assign({ target_project_id: targetpId, target_issue_id: targetIId }, options));
  }

  remove(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(parse);

    return this.delete(`projects/${pId}/issues/${iId}`);
  }

  show(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(parse);

    return this.get(`projects/${pId}/issues/${iId}`);
  }

  subscribe(projectId, issueId, options = {}) {
    const [pId, iId] = [projectId, issueId].map(parse);

    return this.post(`projects/${pId}/issues/${iId}/subscribe`, options);
  }

  unsubscribe(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(parse);

    return this.delete(`projects/${pId}/issues/${iId}/unsubscribe`);
  }
}

export default ProjectIssues;
