import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class DeployKeys extends BaseService {
  @api('<projectId>', { options: true, method: 'POST' })
  add(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys`, options);
  }

  @api('<projectId>', { method: 'GET' })
  all(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deploy_keys`);
  }

  @api('<projectId>', '<keyID>', { method: 'GET' })
  show(projectId, keyId) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/deploy_keys/${kId}`);
  }

  enable(projectId, keyId) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys/${kId}/enable`);
  }
}

export default DeployKeys;
