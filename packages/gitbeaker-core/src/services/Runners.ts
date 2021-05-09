import { BaseService } from '@gitbeaker/requester-utils';
import { ProjectSchema } from './Projects';
import { JobSchema } from './Jobs';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface RunnerSchema extends Record<string, unknown> {
  id: number;
  description: string;
  ip_address: string;
  active: boolean;
  is_shared: boolean;
  name: string;
  online: boolean;
  status: 'running' | 'success' | 'failed' | 'canceled';
}

export interface RunnerExtendedSchema extends RunnerSchema {
  architecture?: string;
  description: string;
  contacted_at: string;
  platform?: string;
  projects?: Pick<
    ProjectSchema,
    'id' | 'name' | 'name_with_namespace' | 'path' | 'path_with_namespace'
  >;
  revision?: string;
  tag_list?: string[];
  version?: string;
  access_level: string;
  maximum_timeout?: number;
}

export class Runners<C extends boolean = false> extends BaseService<C> {
  all({ projectId, ...options }: { projectId?: string | number } & PaginatedRequestOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/runners` : 'runners/all';

    return RequestHelper.get<RunnerSchema[]>()(this, url, options);
  }

  allOwned(options?: BaseRequestOptions) {
    return RequestHelper.get<RunnerSchema[]>()(this, 'runners', options);
  }

  edit(runnerId: number, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.put<RunnerExtendedSchema>()(this, `runners/${rId}`, options);
  }

  enable(projectId: string | number, runnerId: number, options?: Sudo) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.post<RunnerSchema>()(this, `projects/${pId}/runners`, {
      runnerId: rId,
      ...options,
    });
  }

  disable(projectId: string | number, runnerId: number, options?: Sudo) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/runners/${rId}`, options);
  }

  jobs(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get<JobSchema[]>()(this, `runners/${rId}/jobs`, options);
  }

  remove(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.del()(this, `runners/${rId}`, options);
  }

  show(runnerId: number, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get<RunnerExtendedSchema>()(this, `runners/${rId}`, options);
  }
}
