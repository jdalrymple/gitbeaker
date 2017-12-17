import BaseModel from './BaseModel';

class MergeRequests extends BaseModel {
  all(projectId, options = {}) {
    return this.get('merge_requests', options);
  }
}

export default MergeRequests;
