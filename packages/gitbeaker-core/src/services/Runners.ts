import { BaseService } from '@gitbeaker/requester-utils';
import { JobSchema, RunnerSchema, RunnerExtendedSchema } from '../models';

import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

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
