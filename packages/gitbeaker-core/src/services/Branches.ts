import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class Branches extends BaseService {
  all(projectId: string | number, options?: { search?: string } & PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/branches`, options);
  }

  create(projectId: string | number, branchName: string, ref: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);
    const branchKey = this.url.includes('v3') ? 'branchName' : 'branch';

    return RequestHelper.post(this, `projects/${pId}/repository/branches`, {
      [branchKey]: branchName,
      ref,
      ...options,
    });
  }

  protect(projectId: string | number, branchName: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_branches`, {
      name: branchName,
      ...options,
    });
  }

  remove(projectId: string | number, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/repository/branches/${bName}`, options);
  }

  show(projectId: string | number, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/branches/${bName}`, options);
  }

  unprotect(projectId: string | number, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/repository/branches/${bName}/unprotect`,
      options,
    );
  }
}
