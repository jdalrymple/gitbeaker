import BaseModel from './BaseModel';

class MergeRequests extends BaseModel {
  all(options = {}) {
    return this.get('merge_requests', options);
  }
}

export default MergeRequests;
