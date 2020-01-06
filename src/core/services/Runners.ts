import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

// As of GitLab v12.6.2
export interface RunnerSchema {
  id: number;
  description: string;
  ip_address: string;
  active: boolean;
  is_shared: boolean;
  name: string;
  online: boolean;
  status: string;
}

export class Runners extends BaseService {
  all({ projectId, ...options }: { projectId: string | number } & PaginatedRequestOptions) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/runners` : 'runners/all';

    return RequestHelper.get(this, url, options);
  }

  allOwned(options?: BaseRequestOptions) {
    return RequestHelper.get(this, 'runners', options);
  }

  edit(runnerId: number, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.put(this, `runners/${rId}`, options);
  }

  enable(projectId: string | number, runnerId: number, options?: Sudo) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/runners`, { runnerId: rId, ...options });
  }

  disable(projectId: string | number, runnerId: number, options?: Sudo) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/runners/${rId}`, options);
  }

  jobs(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}/jobs`, options);
  }

  remove(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.del(this, `runners/${rId}`, options);
  }

  show(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}`, options);
  }
}
