import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, Sudo, ProjectId, KeyId } from '@src/types';

class DeployKeys extends BaseService {
  add(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys`, options);
  }

  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deploy_keys`, options);
  }

  show(projectId: ProjectId, keyId: KeyId, options?: Sudo) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/deploy_keys/${kId}`, options);
  }

  enable(projectId: ProjectId, keyId: KeyId, options?: Sudo) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys/${kId}/enable`, options);
  }
}

export default DeployKeys;
