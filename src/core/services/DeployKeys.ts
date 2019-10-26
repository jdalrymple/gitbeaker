import {
  BaseService,
  RequestHelper,
  Sudo,
  BaseRequestOptions,
  PaginatedRequestOptions,
} from '../infrastructure';

export class DeployKeys extends BaseService {
  add(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys`, options);
  }

  all({ projectId, ...options }: { projectId?: string | number } & PaginatedRequestOptions) {
    let url;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/deploy_keys`;
    } else {
      url = 'deploy_keys';
    }

    return RequestHelper.get(this, url, options);
  }

  edit(projectId: string | number, keyId: string, options?: BaseRequestOptions) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/deploy_keys/${kId}`, options);
  }

  enable(projectId: string | number, keyId: string, options?: Sudo) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deploy_keys/${kId}/enable`, options);
  }

  remove(projectId: string | number, keyId: string, options?: Sudo) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/deploy_keys/${kId}`, options);
  }

  show(projectId: string | number, keyId: string, options?: Sudo) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/deploy_keys/${kId}`, options);
  }
}
