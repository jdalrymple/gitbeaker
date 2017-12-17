import BaseModel from './BaseModel';
import { parse } from '../Utils';

class Pipelines extends BaseModel {
  all(projectId, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/pipelines`, options);
  }
}

export default Pipelines;
