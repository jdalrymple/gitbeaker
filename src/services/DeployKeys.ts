import { BaseService, RequestHelper, Sudo, BaseRequestOptions, PaginatedRequestOptions } from '../infrastructure';
import { ProjectId, KeyId } from '.';

class DeployKeys extends BaseService {
  add(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys`, options);
  }

  all({
    projectId,
    ...options
  }:{ projectId?: ProjectId } & PaginatedRequestOptions) {
    let url;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/deploy_keys`;
    } else {
      url = 'deploy_keys';
    }

    return RequestHelper.get(this, url, options);
  }

  edit(projectId: ProjectId, keyId: KeyId, options?:BaseRequestOptions) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/deploy_keys/${kId}`, options);
  }

  enable(projectId: ProjectId, keyId: KeyId, options?: Sudo) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys/${kId}/enable`, options);
  }

  remove(projectId: ProjectId, keyId: KeyId, options?:Sudo) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/deploy_keys/${kId}`, options);
  }

  show(projectId: ProjectId, keyId: KeyId, options?: Sudo) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/deploy_keys/${kId}`, options);
  }
}

export default DeployKeys;
