import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type TriggerId = string | number;

class Triggers extends BaseService {
  add(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/triggers`, options);
  }

  all(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/triggers`);
  }

  edit(projectId: ProjectId, triggerId: TriggerId, options: RequestOptions) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/triggers/${tId}`, options);
  }

  remove(projectId: ProjectId, triggerId: TriggerId) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/triggers/${tId}`);
  }

  show(projectId: ProjectId, triggerId: TriggerId) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/triggers/${tId}`);
  }
  
  pipeline(projectId: ProjectId, options: RequestOptions) {
    if(!options.ref) throw new Error('Missing required property: ref');
    if(!options.token) throw new Error('Missing required property: token');
    
    const pId = encodeURIComponent(projectId);
    
    return RequestHelper.post(this, `projects/${pId}/trigger/pipeline`, options);
  }
}

export default Triggers;
