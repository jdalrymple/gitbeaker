import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class DeployKeys extends BaseService {
  add(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys`, options);
  }

  all(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deploy_keys`);
  }

  show(projectId: ProjectId, keyId: KeyId) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/deploy_keys/${kId}`);
  }

  enable(projectId: ProjectId, keyId: KeyId) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys/${kId}/enable`);
  }
}

export default DeployKeys;
