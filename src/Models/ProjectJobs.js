import BaseModel from './BaseModel';
import { parse } from '../Utils';

class Jobs extends BaseModel {
  all(projectId, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/jobs`, options);
  }
}

export default Jobs;
