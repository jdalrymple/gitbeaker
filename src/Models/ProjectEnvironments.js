import BaseModel from './BaseModel';
import { parse } from '../Utils';

class Environments extends BaseModel {
  all(projectId, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/environments`, options);
  }
}

export default Environments;
