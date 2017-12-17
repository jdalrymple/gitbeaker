import BaseModel from './BaseModel';
import { parse } from '../Utils';

class GroupProjects extends BaseModel {
  all(groupId, options = {}) {
    const gId = parse(groupId);

    return this.get(`groups/${gId}/projects`, options);
  }

  add(groupId, projectId) {
    const [gId, pId] = [groupId, projectId].map(parse);

    return this.post(`groups/${gId}/projects/${pId}`);
  }
}

export default GroupProjects;
