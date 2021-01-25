import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface RunnerSchemaDefault {
  id: number;
  description: string;
  ip_address: string;
  active: boolean;
  is_shared: boolean;
  name: string;
  online: boolean;
  status: string;
}

export interface RunnerSchemaCamelized {
  id: number;
  description: string;
  ipAddress: string;
  active: boolean;
  isShared: boolean;
  name: string;
  online: boolean;
  status: string;
}

// As of GitLab v12.6.2
export type RunnerSchema = RunnerSchemaDefault | RunnerSchemaCamelized;

export class Runners<C extends boolean> extends BaseService<C> {
  all({ projectId, ...options }: { projectId?: string | number } & PaginatedRequestOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/runners` : 'runners/all';

    return RequestHelper.get<C>(this, url, options);
  }

  allOwned(options?: BaseRequestOptions) {
    return RequestHelper.get<C>(this, 'runners', options);
  }

  edit(runnerId: number, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.put<C>(this, `runners/${rId}`, options);
  }

  enable(projectId: string | number, runnerId: number, options?: Sudo) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `projects/${pId}/runners`, { runnerId: rId, ...options });
  }

  disable(projectId: string | number, runnerId: number, options?: Sudo) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `projects/${pId}/runners/${rId}`, options);
  }

  jobs(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get<C>(this, `runners/${rId}/jobs`, options);
  }

  remove(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.del<C>(this, `runners/${rId}`, options);
  }

  show(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get<C>(this, `runners/${rId}`, options);
  }
}
