import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectLabels extends BaseModel {
  all(projectId, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/labels`, options);
  }

  create(projectId, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/labels`, options);
  }

  edit(projectId, labelName, options = {}) {
    const pId = parse(projectId);

    return this.put(`projects/${pId}/labels`, Object.assign({ name: labelName }, options));
  }

  remove(projectId, labelName) {
    const pId = parse(projectId);

    return this.delete(`projects/${pId}/labels`, { name: labelName });
  }

  subscribe(projectId, labelId, options = {}) {
    const [pId, lId] = [projectId, labelId].map(parse);

    return this.post(`projects/${pId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(projectId, labelId) {
    const [pId, lId] = [projectId, labelId].map(parse);

    return this.delete(`projects/${pId}/issues/${lId}/unsubscribe`);
  }
}

export default ProjectLabels;
