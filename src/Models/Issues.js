import BaseModel from './BaseModel';

class Issues extends BaseModel {
  all(options = {}) {
    return this.get('issues', options);
  }
}

export default Issues;
